/**
 * Calls the Netlify serverless backend.
 * The Gemini API key remains server-side only.
 */
async function callGeminiSecure(params, maxRetries = 2) {
  let attempt = 0;
  // Endpoints to check: Netlify first, then Vercel
  const endpoints = ['/.netlify/functions/gemini', '/api/gemini'];

  while (attempt <= maxRetries) {
    for (const endpoint of endpoints) {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'generateContent', params })
        });

        if (res.ok) {
          const data = await res.json();
          if (data && data.text) {
            return data.text;
          }
        }
      } catch (netErr) {
        // Try next endpoint or retry loop
      }
    }

    attempt++;
    if (attempt <= maxRetries) {
      await new Promise(r => setTimeout(r, 1200 * attempt));
    }
  }

  throw new Error('AI Engine is currently busy or experiencing high demand. Please retry in a few seconds.');
}

/**
 * 1. Generate Question Paper (Text Mode)
 */
export async function generateQuestionPaper({
  grade = 'Class 10',
  subject = 'Science',
  chapter = 'All Chapters (Full Syllabus)',
  marks = 40,
  difficulty = 'Standard Board (60% Direct, 40% Competency)',
  questionType = 'Comprehensive Balanced',
  specialInstructions = ''
}) {
  const prompt = `You are a Senior CBSE Chief Question Paper Setter with 25 years of experience.
Generate a strictly curriculum-compliant question paper adhering to the latest CBSE 2025-2026 examination blueprint and National Education Policy (NEP 2020) competency guidelines.

SPECIFICATIONS:
- Class/Grade: ${grade}
- Subject: ${subject}
- Chapter/Topic: ${chapter}
- Total Marks: ${marks} Marks
- Difficulty Mix: ${difficulty}
- Target Standard: Exactly mirror official CBSE Board examination structure
- Special Instructions: ${specialInstructions || 'Strict adherence to NEP 50% competency guidelines'}

FORMAT REQUIREMENT:
Respond ONLY with a valid, clean JSON object matching this exact structure:
{
  "title": "Title of the Examination",
  "grade": "${grade}",
  "subject": "${subject}",
  "marks": ${marks},
  "duration": "${marks <= 20 ? '45 Minutes' : marks <= 40 ? '1.5 Hours' : '3 Hours'}",
  "instructions": [
    "General instruction 1",
    "General instruction 2"
  ],
  "sections": [
    {
      "name": "Section A",
      "marks": "Total marks for section",
      "type": "Multiple Choice Questions",
      "questions": [
        {
          "qNumber": 1,
          "marks": 1,
          "questionText": "Question text...",
          "options": ["A) option 1", "B) option 2", "C) option 3", "D) option 4"],
          "answerKey": "A) option 1"
        }
      ]
    }
  ]
}
Return raw JSON only without markdown code blocks.`;

  const rawText = await callGeminiSecure({
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.3,
      responseMimeType: 'application/json'
    }
  });

  try {
    const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleaned);
  } catch (parseErr) {
    console.error('Failed to parse question paper JSON:', rawText);
    throw new Error('AI returned an unexpected format. Please retry paper generation.');
  }
}

/**
 * 2. Evaluate Answer Sheet (Multimodal Vision Mode)
 */
export async function evaluateAnswerSheet({
  imageBase64,
  mimeType = 'image/jpeg',
  grade = 'Class 10',
  subject = 'Science',
  questionContext = '',
  maxMarks = 5
}) {
  const prompt = `You are an official CBSE Head Examiner evaluating a student's handwritten answer sheet.
Evaluate the handwriting against official CBSE step-marking rubrics.

CRITERIA:
1. Transcribe the student's handwritten answer accurately.
2. Break down the marks step-by-step:
   - Stating governing formula/principle (0.5 to 1M)
   - Intermediate algebraic substitution (1 to 2M)
   - Final magnitude with proper SI unit (0.5 to 1M)
3. Check 100/100 Topper Presentation Benchmarks:
   - Is the final formula/answer enclosed in a box?
   - Is there a right-side rough work margin?
   - Are SI units correctly stated and underlined?
4. Pinpoint exact deductions and provide the official model topper answer.

Respond ONLY with a valid JSON object matching this structure:
{
  "transcribedText": "Student text read from image",
  "marksAwarded": 4.5,
  "maxMarks": ${maxMarks},
  "percentage": 90,
  "presentationRating": "Excellent / Needs Improvement",
  "stepBreakdown": [
    { "step": "Formula declaration", "marks": "1/1", "status": "Awarded" }
  ],
  "deductions": [
    "Exact reason if any mark was deducted"
  ],
  "topperSecretsCheck": {
    "formulaBoxed": true,
    "roughMarginPresent": false,
    "siUnitUnderlined": true
  },
  "modelAnswer": "Official CBSE topper solution",
  "feedback": "Actionable encouragement for the student"
}
Return raw JSON only without code blocks.`;

  const parts = [
    { text: prompt },
    {
      inlineData: {
        data: imageBase64,
        mimeType: mimeType
      }
    }
  ];

  if (questionContext) {
    parts.unshift({ text: `Question Reference Context: ${questionContext}` });
  }

  const rawText = await callGeminiSecure({
    contents: [{ role: 'user', parts: parts }],
    generationConfig: {
      temperature: 0.2,
      responseMimeType: 'application/json'
    }
  });

  try {
    const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleaned);
  } catch (parseErr) {
    console.error('Failed to parse evaluation JSON:', rawText);
    throw new Error('AI evaluation response parsing failed. Please retry.');
  }
}

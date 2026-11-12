import { GoogleGenAI } from '@google/genai';

// Safe JSON parser for AI responses
function parseSafeAIJson(rawText) {
  if (!rawText) throw new Error('AI returned an empty response.');

  let cleaned = rawText
    .replace(/^[^{[]*/, '')
    .replace(/[^}]]*$/, '')
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (e1) {
    try {
      let fixed = cleaned.replace(/\\([a-zA-Z])/g, '$1');
      return JSON.parse(fixed);
    } catch (e2) {
      console.error('JSON parse failed. Raw text:', rawText);
      throw new Error('AI returned an unexpected format. Please retry paper generation.');
    }
  }
}

async function callGeminiSecure(params, maxRetries = 2) {
  let attempt = 0;
  while (attempt <= maxRetries) {
    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'generateContent', params })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || ('HTTP ' + res.status));
      }

      const data = await res.json();
      if (!data.text) throw new Error('Empty AI response');
      return data.text;
    } catch (err) {
      attempt++;
      if (attempt > maxRetries) throw err;
      await new Promise(r => setTimeout(r, 1500 * attempt));
    }
  }
  throw new Error('AI Engine is currently busy. Please retry.');
}

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
- Chapter/Topic: ${chapter || 'Full Syllabus'}\n- Topic Scope: Focus questions specifically around '${chapter || 'Core Syllabus'}' while adhering strictly to CBSE standard.
- Total Marks: ${marks} Marks
- Difficulty Mix: ${difficulty}
- Target Standard: Exactly mirror official CBSE Board examination structure
- Special Instructions: ${specialInstructions || 'Strict adherence to NEP 50% competency guidelines. Do not use raw LaTeX backslashes; write chemical formulas in plain text like H2SO4, CO2, etc.'}

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
          "answerKey": "A) option 1",
          "correctAnswer": "A) option 1",
          "markingScheme": "1 Mark for correct identification"
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

  return parseSafeAIJson(rawText);
}

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
Return raw JSON with scorecard, step breakdown, and deductions.`;

  const rawText = await callGeminiSecure({
    contents: [
      {
        role: 'user',
        parts: [
          { text: prompt },
          { inlineData: { mimeType, data: imageBase64 } }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.2,
      responseMimeType: 'application/json'
    }
  });

  return parseSafeAIJson(rawText);
}

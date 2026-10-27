import { GoogleGenAI } from '@google/genai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.warn('VITE_GEMINI_API_KEY is not defined in environment variables.');
}

const ai = new GoogleGenAI({ apiKey: apiKey || '' });

// Google official supported model
const PRIMARY_MODEL = 'gemini-3.8-flash';

/**
 * Robust execution with auto-retry on 503 (High Demand Spikes)
 */
async function callGeminiWithRetry(params, maxRetries = 3) {
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      const response = await ai.models.generateContent({
        model: PRIMARY_MODEL,
        ...params
      });
      if (response && response.text) {
        return response.text;
      }
      throw new Error('Empty response received from Gemini AI.');
    } catch (err) {
      attempt++;
      console.warn(`Gemini API attempt ${attempt} failed:`, err?.message || err);
      
      const isRetryable = err?.message?.includes('503') || 
                          err?.message?.includes('high demand') ||
                          err?.message?.includes('UNAVAILABLE') ||
                          err?.message?.includes('429');

      if (isRetryable && attempt < maxRetries) {
        // Wait 1.5 seconds and retry
        await new Promise(resolve => setTimeout(resolve, 1500 * attempt));
        continue;
      }
      throw err;
    }
  }
}

/**
 * High-Speed CBSE Board Standard Question Paper Generator
 */
export async function generateQuestionPaper({
  grade = 'Class 10',
  subject = 'Science',
  chapter = 'All Chapters',
  maxMarks = 40,
  duration = '90 Minutes',
  difficulty = 'Standard Board Level',
  coachingName = 'Bright Future Classes'
}) {
  const prompt = `Act as Senior CBSE Paper Setter. Generate strictly valid JSON for a CBSE exam paper:
Grade: ${grade} | Subject: ${subject} | Topic: ${chapter} | Marks: ${maxMarks} | Time: ${duration} | Difficulty: ${difficulty} | Institute: ${coachingName}

Output pure JSON only (no markdown, no backticks):
{
  "examDetails": {
    "instituteName": "${coachingName}",
    "title": "${grade} Board Assessment - ${subject}",
    "subject": "${subject}",
    "grade": "${grade}",
    "chapter": "${chapter}",
    "maxMarks": ${maxMarks},
    "duration": "${duration}",
    "generalInstructions": [
      "All questions are compulsory.",
      "Internal choices are provided as per latest CBSE pattern.",
      "Calculators are not permitted."
    ]
  },
  "sections": [
    {
      "sectionName": "SECTION A (Objective / MCQs)",
      "type": "MCQ",
      "questions": [
        {
          "qNumber": 1,
          "questionText": "Authentic crisp CBSE question text",
          "options": ["A) ...", "B) ...", "C) ...", "D) ..."],
          "marks": 1,
          "correctAnswer": "A) ...",
          "markingScheme": "1 mark for correct option"
        }
      ]
    },
    {
      "sectionName": "SECTION B (Subjective & Numerical)",
      "type": "Short/Long",
      "questions": [
        {
          "qNumber": 2,
          "questionText": "Subjective question statement",
          "options": [],
          "marks": 2,
          "correctAnswer": "Direct solution key",
          "markingScheme": "Step marking points"
        }
      ]
    }
  ]
}
Sum of question marks must equal ${maxMarks}. Authentic CBSE questions only.`;

  try {
    const rawOutput = await callGeminiWithRetry({
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.2
      }
    });

    let cleanText = rawOutput.trim();
    if (cleanText.startsWith('```')) {
      cleanText = cleanText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
    }
    return JSON.parse(cleanText);
  } catch (error) {
    console.error('Gemini Paper Generation Error:', error);
    throw new Error(error.message || 'Failed to generate question paper. Please try again.');
  }
}

/**
 * Multimodal CBSE Student Answer Sheet Evaluator
 */
export async function evaluateAnswerSheet({
  imageBase64,
  mimeType = 'image/jpeg',
  grade = 'Class 10',
  subject = 'Science',
  questionText = '',
  maxMarks = 5
}) {
  const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z+]+;base64,/, '');

  const prompt = `Act as an official Senior CBSE Board Examiner evaluating a student's handwritten answer sheet.
Strictly adhere to official CBSE step-wise marking guidelines.

Evaluation Metadata:
- Grade: ${grade}
- Subject: ${subject}
- Question: ${questionText ? questionText : 'Read question directly from the student answer sheet'}
- Maximum Marks: ${maxMarks}

Analyze the handwritten answer image closely. Output STRICTLY valid JSON with no markdown formatting and no backticks:
{
  "studentTranscription": "Complete transcription of the handwritten answer written by the student",
  "totalMarksAwarded": 4,
  "maxMarks": ${maxMarks},
  "overallVerdict": "Good attempt / Needs improvement in formula / Minor calculation mistake",
  "stepBreakdown": [
    {
      "stepTitle": "Given data & Formula identification",
      "marksAwarded": 1,
      "maxMarksForStep": 1,
      "feedback": "Correct formula stated clearly."
    },
    {
      "stepTitle": "Step-by-step Calculation / Derivation",
      "marksAwarded": 1.5,
      "maxMarksForStep": 2,
      "feedback": "Missed intermediate substitution step on line 3."
    },
    {
      "stepTitle": "Final Answer & Proper Units",
      "marksAwarded": 0.5,
      "maxMarksForStep": 1,
      "feedback": "Correct magnitude but missing SI unit."
    }
  ],
  "strengths": [
    "Clean handwriting and clear headings.",
    "Correct initial formula applied."
  ],
  "deductionsAndMistakes": [
    "0.5 marks deducted: SI unit was omitted in final answer."
  ],
  "cbseModelAnswer": "The ideal 100/100 CBSE presentation answer for this exact question to get full marks.",
  "examinerProTip": "Examiner's secret tip on how to present this answer to guarantee 100% step marks in CBSE board exam."
}`;

  try {
    const rawOutput = await callGeminiWithRetry({
      contents: [
        {
          role: 'user',
          parts: [
            { text: prompt },
            {
              inlineData: {
                data: cleanBase64,
                mimeType: mimeType
              }
            }
          ]
        }
      ],
      config: {
        responseMimeType: 'application/json',
        temperature: 0.2
      }
    });

    let cleanText = rawOutput.trim();
    if (cleanText.startsWith('```')) {
      cleanText = cleanText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
    }
    return JSON.parse(cleanText);
  } catch (error) {
    console.error('Gemini Answer Sheet Evaluation Error:', error);
    throw new Error(error.message || 'Failed to evaluate answer sheet. Please ensure the image is clear.');
  }
}

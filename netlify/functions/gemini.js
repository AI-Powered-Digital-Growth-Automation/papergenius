const { GoogleGenAI } = require('@google/genai');

// Server-side private key (Never exposed to browser network tab)
const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

exports.handler = async function (event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server GEMINI_API_KEY is not configured.' })
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { action, params } = body;

    const ai = new GoogleGenAI({ apiKey: apiKey });
    const PRIMARY_MODEL = 'gemini-3.8-flash';

    if (action === 'generateContent') {
      const response = await ai.models.generateContent({
        model: PRIMARY_MODEL,
        ...params
      });

      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: response?.text || '' })
      };
    }

    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid action parameter.' })
    };
  } catch (error) {
    console.error('Gemini Serverless Function Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || 'Internal AI Server Error' })
    };
  }
};

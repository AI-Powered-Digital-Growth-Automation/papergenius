const { GoogleGenAI } = require('@google/genai');

const apiKey = process.env.GEMINI_API_KEY;

exports.handler = async function (event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  if (!apiKey) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Server GEMINI_API_KEY is not configured in Netlify.' })
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { action, params, model } = body;

    const ai = new GoogleGenAI({ apiKey: apiKey });

    // Diagnostic action: ask Google directly what models are available
    if (action === 'listModels') {
      const response = await ai.models.list();
      const modelNames = [];
      for await (const m of response) {
        modelNames.push(m.name);
      }
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ models: modelNames })
      };
    }

    // Default or user-requested model
    const targetModel = model || 'gemini-2.0-flash';

    if (action === 'generateContent') {
      const response = await ai.models.generateContent({
        model: targetModel,
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Invalid action parameter.' })
    };
  } catch (error) {
    console.error('Gemini Serverless Function Error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        error: error.message || 'Internal AI Server Error',
        details: error.toString()
      })
    };
  }
};

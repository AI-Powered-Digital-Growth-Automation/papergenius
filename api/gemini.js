const { GoogleGenAI } = require('@google/genai');

const apiKey = process.env.GEMINI_API_KEY;

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  if (!apiKey) {
    return res.status(500).json({ error: 'Server GEMINI_API_KEY is not configured.' });
  }

  try {
    const body = req.body || {};
    const { action, params, model } = body;

    const ai = new GoogleGenAI({ apiKey: apiKey });
    const targetModel = model || 'gemini-3.5-flash-lite';

    if (action === 'generateContent') {
      const response = await ai.models.generateContent({
        model: targetModel,
        ...params
      });

      return res.status(200).json({ text: response.text });
    }

    return res.status(400).json({ error: 'Unsupported action' });
  } catch (error) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({
      error: error.message || 'Internal AI Server Error',
      details: error.toString()
    });
  }
};

import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  if (!apiKey) {
    return res.status(500).json({ error: 'Server GEMINI_API_KEY is not configured in Vercel environment variables.' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        body = {};
      }
    }
    body = body || {};

    const { action, params, model } = body;
    const ai = new GoogleGenAI({ apiKey: apiKey });
    const targetModel = 'gemini-flash-latest';

    if (action === 'generateContent') {
      let finalContents = params.contents;

      // Ensure proper formatting if contents has image parts
      if (Array.isArray(finalContents)) {
        finalContents = finalContents.map(c => {
          if (c.parts && Array.isArray(c.parts)) {
            const cleanedParts = c.parts.map(p => {
              if (p.inlineData && p.inlineData.data) {
                // Strip data url prefix if present
                const cleanBase64 = p.inlineData.data.replace(/^data:image\/[a-z]+;base64,/, '');
                return {
                  inlineData: {
                    data: cleanBase64,
                    mimeType: p.inlineData.mimeType || 'image/jpeg'
                  }
                };
              }
              return p;
            });
            return { ...c, parts: cleanedParts };
          }
          return c;
        });
      }

      const response = await ai.models.generateContent({
        model: targetModel,
        ...params,
        contents: finalContents
      });

      return res.status(200).json({ text: response.text });
    }

    return res.status(400).json({ error: 'Unsupported action' });
  } catch (error) {
    console.error('Gemini API Error in Vercel function:', error);
    return res.status(500).json({
      error: error.message || 'Internal AI Server Error',
      details: error.toString()
    });
  }
}

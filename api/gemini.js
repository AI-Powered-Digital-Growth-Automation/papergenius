import { GoogleGenAI } from '@google/genai';

const geminiApiKey = process.env.GEMINI_API_KEY;
const groqApiKey = process.env.GROQ_API_KEY;
const iteraApiKey = process.env.ITERA_API_KEY;
const iteraBaseUrl = process.env.ITERA_BASE_URL || 'https://api.iteracompute.com/v1';

// Helper: Call OpenAI-compatible Chat API (Groq / iteraCompute)
async function callOpenAICompatible(url, apiKey, model, prompt, maxTokens = 4096) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: model,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: maxTokens,
      temperature: 0.3
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`API returned ${response.status}: ${errText.slice(0, 150)}`);
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content || '';
  if (!text) throw new Error('Empty response from model');
  return text;
}

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

    const { action, params } = body;

    if (action === 'generateContent') {
      let finalContents = params?.contents;

      // Check if this request contains an image (Vision Task)
      let hasImage = false;
      let textPrompt = '';

      if (Array.isArray(finalContents)) {
        for (const c of finalContents) {
          if (c.parts && Array.isArray(c.parts)) {
            for (const p of c.parts) {
              if (p.inlineData && p.inlineData.data) {
                hasImage = true;
              }
              if (p.text) {
                textPrompt += (textPrompt ? '\n' : '') + p.text;
              }
            }
          }
        }
      } else if (typeof finalContents === 'string') {
        textPrompt = finalContents;
      }

      // ==========================================
      // ROUTE 1: VISION TASK (Handwritten Sheet) -> Gemini
      // ==========================================
      if (hasImage) {
        if (!geminiApiKey) {
          return res.status(500).json({ error: 'GEMINI_API_KEY is not configured for Vision evaluation.' });
        }

        const ai = new GoogleGenAI({ apiKey: geminiApiKey });
        const targetModel = 'gemini-flash-latest';

        // Clean base64 prefixes
        const cleanedContents = finalContents.map(c => {
          if (c.parts && Array.isArray(c.parts)) {
            const cleanedParts = c.parts.map(p => {
              if (p.inlineData && p.inlineData.data) {
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

        const response = await ai.models.generateContent({
          model: targetModel,
          ...params,
          contents: cleanedContents
        });

        return res.status(200).json({ text: response.text });
      }

      // ==========================================
      // ROUTE 2: TEXT GENERATION (Paper / Pre-Board / CMS)
      // Primary: Groq (gpt-oss-120b)
      // Secondary: iteraCompute (Auto - 30M Free Tokens)
      // Fallback: Gemini Flash
      // ==========================================

      // 1. Try Groq Cloud (Primary)
      if (groqApiKey) {
        try {
          const text = await callOpenAICompatible(
            'https://api.groq.com/openai/v1/chat/completions',
            groqApiKey,
            'openai/gpt-oss-120b',
            textPrompt
          );
          return res.status(200).json({ text });
        } catch (groqErr) {
          console.warn('Groq primary failed, switching to iteraCompute fallback:', groqErr.message);
        }
      }

      // 2. Try iteraCompute (Secondary Fallback)
      if (iteraApiKey) {
        try {
          const text = await callOpenAICompatible(
            `${iteraBaseUrl}/chat/completions`,
            iteraApiKey,
            'Auto',
            textPrompt
          );
          return res.status(200).json({ text });
        } catch (iteraErr) {
          console.warn('iteraCompute fallback failed, switching to Gemini:', iteraErr.message);
        }
      }

      // 3. Last Resort: Gemini Flash
      if (geminiApiKey) {
        const ai = new GoogleGenAI({ apiKey: geminiApiKey });
        const response = await ai.models.generateContent({
          model: 'gemini-flash-latest',
          ...params,
          contents: finalContents
        });
        return res.status(200).json({ text: response.text });
      }

      return res.status(500).json({ error: 'All AI providers are currently unavailable.' });
    }

    return res.status(400).json({ error: 'Unsupported action' });
  } catch (error) {
    console.error('Multi-AI Router Error in Vercel function:', error);
    return res.status(500).json({
      error: error.message || 'Internal AI Server Error',
      details: error.toString()
    });
  }
}

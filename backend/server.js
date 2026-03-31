require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3001;

// For deploy: serve frontend as static files
app.use(express.static(path.join(__dirname, '..', 'frontend')));
app.use(cors());
app.use(express.json());

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_MODEL = "stepfun/step-3.5-flash:free";
const OPENROUTER_ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";

app.post('/api/ai', async (req, res) => {
  const { systemPrompt, userPrompt } = req.body;
  if (!OPENROUTER_API_KEY) return res.status(500).json({ error: "API key not set" });
  try {
    const apiResponse = await fetch(OPENROUTER_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + OPENROUTER_API_KEY
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        max_tokens: 1000,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ]
      })
    });
    if (!apiResponse.ok) {
      const err = await apiResponse.json().catch(() => ({}));
      const msg = (err.error && err.error.message) || ("API error " + apiResponse.status);
      return res.status(500).json({ error: msg });
    }
    const data = await apiResponse.json();
    res.json({ response: data.choices[0].message.content.trim() });
  } catch (e) {
    res.status(500).json({ error: e.message || "Unknown error" });
  }
});

// Fallback to SPA
app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server ready on port ${PORT}`);
});

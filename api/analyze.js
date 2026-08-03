export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.ANTHROPIC_API_KEY || req.headers['x-api-key'];
  
  if (!apiKey) {
    return res.status(400).json({ 
      error: 'No API key found. Go to the Targets tab in your app and save your Anthropic API key. Get one free at console.anthropic.com → API Keys.' 
    });
  }

  try {
    const { messages, max_tokens = 1000 } = req.body;
    
    if (!messages || !messages.length) {
      return res.status(400).json({ error: 'No messages provided.' });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens,
        messages
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      return res.status(response.status).json({ 
        error: `API error: ${data.error?.message || 'Unknown error. Check your API key in the Targets tab.'}` 
      });
    }
    
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: `Server error: ${err.message}` });
  }
}

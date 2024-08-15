require('dotenv').config(); 
const express = require('express'); 
const fetch = require('node-fetch'); 

const app = express();
const port = 3000;

app.use(express.json());

app.post('/api/query', async (req, res) => {
    const query = req.body.query;
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
        return res.status(500).send('API key is not set.');
    }

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'user', content: query }
                ],
                max_tokens: 100
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`API request failed: ${errorText}`);
            res.status(response.status).send(`API request failed: ${errorText}`);
            return;
        }

        const data = await response.json();
        res.json({ text: data.choices[0].message.content.trim() });
    } catch (error) {
        console.error(`Server error: ${error.message}`);
        res.status(500).send(`Error: Unable to get response. ${error.message}`);
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

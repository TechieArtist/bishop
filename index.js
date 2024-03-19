require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const app = express();
const cors = require('cors'); // Make sure this line is included
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const predefinedResponses = {
    "website owner": "The owner of this website is Evan, a talented individual with a background in art, innovation, and community work...",
    "pricing": "Here is a breakdown of the pricing for Evan's services on his website:...",
};

app.post('/api/chat', async (req, res) => {
    const userPrompt = req.body.prompt.toLowerCase(); // Consider lowercasing for case-insensitive matching
    let messages = []; // Initialize messages array here
    
     // Check for predefined response
     const directResponseKey = Object.keys(predefinedResponses).find(key => userPrompt.includes(key));
     if (directResponseKey) {
         // If a predefined response is found, return it immediately
         return res.json({ responseMessage: predefinedResponses[directResponseKey] });
     }
    
    
     // If no predefined response, prepare to call the API
     messages.push({
        "role": "user",
        "content": userPrompt
    });

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: messages,
                temperature: 0.7,
                max_tokens: 256,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            })
        });
        const data = await response.json();
        
        if (data.choices && data.choices[0] && data.choices[0].message) {
            const responseMessage = data.choices[0].message.content;
            console.log(responseMessage);
            return res.json({ responseMessage: responseMessage, messages: messages }); // Include return to exit the function
        } else {
            throw new Error("Invalid response from the OpenAI API");
        }
    } catch (error) {
        console.error("Error calling the ChatGPT API:", error);
        if (error.response) {
            console.error("API response error:", error.response.data);
        }
        return res.status(500).send("Error processing your request");
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Function to handle graceful shutdown
function gracefulShutdown() {
    console.log('Gracefully shutting down');
    server.close(() => {
        console.log('Closed out remaining connections');
        process.exit();
    });
    
    // If the server hasn't finished in 10 seconds, forcefully shut down
    setTimeout(() => {
        console.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
    }, 10000);
}

// Listen for termination signals
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

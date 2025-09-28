const express = require('express');
const { OpenAI } = require('openai');

const router = express.Router();
const HF_TOKEN = process.env.HF_TOKEN;

router.get('/', (req, res) => {
    res.render("analysis", { data: null, aiResponse: null });
});

router.post('/get', async (req, res) => {
    const { data } = req.body;

    if (!data) {
        return res.render("analysis", { data: null, aiResponse: "Please provide input" });
    }

    try {
        const client = new OpenAI({
            baseURL: "https://router.huggingface.co/v1",
            apiKey: process.env.HF_API_KEY,
        });

        const prompt = `Please provide a thorough and insightful analysis of the following data.
        Output format make some infernces insights on the following input:
        1. Point 1
        2. Point 2
        3. Point 3
        Make it clear, structured, and easy to understand.
        Data:
        ${data}`;

        const chatCompletion = await client.chat.completions.create({
            model: "deepseek-ai/DeepSeek-V3.1-Terminus:novita",
            messages: [{ role: "user", content: prompt }],
        });

        let aiResponse = chatCompletion.choices[0]?.message?.content || "No response";

        // Optional: Clean up formatting
        aiResponse = aiResponse
            .replace(/\n{2,}/g, '\n')   // remove extra line breaks
            .trim();

        console.log("AI Response:", aiResponse);

        res.render("analysis", { data, aiResponse });

    } catch (error) {
        console.error("Error:", error);
        res.render("analysis", {
            data,
            aiResponse: error?.message || "Error communicating with Hugging Face API"
        });
    }
});

module.exports = router;

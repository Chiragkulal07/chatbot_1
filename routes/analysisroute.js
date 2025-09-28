const express = require('express');
const router = express.Router();
const axios = require('axios');

const HF_API_KEY = process.env.HF_API_KEY;

const HF_MODEL = "facebook/bart-large-cnn";

router.get('/', (req, res) => {
    res.render("analysis", { data: null, aiResponse: null });
});

router.post('/get', async (req, res) => {
    const { data } = req.body;

    if (!data) {
        return res.render("analysis", { data: null, aiResponse: "Please provide input" });
    }

    try {
        // Call Hugging Face Inference API
        const response = await axios.post(
            `https://api-inference.huggingface.co/models/${HF_MODEL}`,
            { inputs: data },
            {
                headers: {
                    Authorization: `Bearer ${HF_API_KEY}`,
                },
            }
        );

        // Hugging Face response format: [{ summary_text: "..."}]
        const aiResponse = response.data[0]?.summary_text || "No summary generated";

        console.log("Summary:", aiResponse);

        res.render("analysis", { data, aiResponse });

    } catch (error) {
        console.error(error.response || error.message);
        res.render("analysis", {
            data,
            aiResponse: error|| "Error communicating with Hugging Face API"
        });
    }
});

module.exports = router;

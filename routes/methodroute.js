const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    // TODO: add sales methods logic
    res.render("methods");
});

router.post("/get", (req, res) => {
    const { data } = req.body;      
    // Process the data as needed
    res.render("methods", { data });
});

module.exports = router;

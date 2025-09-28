const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    // TODO: add insights logic
    res.render("insights");
});

router.post('/get', (req, res) => {
    const { data } = req.body;
    // Process the data as needed
   res.render("insights", { data });
});

module.exports = router;

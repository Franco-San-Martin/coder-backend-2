const express = require('express');
const router = express.Router();
const current = require('../middleware/auth');

router.get('/current', current, (req, res) => {
    res.json(req.user);
});

module.exports = router;
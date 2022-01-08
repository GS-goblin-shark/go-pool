const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  return res.status(200).json({ key: process.env.API_KEY });
});

module.exports = router;

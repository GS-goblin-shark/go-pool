const express = require('express');

const messageController = require('../controllers/messageController');

const router = express.Router();

router.get('/', (req, res) => {
  return res.sendStatus(200);
});

router.post('/', (req, res) => {
  return res.sendStatus(200);
});

module.exports = router;

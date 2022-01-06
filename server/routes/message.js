const express = require('express');

const messageController = require('../controllers/messageController');

const router = express.Router();
const { getMessages, storeMessage } = messageController;

router.get('/', getMessages, (req, res) => {
  //   return res.status(200).json(res.locals.messages);
  return res.sendStatus(200);
});

router.post('/', storeMessage, (req, res) => {
  return res.sendStatus(200);
});

module.exports = router;

const express = require('express');

const messageController = require('../controllers/messageController');

const router = express.Router();
const { getMessages, storeMessage, getUsers } = messageController;

router.get('/users', getUsers, (req, res) => {
  return res.status(200).json({ users: res.locals.users });
});

router.get('/', getMessages, (req, res) => {
  return res.status(200).json({ messages: res.locals.messageBetween });
});

router.post('/', storeMessage, (req, res) => {
  return res.sendStatus(200);
});

module.exports = router;

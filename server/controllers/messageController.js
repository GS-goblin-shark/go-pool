const db = require('../models/userModel');

const messageController = {};

messageController.getMessages = (req, res, next) => {
  return next();
};

messageController.storeMessage = (req, res, next) => {
  return next();
};

module.exports = messageController;

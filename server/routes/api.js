const express = require('express');
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');
const messageController = require('../controllers/messageController');
const sessionController = require('../controllers/sessionController');

const router = express.Router();

router.post('/signup', userController.signup, (req, res) => {
  // steps: signup middleare to add user data to database, session middleware, cookie middleware to set a cookie
  // inputs: first_name, last_name, email, password, address, phoneNumber
  res.status(200).send('Account successfully created')
});

router.post('/login', userController.login, (req, res) => {
  // need to add set cookie middleware after login middleware
  // steps: login middleware to verify user data in db, session middleware, cookie middleware to set cookie
  // inputs: email, password
  res.status(200).send('Successfully logged in')
});

module.exports = router; 
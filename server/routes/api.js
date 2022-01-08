const express = require('express');
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController');

const router = express.Router();
const { signup, login, getAddress } = userController;
const { startSession } = sessionController;
const { setSSIDCookie } = cookieController;

router.post('/signup', signup, (req, res) => {
  // steps: signup middleare to add user data to database, session middleware, cookie middleware to set a cookie
  // inputs: first_name, last_name, email, password, address, phoneNumber
  res.status(200).send('Account successfully created');
});

router.post('/login', login, setSSIDCookie, (req, res) => {
  // need to add set cookie middleware after login middleware
  // steps: login middleware to verify user data in db, session middleware, cookie middleware to set cookie
  // inputs: email, password
  // res.status(200).send('Successfully logged in');
  return res.status(200).json({ isMatch: res.locals.isMatch });
});

router.get('/:email', getAddress, (req, res) => {
  return res.status(200).json(res.locals.address)
});

module.exports = router;

const express = require('express');
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');
const messageController = require('../controllers/messageController');

const router = express.Router();

router.get('/signup', (req, res) => {
  // render the signup page in client folder
});

router.post('/signup', userController.signup, (req, res) => {
  // should redirect client to homepage after successful signup
  // steps: signup middleare to add user data to database, cookie middleware to set a cookie, then render home app
});
// need to add set cookie middleware after signup middleware

router.post('/login', userController.login, (req, res) => {
  // need to add set cookie middleware after login middleware
  // steps: login middleware to verify user data in db, cookie middleware to set cookie, render home app
});

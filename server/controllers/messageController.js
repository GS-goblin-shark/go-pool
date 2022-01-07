const { query } = require('express');
const db = require('../models/userModel');

const messageController = {};

messageController.getMessages = async (req, res, next) => {
  const { from_email, to_email } = req.query;
  let from_userid, to_userid;

  const queryUserID =
    'SELECT users._id, users.email FROM users WHERE email = $1 OR email = $2';
  const paramUserID = [from_email, to_email];

  const queryMessages =
    "SELECT _id, from_user_id, to_user_id, TO_CHAR(date, 'MM/DD/YYYY HH24:MM:SS') AS date, message  FROM messages WHERE from_user_id = $1 AND to_user_id = $2 or from_user_id = $2 AND to_user_id = $1";
  const paramMessages = [];

  try {
    const userID = await db.query(queryUserID, paramUserID);
    userID.rows[0].email === from_email
      ? (from_userid = userID.rows[0]._id)
      : (to_userid = userID.rows[0]._id);
    userID.rows[1].email === from_email
      ? (from_userid = userID.rows[1]._id)
      : (to_userid = userID.rows[1]._id);
    paramMessages.push(from_userid);
    paramMessages.push(to_userid);
    const messages = await db.query(queryMessages, paramMessages);
    res.locals.messageBetween = messages.rows;
    return next();
  } catch (err) {
    return next({
      log: `Error with messageController.getMessages Error: ${err}`,
      message: {
        err: 'Error with the backend middlware function',
      },
    });
  }
};

messageController.getUsers = async (req, res, next) => {
  const { email } = req.query;
  const usersAdded = [];
  res.locals.users = [];

  const queryUserID = 'SELECT _id FROM users WHERE email = $1';
  const paramUserID = [email];

  const queryMessages =
    'SELECT from_user_id, to_user_id  FROM messages WHERE from_user_id = $1 OR to_user_id = $1';
  const paramMessages = [];

  const queryUsers = 'SELECT _id, first_Name, last_name, email FROM users';

  try {
    paramMessages.push((await db.query(queryUserID, paramUserID)).rows[0]._id);
    const users = await db.query(queryMessages, paramMessages);
    users.rows.forEach((user) => {
      if (!usersAdded.includes(user.from_user_id)) {
        usersAdded.push(user.from_user_id);
      } else if (!usersAdded.includes(user.to_user_id)) {
        usersAdded.push(user.to_user_id);
      }
    });
    const usersList = await db.query(queryUsers);
    usersList.rows.forEach((user) => {
      if (usersAdded.includes(user._id.toString())) {
        res.locals.users.push(user);
      }
    });
  } catch (err) {
    return next({
      log: `Error with messageController.getUsers Error: ${err}`,
      message: {
        err: 'Error in the backend with the messageController.getUsers',
      },
    });
  }
  return next();
};

messageController.storeMessage = (req, res, next) => {
  return next();
};

module.exports = messageController;

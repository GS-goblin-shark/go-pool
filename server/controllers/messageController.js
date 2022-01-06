const db = require('../models/userModel');

const messageController = {};

messageController.getMessages = async (req, res, next) => {
  const { from_email, to_email } = req.query;
  let from_userid, to_userid;

  const queryUser =
    'SELECT users._id, users.email FROM users WHERE email = $1 OR email = $2';
  const paramUser = [from_email, to_email];

  const queryMessages =
    'SELECT * FROM messages WHERE from_user_id = $1 or to_user_id = $2';
  const paramMessages = [];

  try {
    const userID = await db.query(queryUser, paramUser);
    userID.rows[0].email === from_email
      ? (from_userid = userID.rows[0].email)
      : (to_userid = userID.rows[0].email);
    userID.rows[1].email === from_email
      ? (from_userid = userID.rows[1].email)
      : (to_userid = userID.rows[1].email);
    paramMessages.push(from_userid);
    paramMessages.push(to_userid);
    console.log(paramMessages);
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

messageController.storeMessage = (req, res, next) => {
  return next();
};

module.exports = messageController;

const db = require('../models/userModel');

const threadController = {};

threadController.createPost = async (req, res, next) => {
  const { event_name, date, location, thread, date_posted, email } = req.body;

  const queryUser = 'SELECT u._id FROM users u WHERE email = $1;';
  const paramsUser = [email];

  const queryEvent =
    '\
    INSERT INTO event (event_name, date, location) \
    VALUES ($1, $2, $3) \
    RETURNING event._id, event.event_name ;';
  const paramsEvent = [event_name, date, location];

  const queryThread =
    '\
  INSERT INTO threads (thread, date, user_id, event_id) \
  VALUES ($1, $2, $3, $4) \
  RETURNING threads.thread, threads.date;';
  const paramsThread = [thread, date_posted];

  try {
    const userID = await db.query(queryUser, paramsUser);
    paramsThread.push(userID.rows[0]._id);

    const eventId = await db.query(queryEvent, paramsEvent);
    res.locals.eventName = eventId.rows[0].event_name;
    paramsThread.push(eventId.rows[0]._id);

    const threadData = await db.query(queryThread, paramsThread);
    res.locals.threadData = threadData.rows[0];

    return next();
  } catch (err) {
    return next({
      log: `Error with threadController.createPost Error: ${err}`,
      message: {
        err: 'Error in the backend. Check terminal logs',
      },
    });
  }
};

threadController.getUpcomingEvents = async (req, res, next) => {

  const dateNow = new Date().toLocaleDateString('en-US');
  const paramsUpcoming = [dateNow];

  const queryUpcoming = `SELECT event_name, TO_CHAR(date, 'Mon DD') as date FROM event WHERE date >= $1;`;

  try {
    const upcomingEventData = await db.query(queryUpcoming, paramsUpcoming);
    //console.log(upcomingEventData.rows);
    res.locals.upcomingEvents = upcomingEventData.rows
    return next();

  } catch (err) {
    return next({
      log: `Error in threadController.getUpcomingEvents: ${err}`,
      message: {
        err: `Error in the backend from threadController.getUpcomingEvents`
      }
    });
  }
};

threadController.getThreadMessages = async (req, res, next) => {

  // const queryThreadMessages = `SELECT thread, TO_CHAR(date, 'Mon DD, YYYY') as date FROM threads;`;
  const queryThreadMessages = `SELECT threads.thread, TO_CHAR(threads.date, 'Mon DD, YYYY') as date, event.event_name, users.email, users.first_name, users.last_name FROM threads INNER JOIN event ON threads.event_id = event._id INNER JOIN users ON threads.user_id = users._id;`

  try {
    const threadMessages = await db.query(queryThreadMessages);
    console.log(threadMessages.rows);
    res.locals.threadMessages = threadMessages.rows;
    return next()
  } catch (err) {
    return next({
      log: `Error in threadController.getThreadMessages: ${err}`,
      message: {
        err: `Error in the backend from threadController.getUpcomingEvents`
      }
    });
  }
};

module.exports = threadController;

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
  const params = [dateNow];

  const text = `SELECT event_name, TO_CHAR(date, 'Mon DD') as date FROM event WHERE date >= $1;`;
  //have date spelled out 

  try {
    const upcomingEventData = await db.query(text, params);
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

module.exports = threadController;

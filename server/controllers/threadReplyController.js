const { db } = require("../models/sessionModel");

const threadReplyController = {};

threadReplyController.postThreadReply = async (req, res, next) => {
    const { thread, date_posted, email, thread_id, event_name } = req.body;

    console.log(req.body)

    const queryEmail = 'SELECT users._id FROM users WHERE email = $1;';
    const emailParams = [email];

    const queryEvent = 'SELECT event._id FROM event WHERE event_name =$1;';
    const eventParams = [event_name];

    const queryRes = 'INSERT INTO threads (thread, date, thread_id, user_id, event_id) VALUES ($1, $2, $3, $4, $5) RETURNING *;'
    const resParams = [thread, date_posted, thread_id];

    try {
        const userID = await db.query(queryEmail, emailParams);
        resParams.push(userID.rows[0]._id);
        console.log('userID: ', userId)

        const eventId = await db.query(queryEvent, eventParams);
        resParams.push(eventId.rows[0]._id);
        console.log('eventID: ', eventId)

        const threadRes = await db.query(queryRes, resParams);
        res.locals.threadRes = threadRes.rows[0];
        console.log(threadRes);

        return next();
    } catch (err) {
        return next({
            log: `Error in threadReplyController.postThreadReply: ${err}`,
            message: {
                err: `Error in the backend from threadReplyController.postThreadReply`
            }
        });
    }
};

module.exports = threadController;
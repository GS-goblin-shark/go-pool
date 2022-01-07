const { db } = require("../models/sessionModel");

const threadReplyController = {};

threadReplyController.postThreadReply = async (req, res, next) => {
    const { email, thread, date_posted, thread_id } = req.body;

    console.log(req.body)

    const queryEmail = 'SELECT u._id FROM users u WHERE email = $1;';
    const emailParams = [email];

    const queryRes = 'INSERT INTO threads (thread, date, user_id, event_id, thread_id) VALUES ($1, $2, $3, $4, $5) RETURNING threads.thread, threads.date;';
    const resParams = [thread, date_posted];

    try {
        const userID = await db.query(queryEmail, emailParams);
        resParams.push(userID.rows[0]._id);

        const threadRes = await db.query(queryRes, resParams);
        res.locals.threadRes = threadRes.rows[0];

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
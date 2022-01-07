const express = require('express');
const threadReplyController = require('../controllers/threadReplyController');

const router = express.Router();
const { postThreadReply } = threadReplyController;

router.post('/', postThreadReply, (req, res) => {
    return res
    .status(200)
    .json(res.locals.threadRes)
});

module.exports = router;
const express = require('express');
const threadReplyController = require('../controllers/threadReplyController');

const router = express.Router();
const { postThreadReply } = threadReplyController;

router.post('/', postThreadReply, (req, res) => {
    return res
    .sendStatus(200);
});

module.exports = router;
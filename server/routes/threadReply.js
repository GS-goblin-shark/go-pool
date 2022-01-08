const express = require('express');
const threadReplyController = require('../controllers/threadReplyController');

const router = express.Router();
const { postThreadReply, deleteThreadReply } = threadReplyController;

router.post('/', postThreadReply, (req, res) => {
    return res
    .status(200)
    .json(res.locals.threadRes)
});

router.delete('/:id', deleteThreadReply, (req, res) => {
    return res
    .status(200)
    .send('Thread message successfully deleted')
})

module.exports = router;
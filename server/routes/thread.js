const express = require('express');

const threadController = require('../controllers/threadController');

const router = express.Router();

const { createPost } = threadController;

router.post('/', createPost, (req, res) => {
  return res
    .status(200)
    .json({
      eventName: res.locals.eventName,
      threadData: res.locals.threadData,
    });
});

module.exports = router;

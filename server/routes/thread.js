const express = require('express');
const threadController = require('../controllers/threadController');

const router = express.Router();
const { createPost, getUpcomingEvents, getThreadMessages, deleteThread } = threadController;

router.post('/', createPost, (req, res) => {
  return res
    .status(200)
    .json({
      eventName: res.locals.eventName,
      threadData: res.locals.threadData,
      threadId: res.locals.threadId
    });
});

router.get('/upcoming', getUpcomingEvents, (req, res) => {
  return res
    .status(200)
    .json(res.locals.upcomingEvents)
});

router.get('/:id', getThreadMessages, (req, res) => {
  return res
    .status(200)
    .json(res.locals.threadMessages)
});

router.delete('/:eventid', deleteThread, (req, res) => {
  return res
    .status(200)
    .send('Thread successfully deleted')
})

module.exports = router;

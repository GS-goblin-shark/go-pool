const express = require('express');
const path = require('path');
const cors = require('cors');
const apiRouter = require('./routes/api');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoURI = 'mongodb://localhost/go-pool-session'
mongoose.connect(mongoURI);
const apiRouter = require('./routes/api');

if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));
  app.get('/', (req, res) =>
    res.status(200).sendFile(path.join(__dirname, '../client/index.html'))
  );
}

app.use('/api', apiRouter);

app.use((req, res) => res.sendStatus(404));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred ' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}...`);
});

module.exports = app;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mongoURI = 'mongodb://localhost/go-pool-session';
mongoose
  .connect(mongoURI)
  .then(() => {
    // console.log('Connected to sessions database');
    return;
  })
  .catch((err) => {
    console.log(`Error connecting to sessions database: ${err}`);
    return;
  });

//console log connected with anon func
//.then
//catch for err

const sessionSchema = new Schema({
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: '30m', default: Date.now },
});

module.exports = mongoose.model('Session', sessionSchema);

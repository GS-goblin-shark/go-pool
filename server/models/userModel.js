const { Pool } = require('pg');

require('dotenv').config();

const PG_URI = `postgres://${process.env.PG_Username}:${process.env.PG_Password}@castor.db.elephantsql.com/${process.env.PG_Username}`;

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};

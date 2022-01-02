const { hashPassword } = require('../encryption');
const db = require('../models/userModel');

const userController = {};
// require database and model

userController.signup = async (req, res, next) => {
  // add query text
  // add conditional statement to check that user inserted all fields
  //this check for input needs to be updated, this is just a placeholder to test that user input data
  if (
    !req.body.first_name ||
    !req.body.last_name ||
    !req.body.email ||
    !req.body.password ||
    !req.body.address ||
    !req.body.phone_number
  ) {
    console.log('Incomplete');
  } else {
    const { first_name, last_name, email, address, phone_number } = req.body;

    try {
      // console.log(req.body);

      const password = await hashPassword(req.body.password);

      const params = [
        first_name,
        last_name,
        email,
        password,
        address,
        phone_number,
      ];

      const text =
        'INSERT INTO users (first_name, last_name, email, password, address, phone_number) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;';

      db.query(text, params)
        .then((data) => {
          console.log(data);
          return next();
        })
        .catch((err) => {
          console.log('Error in userController.signup');
          next({
            log: `ERROR in userController.signup: ${err}`,
          });
        });
    } catch (err) {
      console.log(err);
    }
  }
};

userController.login = (req, res, next) => {
  // add query text
  const { email, password } = req.body;
  console.log(req.body);
  next();
};

module.exports = userController;

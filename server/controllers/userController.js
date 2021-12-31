const db = require('../models/userModel');

const userController = {};
// require database and model

userController.signup = (req, res, next) => {
  // add query text
  // add conditional statement to check that user inserted all fields
  if (!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.password || !req.body.address || !req.body.phone_number){
      console.log('Incomplete')
  } else {
    const { first_name, last_name, email, password, address, phone_number } = req.body;

    console.log(req.body); 

    const id = [
        first_name, 
        last_name, 
        email, 
        password, 
        address, 
        phone_number
    ];

    const text = 'INSERT INTO users (first_name, last_name, email, password, address, phone_number) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;'

    db.query(text, id)
    .then((data) => {
        console.log(data);
        return next();
    })
    .catch((err) => {
        console.log('Error in userController.signup');
        next({
            log: `ERROR in userController.signup: ${err}`
        });
    });
  };

};

userController.login = (req, res, next) => {
  // add query text
  const { email, password } = req.body
  console.log(req.body);
  next();
};

module.exports = userController;
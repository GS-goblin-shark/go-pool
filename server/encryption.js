const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  } catch (err) {
    console.log(err);
  }
};

const comparePassword = async (rawPassword, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(rawPassword, hashedPassword);
    return isMatch;
  } catch (err) {
    console.log(err);
  }
};
module.exports = { hashPassword, comparePassword };

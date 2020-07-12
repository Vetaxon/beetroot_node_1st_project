/** @var {validator} Validator */
const Validator = require('validator');

function validateLoginInput(data) {

  let errors = {};

  data = data || {};

  if (!Validator.isEmail(data.email || '')) {
    errors.email = 'email is invalid'
  }
  if (Validator.isEmpty(data.email || '')) {
    errors.email = 'email is required';
  }
  if (Validator.isEmpty(data.password || '')) {
    errors.password = 'password is empty';
  }

  return errors;
}

module.exports = validateLoginInput;
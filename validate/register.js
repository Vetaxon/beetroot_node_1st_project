/** @var {validator} Validator */
const Validator = require('validator');
const validateLoginInput = require('./login');

/**
 * @param {String} data.name
 * @param {String} data.email
 * @param {String} data.password
 * @param {String} data.password_confirmation
 *
 */
function validateRegisterInput(data) {

  data = data || {};

  let errors = validateLoginInput(data);

  // Name
  if (!Validator.isLength(data.name || '', {min: 2, max: 30})) {
    errors.name = 'name must be between 2 and 30 characters'
  }
  if (Validator.isEmpty(data.name || '')) {
    errors.name = 'name field is empty'
  }

  // Password
  if (!Validator.isLength(data.password || '', {min: 6, max: 12})) {
    errors.password = 'password must be at least 6 character'
  }
  if (!Validator.matches(data.password || '', /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)) {
    errors.password = 'password must contains minimum 6 characters, at least one letter and one number'
  }

  if (Validator.isEmpty(data.password_confirmation || '')) {
    errors.password_confirmation = 'password_confirmation is empty'
  }

  // Password confirmation
  if (!Validator.equals(data.password || '', data.password_confirmation || '')) {
    errors.password = 'passwords must match'
  }

  if (Validator.isEmpty(data.password_confirmation || '')) {
    errors.password_confirmation = 'password_confirmation is empty'
  }

  return errors;
}

module.exports = validateRegisterInput;

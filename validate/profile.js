/** {validator} Validator */
const Validator = require('validator');

function validateProfileInput(data) {

  let errors = {};

  data = data || {};

  if (Validator.isEmpty(data.handle || '')) {
    errors.handle = 'handle is required';
  }
  if (Validator.isEmpty(data.status || '')) {
    errors.status = 'status is required';
  }
  if (Validator.isEmpty(data.skills || '')) {
    errors.skills = 'skills are required';
  }

  return errors;
}

module.exports = validateProfileInput;
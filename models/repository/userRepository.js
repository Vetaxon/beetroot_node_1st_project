const User = require('./../User');
const Repository = require('./repository');

class UserRepository extends Repository{

}

module.exports = new UserRepository(User);
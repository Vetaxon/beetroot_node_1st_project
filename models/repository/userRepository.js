const User = require('./../User');

class UserRepository {

    /**
     * @return {User|Model|Query}
     */
    getModel() {
        return User;
    }

    /**
     * @param {Object} params
     * @return {User|Model}
     */
    getNew(params) {
        const model = this.getModel();
        return new model(params);
    }
}

module.exports = new UserRepository();
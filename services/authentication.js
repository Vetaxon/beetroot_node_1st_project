const bcrypt = require('bcryptjs');

/**
 * @param  {String} password
 * @return {Promise<String>} hash
 */
function hash(password) {
    return new Promise(resolve => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) throw err.message;
                resolve(hash);
            })
        })
    });
}


/**
 * @param  {String} password
 * @param  {String} hash
 * @return {Promise<Boolean>} result
 */
function check(password, hash) {
    return bcrypt.compare(password, hash);
}

module.exports.hash = hash;
module.exports.check = check;
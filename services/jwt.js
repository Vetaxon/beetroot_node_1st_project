const jwt = require('jsonwebtoken');

const defaultExp = 3600; // sec

/**
 * @param {User} user
 * @param {string} user.id
 * @param {name} user.name
 * @param {Number|null} option.exp
 * @param {Object|null} option
 * @return {Promise<String>}
 */
function generateJWTForUser(user, option = {}) {

    option.exp = option.exp || defaultExp;

    const payload = {
        id: user.id,
        name: user.name,
    };

    return new Promise(resolve => {
        jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY,
            {expiresIn: option.exp},
            (err, token) => {
                if (err) throw err.message;
                resolve({
                    token: 'Bearer ' + token,
                    valid_to: Date.now() + option.exp * 1000
                });
            }
        );
    });
}

module.exports.generateJWTForUser = generateJWTForUser;
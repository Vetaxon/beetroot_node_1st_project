const gravatar = require('gravatar');

const usersRepository = require('./../../models/repository/userRepository');
const {hash } = require('./../../services/authentication');
const {generateJWTForUser} = require('./../../services/jwt');

class UsersController {

    async register(req, res) {

        try {
            const newUser = usersRepository.getNew({
                name: req.body.name,
                email: req.body.email,
                password: await hash(req.body.password),
                avatar: gravatar.url(req.body.email, {
                    s: '200',
                    r: 'pg',
                    default: 'mm'
                })
            });
            await newUser.save();
            return res.json(newUser);
        } catch (e) {
            console.error(e.message);
            return res.status(500);
        }
    }

    async login(req, res) {

        try {
            const token = await generateJWTForUser(req.user);
            return  res.json(token);
        } catch (e) {
            console.error(e.message);
            return res.status(500);
        }
    }

    async current(req, res) {
        return res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
            avatar: req.user.avatar,
        });
    }
}

module.exports = new UsersController();
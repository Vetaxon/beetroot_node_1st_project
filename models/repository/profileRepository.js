const Profile = require('./../Profile');
const Repository = require('./repository');

const defaultLimit = 10;

class ProfileRepository extends Repository{

    /**
     * @param {Object} paginator
     * @param {Number} paginator.limit
     * @param {Number} paginator.offset
     */
    async paginate(paginator) {
        const count = await this.getModel().countDocuments();

        paginator.limit = paginator.limit || defaultLimit;
        paginator.offset = paginator.offset || 0;
        const userProfiles = await this.getModel()
            .find({}, null, paginator)
            .populate('user', ['name', 'avatar']);
        return {
            total: count,
            limit: paginator.limit,
            offset: paginator.offset,
            data: userProfiles
        }
    }
}

module.exports = new ProfileRepository(Profile);
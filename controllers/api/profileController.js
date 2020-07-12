const profileRepository = require('./../../models/repository/profileRepository');

class ProfileController {

    async getForAuth(req, res) {
        const profile = await profileRepository.getModel().findOne({user: req.user.id});
        return res.json(profile || {});
    }

    async store(req, res) {

        const profileField = {};

        profileField.user = req.user.id;
        profileField.handle = req.body.handle;
        profileField.status = req.body.status;
        profileField.skills = req.body.skills.split(',');

        if (req.body.company) profileField.company = req.body.company;
        if (req.body.website) profileField.website = req.body.website;
        if (req.body.location) profileField.location = req.body.location;
        if (req.body.bio) profileField.bio = req.body.bio;
        if (req.body.githubusername) profileField.githubusername = req.body.githubusername;

        profileField.social = {};

        if (req.body.youtube) profileField.social.youtube = req.body.youtube;
        if (req.body.twitter) profileField.social.twitter = req.body.twitter;
        if (req.body.facebook) profileField.social.facebook = req.body.facebook;
        if (req.body.linkedin) profileField.social.linkedin = req.body.linkedin;
        if (req.body.instagram) profileField.social.instagram = req.body.instagram;

        const userProfile = await profileRepository.getModel().findOne({user: req.user.id});
        if (userProfile) {
            await profileRepository.getModel().findOneAndUpdate(
                {user: req.user.id},
                {$set: profileField},
                {new: true}
            );
            return res.json(userProfile);
        }

        const profileHandle = await profileRepository.getModel().findOne({profile: profileField.handle});
        if (profileHandle) {
            return res.status(400).json({
                message: `handle ${profileField.handle} already exist`
            });
        }

        const newProfile = profileRepository.getNew(profileField);
        await newProfile.save();

        return res.json(newProfile);
    }

    async getByHandle(req, res) {
        const userProfile = await profileRepository.getModel()
            .findOne({ user: req.user.id, handle: req.params.handle })
            .populate('user', ['name', 'avatar']);

        if (!userProfile) {
            return res.status(404).json({
                message: `Profile with handle ${req.params.handle} not found`
            });
        }

        return res.json(userProfile);
    }

    async getAll(req, res) {
        const paginator = {};
        const query = req.query;
        if (query.limit) paginator.limit = parseInt(query.limit, 10);
        if (query.offset) paginator.offset = parseInt(query.offset, 10);
        const userProfiles = await profileRepository.paginate(paginator);
        return res.json(userProfiles);
    }

}

module.exports = new ProfileController();
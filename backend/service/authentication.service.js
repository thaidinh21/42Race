const mongoose = require('mongoose');
const stavaService = require('./strava.service');
const AccountModel = require('../database/account.model');
const LoginModel = require('../database/login.model');


const authenticate = async (req, res) => {
    const { code } = req.body;
    const stravaResponse = await stavaService.exchangeCodeForToken(code);
    const { athlete } = stravaResponse;
    let account = await AccountModel.findOne({
        id: athlete.id
    });

    if (!account) {
        account = new AccountModel({
            ...athlete
        });
        await account.save();
    }
    const loginModel = new LoginModel({
        account,
        token_type: stravaResponse.token_type,
        expires_at: stravaResponse.expires_at * 1000,
        expires_in: stravaResponse.expires_in,
        access_token: stravaResponse.access_token,
        refresh_token: stravaResponse.refresh_token
    });
    await loginModel.save();
    res.json(
        stravaResponse
    )
}

const deauthenticate = async (req, res) => {
    const { accessToken } = req;
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        await LoginModel.deleteOne({ access_token: accessToken }, { session });
        await stavaService.deauthorize(accessToken);
        await session.commitTransaction();
        await session.endSession();
        res.status(204).send();

    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        res.status(500).send();
    }

}

module.exports = {
    authenticate,
    deauthenticate
}
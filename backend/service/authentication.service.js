const mongoose = require('mongoose');
const stavaService = require('./strava.service');
const AccountModel = require('../database/account.model');
const LoginModel = require('../database/login.model');


const exchangeCodeToToken = async (req, res) => {
    const { code } = req.body;
    const stravaResponse = await stavaService.exchangeCodeForToken(code);
    if (stravaResponse.errors) {
        return res.status(401).send();
    }
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
const loginWithAccessToken = async (req, res) => {
    const { accessToken } = req.body;
    try {
        let loginResult = await LoginModel.findOne({ access_token: accessToken }).populate("account");
        
        
        if(!loginResult){
            return res.status(401).send("Could not login");
        }
        let response;
        // refresh token if expired
        const currentDateTime = new Date().getTime();
        const tokenExpiresAt = loginResult.expires_at.getTime();
        if(currentDateTime > tokenExpiresAt){
            const refreshTokenResponse = await stavaService.refreshToken(loginResult.refresh_token);
            
            loginResult.access_token = refreshTokenResponse.access_token;
            loginResult.expires_at = refreshTokenResponse.expires_at;
            loginResult.refresh_token = refreshTokenResponse.refresh_token;
            loginResult.expires_in = refreshTokenResponse.expires_in;
            loginResult = await loginResult.save();
            
        }
        
        response = {
            ...loginResult.toObject(),
            athlete: loginResult.account
        };
        delete response.account;
        res.json(response);
    } catch (err) {
        res.status(500).send(err.message);
    }
}


module.exports = {
    exchangeCodeToToken,
    deauthenticate,
    loginWithAccessToken
}
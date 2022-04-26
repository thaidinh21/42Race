const stavaService = require('./strava.service');
const AccountModel = require('../database/account.model');
const LoginModel = require('../database/login.model');
const authenticate = async (req, res) => {
    const {code, scope} = req.body;
    const stravaResponse = await stavaService.exchangeCodeForToken(code);
    const {athlete} = stravaResponse;
    let account = await AccountModel.findOne({
        id: athlete.id
    }).exec();
    
    if(!account){
        account = new AccountModel({
            ...athlete
        });
        await account.save();
    }
    const loginModel = new LoginModel({
        account,
        token_type: stravaResponse.token_type,
        expires_at: stravaResponse.expires_at,
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
    const {code, scope} = req.body;
}

module.exports = {
    authenticate,
    deauthenticate
}
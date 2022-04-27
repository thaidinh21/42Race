const createError = require('http-errors');
const LoginModel = require('../database/login.model');

module.exports = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.split('')[0] === 'Bearer') {
        return next(createError(401));
    }
    const accessToken = authorization.split(' ')[1];
    LoginModel.findOne({ access_token: accessToken }).populate('account').then(loginInfo => {
        if (!loginInfo) {
            return next(createError(401))
        }
        // todo
        req.accessToken = accessToken;
        req.account = loginInfo.account;
        next();
    });
    
}
const express = require('express');
const { exchangeCodeToToken, deauthenticate, loginWithAccessToken } = require('../service/authentication.service');
const authMiddleware = require('../middleware/authenticate.middleware');
const route = express.Router();
route.post('/exchange', exchangeCodeToToken);
route.post('/login', loginWithAccessToken);
route.get('/disconnect', authMiddleware, deauthenticate);


module.exports = route;
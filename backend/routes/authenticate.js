const express = require('express');
const { authenticate, deauthenticate } = require('../service/authentication.service');
const authMiddleware = require('../middleware/authenticate.middleware');
const route = express.Router();
route.post('/login', authenticate);
route.get('/disconnect', authMiddleware, deauthenticate);

module.exports = route;
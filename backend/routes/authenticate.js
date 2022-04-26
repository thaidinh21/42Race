const express = require('express');
const { authenticate } = require('../service/authentication.service')
const route = express.Router();
route.post('/login', authenticate);
module.exports = route;
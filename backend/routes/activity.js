const express = require('express');
const { sync } = require('../service/activity.service');
const authMiddleware = require('../middleware/authenticate.middleware');
const route = express.Router();
route.post('/sync', authMiddleware, sync);

module.exports = route;
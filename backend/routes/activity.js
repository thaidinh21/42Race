const express = require('express');
const { sync, filter, deleteActivity } = require('../service/activity.service');
const authMiddleware = require('../middleware/authenticate.middleware');
const route = express.Router();
route.post('/sync', authMiddleware, sync);
route.post('/filter', filter);
route.delete('/:activityId', deleteActivity);
module.exports = route;
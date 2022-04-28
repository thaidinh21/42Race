const express = require('express');
const { list, detail } = require('../service/account.service');
const route = express.Router();
route.get('/list', list);
route.get('/detail/:accountId', detail);

module.exports = route;
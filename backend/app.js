const path = require('path');
let createError = require('http-errors');
let mongoose = require('mongoose');
const helmet = require('helmet');
const express = require('express');
const configuration = require('./configuration/configuration');


const app = express();
// setup application middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

// setup frontend resource
app.use(express.static(path.join(__dirname, '..', 'dist')));

function setUpRoutes() {
    // setup route
    app.use('/auth', require('./routes/authenticate'));
    app.use('/activity', require('./routes/activity'));
    app.use('/account', require('./routes/account'));

    app.use((req, res, next) => {
        next(createError(404));
    });

    app.use((err, req, res, next) => {

        // send render response
        res.status(err.status || 500);
        res.json({
            message: err.message
        });
    });
}

// epxose function to start application
async function start() {
    mongoose.Promise = Promise;
    await mongoose.connect(configuration.mongoUrl);

    setUpRoutes();
    app.listen(configuration.port, () => {

    });
}


module.exports = {
    start
};
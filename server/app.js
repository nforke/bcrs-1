/*
============================================
* Title: securityQuestions-api.js
* Author: Professor Krasso
* Date: 20 October 2020
* Modifiers: Nicole Forke, Janet Blohn, Verlee Washington, Joann Saeou
* Description: Group 1 BCRS  NodeJS  api routing for securityQuestion object
* Node.js module for the security questions api
============================================
Updated in project 10/22/20 by Janet Blohn
*/

// Create the requirements/*
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
//const SecurityQuestion = require('./models/securityQuestion'); // get Security Question model
//const User = require('./models/user'); // get User model
const QuestionApi = require('./routes/securityQuestion-api');
const UserApi = require('./routes/user-api');
const SessionApi = require('./routes/session-api');

// Router import
// const router = require('./routes/router')

/**
 * App configurations
 */
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': true }));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../dist/bcrs')));
app.use('/', express.static(path.join(__dirname, '../dist/bcrs')));



/**
 * Variables
 * modified by: Joann Saeou
 * Date modified: 10/26/2020
 */
const port = process.env.PORT || 3000; // server port

// TODO: This line will need to be replaced with your actual database connection string
const conn = 'mongodb+srv://bcrs1:Password1@cluster0.kc016.mongodb.net/bcrs?retryWrites=true&w=majority';

/**'
 * Database connection
 */
mongoose.connect(conn, {
    promiseLibrary: require('bluebird'),
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.debug(`Connection to the database instance was successful`);
}).catch(err => {
    console.log(`MongoDB Error: ${err.message}`)
}); // end mongoose connection definition

/**
 * API(s) go here...
 */
app.use('/api/securityQuestions', QuestionApi);
app.use('/api/users', UserApi);
app.use('/api/session', SessionApi);
/**
 * Create and start server
 */
http.createServer(app).listen(port, function() {
    console.log(`Application started and listening on port: ${port}`)
}); // end http create server function
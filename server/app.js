/*
============================================
* Title: app.js
* Author: Professor Krasso
* Date: 20 October 2020
* Modifiers: Nicole Forke, Janet Blohn, Verlee Washington, Joann Saeou
* Description: Group 1 BCRS  NodeJS  api routing for securityQuestion object
* Node.js module for the security questions api
============================================
Updated in project 10/22/20 by Janet Blohn
*/

// Create the requirements
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const QuestionApi = require('./routes/securityQuestion-api');
const UserApi = require('./routes/user-api');
const SessionApi = require('./routes/session-api');
const RoleApi = require('./routes/role-api');  // Added 11/04/20 Janet
const InvoiceApi = require('./routes/invoice-api');  // Added 11/05/20 Janet

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

// Database connection string
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
app.use('/api/roles', RoleApi);  // Added 11/04/20 Janet
app.use('/api/invoices', InvoiceApi); // Added 11/05/20 Janet

/* Create and start server
 */
http.createServer(app).listen(port, function() {
    console.log(`Application started and listening on port: ${port}`)
}); // end http create server function

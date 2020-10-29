/*
===================================================
* Title: user-api.js
* Author: Professor Krasso
* Date: 22 October 2020
* Modifiers: Joann Saeou, Janet Blohn, Verlee Washington, Nicole Forke
* Description: Group 1: Sprint 1 BCRS - user  API routing
===================================================
Added to project 10/22/20 by Janet Blohn
*/


// Create the requirements
const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response');

const router = express.Router();
const saltRounds = 10; //default salt rounds for hashing algorithm

/*********************************************
 * API: findAllUsers
 **********************************************/
router.get('/', async(req, res) => {
    try {
        User.find({}).where('isDisabled').equals(false).exec(function(err, users) {
            if (err) {
                console.log(err);
                const findAllUsersErrorResp = new ErrorResponse('500', 'Internal server error', err);
                res.status(500).send(findAllUsersErrorResp.toObject());
            } else {
                console.log(users);
                const findAllUsersSuccessResp = new BaseResponse('200', 'Successful query', users);
                res.json(findAllUsersSuccessResp.toObject());
            }
        })
    } catch (e) {
        console.log(e);
        const findAllUsersErrorCatchResp = new ErrorResponse('500', 'Internal server error', e.message);
        res.status(500).send(findAllUsersErrorCatchResp.toObject());
    }
});

/**
 * ==============================================================================
 * API : FindById
 * Author: Joann Saeou
 * Modified by: Verlee Washington; 10/24/2020 Nicole Forke
 * ==============================================================================
 **/
router.get('/:id', async(req, res) => {

    try {
        User.findOne({ '_id': req.params.id }, function(err, user) {

            if (err) {
                console.log(err);
                const findByIdMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                res.status(500).send(findByIdMongodbErrorResponse.toObject());

            } else {
                console.log(user); // corrected error, did have an e but should have been user
                const findByIdResponse = new BaseResponse(200, 'Query Successful', user);
                res.json(findByIdResponse.toObject());
            }
        })


    } catch (e) {
        console.log(e);
        const findByIdCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e);
        res.status(500).send(findByIdCatchErrorResponse.toObject());
    }
});

/**
 * ==============================================================================
 *  API : CreateUser (Users)
 *  Author: Verlee Washington
 *  Modified by: Nicole Forke
 *  Date: 10/23/2020
 * ==============================================================================
 **/
router.post('/', async(req, res) => {
    try {
        let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds); // salt/hash the password

        // user object
        let newUser = {
            userName: req.body.userName,
            password: hashedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            email: req.body.email
        };

        User.create(newUser, function(err, user) {
            if (err) {
                console.log(err);
                const createUserMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                res.status(500).send(createUserMongodbErrorResponse.toObject());
                /**
                 * The else and catch statements were missing found while debugging. Modified by: Nicole Forke
                 */
            } else {
                console.log(user);
                const createUserResponse = new BaseResponse(200, 'Query successful', user);
                res.json(createUserResponse.toObject());
            }
        })

    } catch (e) {
        console.log(e);
        const createUserCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
        res.status(500).send(createUserCatchErrorResponse.toObject());
    }
});

/*********************************************
 * API: Update  User
 * Added by: Janet Blohn
 * Date Added: 10/23/20
 **********************************************/
router.put('/:id', async(req, res) => {
    try {
        User.findOne({ _id: req.params.id }, function(err, user) {
            if (err) {
                console.log(err);
                const updateUserErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                res.status(500).send(updateUserErrorResponse.toObject());
            } else {
                console.log(user);
                user.set({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    phoneNumber: req.body.phoneNumber,
                    address: req.body.address,
                    email: req.body.email
                })
                user.save(function(err, savedUser) {
                    if (err) {
                        console.log(err);
                        const savedUserErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                        res.status(500).send(savedUserErrorResponse.toObject());
                    } else {
                        console.log(savedUser);
                        const savedUserResponse = new BaseResponse(200, 'Update successful', savedUser);
                        res.json(savedUserResponse.toObject());
                    }
                })
            }
        })
    } catch (e) {
        console.log(e);
        const updateUserCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
        res.status(500).send(updateUserCatchErrorResponse.toObject());
    }
});

/**
 * ==============================================================================
 * API : DeleteUser
 * Author: Joann Saeou
 * Date modified: 10/22/2020
 * ==============================================================================
 **/
router.delete('/:id', async(req, res) => {
    try {
        User.findOne({ '_id': req.params.id }, function(err, user) {
            if (err) {
                console.log(err);
                const deleteUserMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                res.status(500).send(deleteUserMongodbErrorResponse.toObject());

            } else {
                console.log(user);

                user.set({
                    isDisabled: true

                });

                user.save(function(err, savedUser) {
                    if (err) {
                        console.log(err);
                        const savedUserMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);

                    } else {
                        console.log(savedUser);
                        const savedUserResponse = new BaseResponse(200, 'Delete successful', savedUser); // changed response to make message clear about deleting
                        res.json(savedUserResponse.toObject());
                    }
                })
            }
        })
    } catch (e) { // corrected error, had curly brace wrong direction Modified by: Nicole Forke
        console.log(e);
        const deleteUserCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message); // corrected error was missing message behind e Modififed by: Nicole Forke
        res.status(500).send(deleteUserCatchErrorResponse.toObject());
    }
});








/**
 * ==============================================================================
 * Sprint 2 -
 * API: FindSelectedSecurityQuestions
 * Author: Joann Saeou
 * Date: 10/29/2020
 * ==============================================================================
 **/

router.get('/:userName/security-questions', async(req, res) => {
    try {
        User.findOne({ 'userName': req.params.userName }, function(err, user) {
            if (err) {
                console.log(err);
                const FindSelectedSecurityQuestionsMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
                res.status(500).send(FindSelectedSecurityQuestionsMongodbErrorResponse.toObject());

            } else {
                console.log(user);
                const FindSelectedSecurityQuestionsResponse = new BaseResponse('200', 'Query successful', user.selectedSecurityQuestions);
            }
        })
    } catch (e) {
        console.log(e);
        const FindSelectedSecurityQuestionsCatchResponse = new ErrorResponse('500', 'Internal server error', e);
        res.status(500).send(FindSelectedSecurityQuestionsCatchResponse.toObject());
    }
});






















// Export this as a router
module.exports = router;

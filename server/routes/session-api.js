/*
===================================================
* Title: session-api.js
* Author: Professor Krasso
* Date: 21 October 2020
* Modifiers: Joann Saeou, Janet Blohn, Verlee Washington, Nicole Forke
* Description: APIs for managing session Users
===================================================*/

/**
 * Require statements
 */

const express = require('express');
const User = require('../models/user');
const UserRoleSchema = require('../schemas/user-role');
const bcrypt = require('bcryptjs');
const ErrorResponse = require('../services/error-response');
const BaseResponse = require('../services/base-response');

/**
 * Configurations
 */
const router = express.Router();
const saltRounds = 10; //default salt rounds for password hashing

/**
 * ==============================================================================
 *  User sign-in (sprint 1)
 *  Author: Verlee Washington
 * ==============================================================================
 **/
router.post('/signin', async(req, res) => {
    try {
        User.findOne({ 'userName': req.body.userName }, function(err, user) {
            if (err) {
                console.log(err);
                const signinMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                res.status(500).send(signinMongodbErrorResponse.toObject());
            } else {
                console.log(user);

                // if the username is valid
                if (user) {
                    let passwordIsValid = bcrypt.compareSync(req.body.password, user.password); // compare the saved hashed password

                    // if the password is valid
                    if (passwordIsValid && !user.isDisabled) {
                        console.log(`Login successful`);
                        const signinResponse = new BaseResponse(200, 'Login successful', user);
                        res.json(signinResponse.toObject());
                    }
                    else {
                      // if the password is invalid
                      console.log(`Invalid password for username: ${user.userName}`);
                      const invalidPasswordResponse = new BaseResponse(401, "Invalid user name and/or password, please try again", req.body.password);
                      res.json(invalidPasswordResponse.toObject());
                  }
                }

                // if the username is invalid
                else {
                    console.log(`Username: ${req.body.userName} is invalid`);
                    const invalidUserNameResponse = new BaseResponse(401, 'Invalid username and/or password, please try again', req.body.userName);
                    //res.status(400).send(invalidUserNameResponse.toObject());
                    res.json(invalidUserNameResponse.toObject());
                    console.log(invalidUserNameResponse);
                }
            }
        })
    } catch (e) {
        console.log(e);
        const signinCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
        res.status(500).send(signinCatchErrorResponse.toObject());
    }

});

/**
 * ==============================================================================
 * Sprint 2 -
 * API:  Register
 * Author: Joann Saeou
 * Date: 10/29/2020
 * ==============================================================================
 **/

router.post('/register', async(req, res) => {
    try {
        User.findOne({ 'userName': req.body.userName }, function(err, user)

            {
                if (err) {
                    console.log(err);
                    const registerUserMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
                    res.status(500).send(registerUserMongodbErrorResponse.toObject());

                } else {
                    if (!user) {

                        let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds); // salt/hash the password

                        // user object here

                        let registeredUser = {
                            userName: req.body.userName,
                            password: hashedPassword,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            phoneNumber: req.body.phoneNumber,
                            address: req.body.address,
                            email: req.body.email,
                            role: UserRoleSchema,
                            selectedSecurityQuestions: req.body.selectedSecurityQuestions

                        };

                        User.create(registeredUser, function(err, newUser)

                            {
                                if (err) {
                                    console.log(err);
                                    const newUserMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
                                    res.status(500).send(newUserMongodbErrorResponse.toObject());
                                } else {

                                    console.log(newUser);
                                    const registeredUserResponse = new BaseResponse('200', 'Registration successful', newUser);
                                    res.json(registeredUserResponse.toObject());
                                }
                            })
                    } else {
                        console.log('The provided username already exists in our system');
                        const userAlreadyExistsErrorResponse = new ErrorResponse('500', 'User already exists', null);
                        res.status(500).send(userAlreadyExistsErrorResponse.toObject());
                    }
                }
            })
    } catch (e) {
        console.log(e);
        const registerUserCatchErrorResponse = new Error('500', 'Internal server error', e.message);
        res.status(500).send(registerUserCatchErrorResponse.toObject());
    }
});

/**
 * =====================================
 * Sprint 2
 * API: Verify User
 * Author: Nicole Forke
 * Date: 10/29/2020
 * =====================================
 */
router.get('/verify/users/:userName', async(req, res) => {
    try {
        User.findOne({ 'userName': req.params.userName }, function(err, user) {

            if (err) {
                console.log(err);
                const verifyUserMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
                res.status(500).send(verifyUserMongodbErrorResponse.toObject());

            } else {
                console.log(user);
                const verifyUserResponse = new BaseResponse('200', 'User verification successful', user);
                res.json(verifyUserResponse.toObject());
            }
        })
    } catch (e) {
        console.log(e);
        const verifyUserCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
        res.status(500).send(verifyUserCatchErrorResponse.toObject());
    }
});

/*********************************************
 * API: VerifySecurityQuestions
 * Added 10/29/20 Janet re-added 10/31
 **********************************************/
router.post('/verify/users/:userName/selectedSecurityQuestions', async(req, res) => {
  try {
      // Locate the user by userName
      User.findOne({ 'userName': req.params.userName }, function(err, user) {
          if (err) {
              // Send an error response if not found
              console.log(err);
              const verifySecurityQuestionsErrorResponse = new ErrorResponse('500', 'Internal server error', err);
              res.status.apply(500).send(verifySecurityQuestionsErrorResponse.toObject());
          } else {
              // Otherwise get their selected Security Questions
              console.log(user);

              const selectedSecurityQuestionOne = user.selectedSecurityQuestions.find(q => q.questionText === req.body.questionText1);
              const selectedSecurityQuestionTwo = user.selectedSecurityQuestions.find(q2 => q2.questionText === req.body.questionText2);
              const selectedSecurityQuestionThree = user.selectedSecurityQuestions.find(q3 => q3.questionText === req.body.questionText3);

              // Get their answers to their selected Security Questions
              const isValidAnswerOne = selectedSecurityQuestionOne.answerText === req.body.answerText1;
              const isValidAnswerTwo = selectedSecurityQuestionTwo.answerText === req.body.answerText2;
              const isValidAnswerThree = selectedSecurityQuestionThree.answerText === req.body.answerText3;

              if (isValidAnswerOne && isValidAnswerTwo && isValidAnswerThree) {
                  // If the Answers are correct, send a message to the console and log as a successful find
                  console.log('User $(user.userName) answered their security questions correctly');
                  const validSecurityQuestionsResponse = new BaseResponse('200', 'success', user);
                  res.json(validSecurityQuestionsResponse.toObject());
              } else {
                  // Otherwise send a message indicating the answers were incorrect to the console, but still mark as a 200, as they were found
                  console.log('User $(user.userName) did not answer their security question correctly');
                  const invalidSecurityQuestionsResponse = new BaseResponse('200', 'error', user);
                  res.json(invalidSecurityQuestionsResponse.toObject());
              }
          }
      })
  } catch (e) {
      console.log(e);
      const verifySecurityQuestionsCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
      res.status(500).send(verifySecurityQuestionsCatchErrorResponse.toObject());
  }
});

/**
 * ====================================
 * Sprint 2
 * API Reset Password
 * Author: Nicole Forke
 * Date: 10/29/2020
 * ====================================
 */
router.post('/users/:userName/password', async(req, res) => {

    try {
        const password = req.body.password;

        /**
         * find user in database
         */
        User.findOne({ 'userName': req.params.userName }, function(err, user) {

            if (err) {

                console.log(err);
                const resetPasswordMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
                res.status(500).send(resetPasswordMongodbErrorResponse.toObject());

            } else {

                console.log(user);

                let hashedPassword = bcrypt.hashSync(password, saltRounds); // salt/has the password

                /**
                 * set new password that's hashed to the database
                 */
                user.set({
                    password: hashedPassword
                });

                /**
                 * save new password to database
                 */
                user.save(function(err, updatedUser) {

                    if (err) {

                        console.log(err);
                        const updatedUserMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
                        res.status(500).send(updatedUserMongodbErrorResponse.toObject());

                    } else {

                        console.log(updatedUser);
                        const updatedPasswordResponse = new BaseResponse('200', 'Password update successful', updatedUser);
                        res.json(updatedPasswordResponse.toObject());
                    }
                })
            }
        })

    } catch (e) {

        console.log(e);
        const resetPasswordCatchError = new ErrorResponse('500', 'Internal server error', e);
        res.status(500).send(resetPasswordCatchError.toObject());
    }
});

module.exports = router;

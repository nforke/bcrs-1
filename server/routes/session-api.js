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
const bcrypt = require('bcryptjs');
const ErrorResponse = require('../services/error-response');
const BaseResponse = require('../services/base-response');

/**
 * Configurations
 */

const router = express.Router();

/**
 * ==============================================================================
 *  User sign-in
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
                    if (passwordIsValid) {
                        console.log(`Login successful`);
                        const signinResponse = new BaseResponse(200, 'Login successful', user);
                        res.json(signinResponse.toObject());
                    }

                    // if the password is not invalid
                    else {
                        console.log(`Invalid password for username: ${user.userName}`);
                        const invalidPasswordResponse = new BaseResponse(401, 'Invalid username and/or password, please try again', null);
                        res.status(401).send(invalidPasswordResponse.toObject());
                    }
                }

                // if the username is invalid
                else {
                    console.log(`Username: ${req.body.userName} is invalid`);
                    const invalidUserNameResponse = new BaseResponse(401, 'Invalid username and/or password, please try again', null);
                    res.status(401).send(invalidUserNameResponse.toObject());
                }
            }
        })
    } catch (e) {
        console.log(e);
        const signinCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
        res.status(500).send(signinCatchErrorResponse.toObject());
    }
});

/*********************************************
  * API: VerifySecurityQuestions
  * Added 10/29/20 Janet
**********************************************/
router.post('/verify/users/:userName/securityQuestions', async (req, res) => {
  try
  {
    // Locate the user by userName
    User.findOne({'userName': req.params.userName}, function(err, user)
    {
      if (err)
      {
        // Send an error response if not found
        console.log(err);
        const verifySecurityQuestionsErrorResponse = new ErrorResponse('500', 'Internal server error', err);
        res.status.apply(500).send(verifySecurityQuestionsErrorResponse.toObject());
      }
      else
      {
        // Otherwise get their selected Security Questions
        console.log(user);

        const selectedSecurityQuestionOne = user.selectedSecurityQuestions.find(q => q.questionId === req.body.questionId1);
        const selectedSecurityQuestionTwo = user.selectedSecurityQuestions.find(q2 => q2.questionId === req.body.questionId2);
        const selectedSecurityQuestionThree = user.selectedSecurityQuestions.find(q3 => q3.questionId === req.body.questionId);

        // Get their answers to their selected Security Questions
        const isValidAnswerOne = selectedSecurityQuestionOne.answerText === req.body.answerText1;
        const isValidAnswerTwo = selectedSecurityQuestionTwo.answerText === req.body.answerText2;
        const isValidAnswerThree = selectedSecurityQuestionThree.answerText === req.body.answerText3;

        if (isValidAnswerOne && isValidAnswerTwo && isValidAnswerThree)
        {
          // If the Answers are correct, send a message to the console and log as a successful find
          console.log('User $(user.userName) answered their security questions correctly');
          const validSecurityQuestionsResponse = new BaseResponse('200', 'success', user);
          res.json(validSecurityQuestionsResponse.toObject());
        }
        else
        {
          // Otherwise send a message indicating the answers were incorrect to the console, but still mark as a 200, as they were found
          console.log('User $(user.userName) did not answer their security question correctly');
          const invalidSecurityQuestionsResponse = new BaseResponse('200', 'error', user);
          res.json(invalidSecurityQuestionsResponse.toObject());
        }
      }
    })
  }
  catch (e)
  {
    console.log(e);
    const verifySecurityQuestionsCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
    res.status(500).send(verifySecurityQuestionsCatchErrorResponse.toObject());
  }
});


module.exports = router;

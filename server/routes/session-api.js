/*
===================================================
* Title: session-api.js
* Author: Professor Krasso
* Date: 21 October 2020
* Modifiers: Joann Saeou, Janet Blohn, Verlee Washington, Nicole Forke
* Description: Group 1  Sprint 1 - APIs for managing session Users
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
  try
  {
    User.findOne({'userName': req.body.userName}, function(err, user)
    {
      if (err)
      {
        console.log(err);
        const signinMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
        res.status(500).send(signinMongodbErrorResponse.toObject());
      }

      else
      {
        console.log(user);

        // if the username is valid
        if (user)
        {
          let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);// compare the saved hashed password

          // if the password is valid
          if (passwordIsValid)
          {
            console.log(`Login successful`);
            const signinResponse = new BaseResponse(200, 'Login successful', user);
            res.json(signinResponse.toObject());
          }

          // if the password is not invalid
          else
          {
            console.log( `Invalid password for username: ${user.userName}`);
            const invalidPasswordResponse = new BaseResponse(401, 'Invalid username and/or password, please try again', null);
            res.status(401).send(invalidPasswordResponse.toObject());
          }
        }

        // if the username is invalid
        else
        {
          console.log(`Username: ${req.body.userName} is invalid`);
          const invalidUserNameResponse = new BaseResponse(401, 'Invalid username and/or password, please try again', null);
          res.status(401).send(invalidUserNameResponse.toObject());
        }
      }
    })
  }

  catch(e)
  {
    console.log(e);
    const signinCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
    res.status(500).send(signinCatchErrorResponse.toObject());
  }
});


module.exports = router;

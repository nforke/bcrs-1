/*
============================================
* Title: securityQuestions-api.js
* Author: Professor Krasso
* Date: 20 October 2020
* Modifiers: Nicole Forke, Janet Blohn, Verlee Washington, Joann Saeou
* Description: Group 1 BCRS  NodeJS  api routing for securityQuestion object
* Node.js module for the security questions api
* Added to project 10/20/20 by Janet Blohn
============================================
*/

// Create the requirements
const express = require('express');
const SecurityQuestion = require('../models/securityQuestion');
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response');

const router = express.Router();

/**
  * FindAll
  */
  router.get('/', async(req, res) => {
    try
    {// query security question collection were disabled equals false then execute query
      SecurityQuestion.find({})
        .where('isDisabled')// mongoose built in function
        .equals(false)
        .exec(function(err, securityQuestions)
      {
        if (err)
          {
            console.log(err);
            const findAllMongodbErrorResponse = new ErrorResponse(500, 'Internal server error.', err);
            res.status(500).send(findAllMongodbErrorResponse.toObject());
          }

        else
          {
            console.log(securityQuestions);
            const findAllResponse = new BaseResponse(200, 'Query successful.', securityQuestions);
            res.json(findAllResponse.toObject());
          }

        })
    }

    catch (e)
    {
      console.log(e);
      const findAllCatchErrorResponse = new ErrorResponse(500, 'Internal server error.', e.message);
      res.status(500).send(findAllCatchErrorResponse.toObject());
    }
  });

/*********************************************
  * API: findById
**********************************************/
  router.get('/:id', async(req, res) => {

    try {
      SecurityQuestion.findOne({'_id': req.params.id}, function(err, securityQuestion) {
        if (err) {
          console.log(err);
          const findByIdMongoDbErrorResp = new ErrorResponse('500', 'Internal server error', err);
          res.status(500).send(findByIdMongoDbErrorResp.toObject());
        } else {
          console.log(securityQuestion);
          const findByIdMongoDbSuccessResp = new BaseResponse('200', 'Successful search', securityQuestion);
              res.json(findByIdMongoDbSuccessResp.toObject());
        }
      })
    } catch (e) {
      console.log(e);
      const findByIdErrorCatchResp = new ErrorResponse('500', 'Internal server error', e.message);
      res.status(500).send(findByIdErrorCatchResp.toObject());
    }

  });

  /**
 * CreateSecurityQuestion
 */
  router.post('/', async(req, res) => {
    try
    {
      let newSecurityQuestion = {
        text: req.body.text
      };

      SecurityQuestion.create(newSecurityQuestion, function(err, securityQuestion) {
        if (err)
        {
          console.log(err);
          const createSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, 'Internal server error.', err);
          res.status(500).send(createSecurityQuestionMongodbErrorResponse.toObject());
        } else {
          console.log(securityQuestion);
          const createSecurityQuestionResponse = new BaseResponse(200, 'Security question add was successful.', securityQuestion);
          res.json(createSecurityQuestionResponse.toObject());
        }

      })
    }

    catch (e)
    {
      console.log(e);
      const createSecurityQuestionCatchErrorResponse = new ErrorResponse(500, 'Internal server error.', e.message);
      res.status(500).send(createSecurityQuestionCatchErrorResponse.toObject());

    }
  });


/**
 * UpdateSecurityQuestion
 */

 router.put('/:id', async(req, res) => {
  try
  {
   SecurityQuestion.findOne({'_id': req.params.id}, function(err, securityQuestion) {
     if (err) {
        console.log(err);
        const updateSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, 'Internal server error.', err)
        res.status(500).send(updateSecurityQuestionMongodbErrorResponse.toObject());
      } else {
        console.log(securityQuestion);

        securityQuestion.set({
          text: req.body.text
        });

        securityQuestion.save(function(err, savedSecurityQuestion) {
          if (err) {
            console.log(err);
            const savedSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, 'Internal server error.', err);
            res.status(500).send(savedSecurityQuestionMongodbErrorResponse.toObject());
          } else {
            console.log("Saved:" + savedSecurityQuestion);
            console.log("Security Question:" + securityQuestion);
            const updateSecurityQuestionResponse = new BaseResponse(200, 'Update successful.', savedSecurityQuestion);
            res.json(updateSecurityQuestionResponse.toObject());
          }
        })
      }
    })
  }

  catch (e)
  {
    console.log(e);
    const updateSecurityQuestionCatchErrorResponse = new ErrorResponse(500, 'Internal server error.', e.message);
    res.status(500).send(updateSecurityQuestionCatchErrorResponse.toObject());
  }
});

/**

 /**
 * DeleteSecurityQuestion
 */
router.delete('/:id', async(req, res) => {
  try
  {
    SecurityQuestion.findOne({'_id': req.params.id}, function(err, securityQuestion) {
      if (err)
      {
        console.log(err);
        const deleteSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, 'Internal server error.', err)
        res.status(500).send(deleteSecurityQuestionMongodbErrorResponse.toObject());
      }

      else
      {
        console.log(securityQuestion);

        securityQuestion.set({
          isDisabled: true //soft delete
        });

        securityQuestion.save(function(err, savedSecurityQuestion) {
          if (err)
          {
            console.log(err);
            const savedSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, 'Internal server error.', err);
            res.status(500).send(savedSecurityQuestionMongodbErrorResponse.toObject());
          }

          else
          {
            console.log(savedSecurityQuestion);
            const deleteSecurityQuestionResponse = new BaseResponse(200, 'Delete successful.', savedSecurityQuestion);
            res.json(deleteSecurityQuestionResponse.toObject());
          }
        })
      }
    })
  }

  catch (e)
  {
    console.log(e);
    const deleteSecurityQuestionCatchErrorResponse = new ErrorResponse(500, 'Internal server error.', e.message);
    res.status(500).send(deleteSecurityQuestionCatchErrorResponse.toObject());
  }
});

  // Export this as a router
  module.exports = router;

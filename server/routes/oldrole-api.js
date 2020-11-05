/*
============================================
* Title: roles-api.js
* Author: Professor Krasso
* Date: 20 October 2020
* Modifiers: Nicole Forke, Janet Blohn, Joann Saeou
* Description:  BCRS NodeJS api route for role object
* Node.js module for the role api
* Added to project 11/04/20 by Janet Blohn
============================================
*/

// Create the requirements
const express = require('express');
const Role = require('../schemas/user-role');
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response');

const router = express.Router();

/**
  * FindAll
  */
/*  router.get('/', async(req, res) => {
    try
    {// query role collection were disabled equals false then execute query
      Role.find({})
        .where('isDisabled')// mongoose built in function
        .equals(false)
        .exec(function(err, roles)
      {
        if (err)
          {
            console.log(err);
            const findAllMongodbErrorResponse = new ErrorResponse(500, 'Internal server error.', err);
            res.status(500).send(findAllMongodbErrorResponse.toObject());
          }

        else
          {
            console.log(roles);
            const findAllResponse = new BaseResponse(200, 'Query successful.', roles);
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
  });*/

/*********************************************
  * API: findById
**********************************************/
/*  router.get('/:id', async(req, res) => {

    try {
      Role.findOne({'_id': req.params.id}, function(err, role) {
        if (err) {
          console.log(err);
          const findByIdMongoDbErrorResp = new ErrorResponse('500', 'Internal server error', err);
          res.status(500).send(findByIdMongoDbErrorResp.toObject());
        } else {
          console.log(role);
          const findByIdMongoDbSuccessResp = new BaseResponse('200', 'Successful search', role);
              res.json(findByIdMongoDbSuccessResp.toObject());
        }
      })
    } catch (e) {
      console.log(e);
      const findByIdErrorCatchResp = new ErrorResponse('500', 'Internal server error', e.message);
      res.status(500).send(findByIdErrorCatchResp.toObject());
    }

  });*/

/*********************************************
  * API: createRole
  * Added 11/04/20 Janet
**********************************************/
  router.post('/', async(req, res) => {
    try
    {
      let newRole = {
        text: req.body.text
      };

      Role.create(newRole, function(err, role) {
        if (err)
        {
          console.log(err);
          const createRoleMongodbErrorResponse = new ErrorResponse(500, 'Internal server error.', err);
          res.status(500).send(createRoleMongodbErrorResponse.toObject());
        } else {
          console.log(role);
          const createRoleResponse = new BaseResponse(200, 'Role add was successful.', role);
          res.json(createRoleResponse.toObject());
        }

      })
    }

    catch (e)
    {
      console.log(e);
      const createRoleCatchErrorResponse = new ErrorResponse(500, 'Internal server error.', e.message);
      res.status(500).send(createRoleCatchErrorResponse.toObject());

    }
  });


/**
 * UpdateRole
 */

 /*router.put('/:id', async(req, res) => {
  try
  {
   Role.findOne({'_id': req.params.id}, function(err, role) {
     if (err) {
        console.log(err);
        const updateRoleMongodbErrorResponse = new ErrorResponse(500, 'Internal server error.', err)
        res.status(500).send(updateRoleMongodbErrorResponse.toObject());
      } else {
        console.log(role);

        role.set({
          text: req.body.text
        });

        role.save(function(err, savedRole) {
          if (err) {
            console.log(err);
            const savedRoleMongodbErrorResponse = new ErrorResponse(500, 'Internal server error.', err);
            res.status(500).send(savedRoleMongodbErrorResponse.toObject());
          } else {
            console.log("Saved:" + savedRole);
            console.log("Security Question:" + role);
            const updateRoleResponse = new BaseResponse(200, 'Update successful.', savedRole);
            res.json(updateRoleResponse.toObject());
          }
        })
      }
    })
  }

  catch (e)
  {
    console.log(e);
    const updateRoleCatchErrorResponse = new ErrorResponse(500, 'Internal server error.', e.message);
    res.status(500).send(updateRoleCatchErrorResponse.toObject());
  }
});*/

/**

 /**
 * DeleteRole
 */
/*router.delete('/:id', async(req, res) => {
  try
  {
    Role.findOne({'_id': req.params.id}, function(err, role) {
      if (err)
      {
        console.log(err);
        const deleteRoleMongodbErrorResponse = new ErrorResponse(500, 'Internal server error.', err)
        res.status(500).send(deleteRoleMongodbErrorResponse.toObject());
      }

      else
      {
        console.log(role);

        role.set({
          isDisabled: true //soft delete
        });

        role.save(function(err, savedRole) {
          if (err)
          {
            console.log(err);
            const savedRoleMongodbErrorResponse = new ErrorResponse(500, 'Internal server error.', err);
            res.status(500).send(savedRoleMongodbErrorResponse.toObject());
          }

          else
          {
            console.log(savedRole);
            const deleteRoleResponse = new BaseResponse(200, 'Delete successful.', savedRole);
            res.json(deleteRoleResponse.toObject());
          }
        })
      }
    })
  }

  catch (e)
  {
    console.log(e);
    const deleteRoleCatchErrorResponse = new ErrorResponse(500, 'Internal server error.', e.message);
    res.status(500).send(deleteRoleCatchErrorResponse.toObject());
  }
});*/

  // Export this as a router
  module.exports = router;

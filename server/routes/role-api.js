/*
============================================
* Title: role-api.js
* Author: Professor Krasso
* Date: 04 November 2020
* Modifiers: Nicole Forke, Janet Blohn, Joann Saeou
* Description: Group 1 BCRS  NodeJS api routing for role object
* Node.js module for the role api
* Added to project 11/04/20 by Janet Blohn
============================================
*/

/**
 * Require statements
 */

const express = require('express');
const Role = require('../models/role');
//const UserRoleSchema = require('../schemas/user-role');
const ErrorResponse = require('../services/error-response');
const BaseResponse = require('../services/base-response');

const router = express.Router();

/**
 * ==============================================================================
 * Sprint 3 -
 * API: FindAllRoles
 * Author: Joann Saeou
 * Date: 11/04/2020
 * ==============================================================================
 **/

router.get('/', async(req, res) => {
  try {
    Role.find({})
      .where('isDisabled')
      .equals(false)
      .exec(function(err, role) {
        if (err) {
          console.log(err);
          const findAllRolesMongodbErrorResponse = new ErrorResponse('500', 'internal Server error', err);
          res.status(500).send(findAllRolesMongodbErrorResponse.toObject());
        }
        // if no error will send back the object for base response
        else
        {
          console.log(roles);
          const findAllRolesResponse = new BaseResponse('200', 'Query successful', role);
          res.json(findAllRolesResponse.toObject());
        }
      })
    } catch (e) {
        console.log(e);
        const findAllRolesCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e);
        res.json(findAllRolesResponse.toObject());
    }
});

/**
 * ==============================================================================
 * Sprint 3 -
 * API: FindById
 * Author: Joann Saeou
 * Date: 11/04/2020
 * ==============================================================================
 **/

router.get('/:roleId', async(req, res) => {
  try {
    Role.findOne({ '_id': req.params.roleId }, function(err, role) {
       if (err)
         {
           console.log(err);
           const findRoleByIdMongodbErrorResponse = new ErrorResponse('500', 'internal Server error', err);
           res.status(500).send(findRoleByIdMongodbErrorResponse.toObject());
         }

        // if no error will send back the object for base response
        else
        {
          console.log(roles);
          const findRoleByIdResponse = new BaseResponse('200', 'Query successful', role);
          res.json(findRoleByIdResponse.toObject());
        }
      })
    } catch (e) {
      console.log(e);
      const findRoleByIdCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
      res.status(500).send(findRoleByIdCatchErrorResponse.toObject());
    }
});

/*********************************************
 * API: CreateRole
 * Janet Blohn
 * 11/04/2020
 **********************************************/
router.post('/', async(req, res) => {
  try {  // Check to make sure the new role doesn't already exist
    Role.findOne({ 'text': req.body.text }, function(err, role) {
      if (err) {
        console.log(err);
        const addRoleMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
        res.status(500).send(addRoleMongodbErrorResponse.toObject());
      } else {
        if (!role) {  // If the role doesn't exist yet, create it.
          const newRole = {text: req.body.text};
          Role.create(newRole, function(err, roles) {
            if (err) {
              console.log(err);
              const newRoleMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
              res.status(500).status(500).send(newRoleMongodbErrorResponse.toObject());
            } else {
              console.log(roles);
              const addRoleResponse = new BaseResponse('200', 'New role created', role);
              res.json(addRoleResponse.toObject());
            }
          })
        } else {
        console.log('The role already exists in our system');
        const roleAlreadyExistsErrorResponse = new ErrorResponse('500', 'Role already exists in our system');
        res.status(500).send(roleAlreadyExistsErrorResponse.toObject());
      }
    }
  })
  } catch (e) {
    console.log(e);
    const addRoleCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
    res.status(500).send(addRoleCatchErrorResponse.toObject());
  }
});

module.exports = router;

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

/*********************************************
 * API: findAllRoles
 **********************************************/
router.get('/', async(req, res) => {
  try {
      Role.find({}),function(err, role) {

          if (err) {
              console.log(err);
              const findAllRolesErrorResp = new ErrorResponse('500', 'Internal server error', err);
              res.status(500).send(findAllRolesErrorResp.toObject());
          } else {
              console.log(users);
              const findAllRolesSuccessResp = new BaseResponse('200', 'Successful query', role);
              res.json(findAllRolesSuccessResp.toObject());
          }
      };
  } catch (e) {
      console.log(e);
      const findAllRolesErrorCatchResp = new ErrorResponse('500', 'Internal server error', e.message);
      res.status(500).send(findAllRolesErrorCatchResp.toObject());
  }
});


/*********************************************
  * API: CreateRole
**********************************************/
router.post('/', async(req, res) => {
  try
  {

    Role.findOne({'text': req.body.text}, function(err, role) {
      if (err)
      {
        console.log(err);
        const addRoleMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
        res.status(500).send(addRoleMongodbErrorResponse.toObject());
      }
      else
      {
        if (!role) {

        const newRole = {
          text: req.body.text
        };

          Role.create(newRole, function(err, roles)
          {
            if (err)
            {
              console.log(err);
              const newRoleMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
              res.status(500).status(500).send(newRoleMongodbErrorResponse.toObject());
            }
            else{
              console.log(roles);
              const addRoleResponse = new BaseResponse('200', 'New role created', role);
              res.json(addRoleResponse.toObject());
            }
          })
        }
        else{
          console.log('The role already exists in our system');
          const roleAlreadyExistsErrorResponse = new ErrorResponse('500', 'Role already exists in our system');
          res.status(500).send(roleAlreadyExistsErrorResponse.toObject());
        }
      }
    })
  } catch (e)
  {
    console.log(e);
    const addRoleCatchErrorResponse = new ErrorResponse('500','Internal server error', e.message);
    res.status(500).send(addRoleCatchErrorResponse.toObject());
  }
});

module.exports = router;

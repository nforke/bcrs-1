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
const User = require('../models/user');
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
            .exec(function(err, roles) { // was role, corrected 11/05/20 Janet
                if (err) {
                    console.log(err);
                    const findAllRolesMongodbErrorResponse = new ErrorResponse('500', 'internal Server error', err);
                    res.status(500).send(findAllRolesMongodbErrorResponse.toObject());
                }
                // if no error will send back the object for base response
                else {
                    console.log(roles);
                    const findAllRolesResponse = new BaseResponse('200', 'Query successful', roles); // was role, corrected 11/05/20 Janet
                    res.json(findAllRolesResponse.toObject());
                }
            })
    } catch (e) {
        console.log(e);
        const findAllRolesCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e);
        res.json(findAllRolesCatchErrorResponse.toObject());
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
            if (err) {
                console.log(err);
                const findRoleByIdMongodbErrorResponse = new ErrorResponse('500', 'internal Server error', err);
                res.status(500).send(findRoleByIdMongodbErrorResponse.toObject());
            }

            // if no error will send back the object for base response
            else {
                console.log(role);
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
  try { // Check to make sure the new role doesn't already exist
    Role.findOne({ 'text': req.body.text }, function(err, role) {
      if (err) {
        console.log(err);
        const addRoleMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
        res.status(500).send(addRoleMongodbErrorResponse.toObject());
      } else {
        if (!role) { // If the role doesn't exist yet, create it.
          const newRole = { text: req.body.text };
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

/**
 * ===========================================
 * Sprint 3
 * API: UpdateRole
 * Added By: Nicole Forke
 * Date: 11/05/2020
 * ===========================================
 */

router.put('/:roleId', async(req, res) => {
  try {

     Role.findOne({'_id': req.params.roleId}, function(err, role) {
         if (err) {

             console.log(err);
             const updateRoleMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
             res.status(500).send(updateRoleMongodbErrorResponse.toObject());

         } else {

             console.log(role);

             // set the updated role
             role.set({
                 text: req.body.text
             });

             // save the updated role
             role.save(function(err, updatedRole) {

                 if (err) {

                     console.log(err);
                     const updatedRoleMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
                     res.status(500).send(updatedRoleMongodbErrorResponse.toObject());

                 } else {

                     console.log(updatedRole);
                     const updatedRoleResponse = new BaseResponse('200', 'Role updated successfully', updatedRole);
                     res.json(updatedRoleResponse.toObject());
                 }
             })
         }
     })
  } catch (e) {

     console.log(e);
     const updateRoleCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
     res.status(500).send(updateRoleCatchErrorResponse.toObject());
  }
});

/**
* =====================================
* Sprint 3
* API: DeleteRole
* Added By: Nicole Forke
* Date: 11/05/2020
* =====================================
*/
router.delete('/:roleId', async (req, res) => {
  try
  {
     /**
      * Find the role by document id
      */
     Role.findOne({'_id': req.params.roleId}, function(err, role)
     {
         if (err)
         {
             console.log(err);
             const deleteRoleMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
             res.status(500).send(deleteRoleMongodbErrorResponse.toObject());
         }
         else
         {
             console.log(role);

             /**
              * Aggregate query to determine if the role being deleted is already mapped to an existing user
              */
             User.aggregate(
             [
                 {
                     $lookup:
                     {
                         from: 'roles',
                         localField: 'role.role',
                         foreignField: 'text',
                         as: 'userRoles'
                     }
                 },
                 {
                     $match:
                     {
                         'userRoles.text': role.text
                     }
                 }
             ], function(err, users)
             {
                 if (err)
                 {
                     console.log(err);
                     const usersMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
                     res.json(500).send(usersMongodbErrorResponse.toObject());
                 }
                 else
                 {
                     /**
                      * If the query returns one or more users, then the role is already in use and shouldn't be disabled
                      */
                     if (users.length > 0)
                     {
                         console.log('Role <${role.text}> is already in use and cannot be deleted');
                         const userRoleAlreadyInUseResponse = new BaseResponse('200', 'Role <${role.text}> is already in use and cannot be deleted', role);
                         res.json(userRoleAlreadyInUseResponse.toObject());
                     }
                     else
                     {
                         /**
                          * Otherwise, the role requesting to be disabled is not in use and can be safely removed
                          */
                         console.log('Role <${role.text}> is not an active role and can be safely removed');

                         // set the role
                         role.set({
                             isDisabled: true
                         });

                         // save the role
                         role.save(function (err, updatedRole)
                         {
                             if (err)
                             {
                                 console.log(err);
                                 const updatedRoleMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
                                 res.status(500).send(updatedRoleMongodbErrorResponse.toObject());
                             }
                             else
                             {
                                 console.log(updatedRole);
                                 const roleDeletedresponse = new BaseResponse('200', 'Role <${role.text}> has been removed successfully', updatedRole);
                                 res.json(roleDeletedresponse.toObject());
                             }
                         })
                     }
                 }
             })
         }
     })
 }
 catch (e)
 {
     console.log(e);
     const deleteRoleCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
     res.status(500).send(deleteRoleCatchErrorResponse.toObject());
 }
});

module.exports = router;

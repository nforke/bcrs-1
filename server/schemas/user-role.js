/*
=============================================================
; Title:  user-role.js Schema
; Author: Nicole Forke, Janet Blohn, Verlee Washington, Joann Saeou
; Modified By: Nicole Forke
; Date:   21 October 2020
; Description: User Role Schema
;============================================================
*/

/**
 * Require Statements
 * Author: Nicole Forke
 * 10/22 Janet added d to the end of standar
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Define the User Role Schema
 * Created during Sprint 1
 */
let userRoleSchema = new Schema({
    role: { type: Object, default: 'standard' }
})

/**
 * Export the schema
 */
module.exports = userRoleSchema;

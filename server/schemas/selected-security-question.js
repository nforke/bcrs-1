/*
=============================================================
; Title:  securityQuestion.js Schema
; Author: Nicole Forke, Janet Blohn, Verlee Washington, Joann Saeou
; Modified By: Nicole Forke
; Date:   21 October 2020
; Description: Selected Security Question Schema
;============================================================
*/

/**
 * Require Statements
 * Author: Nicole Forke
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Define the Selected Security Question Schema
 * Created during Sprint 1
 */
let selectedSecurityQuestionSchema = new Schema({
    questionText: { type: String },
    answerText: { type: String }
})

/**
 * Export the Schema
 */

module.exports = selectedSecurityQuestionSchema;

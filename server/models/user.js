/*
 * Title: user.js
 * Author: Nicole Forke, Janet Blohn, Verlee Washington, Joann Saeou
 * Date: 21 October  2020
 * Modified: Joann Saeou
 * Description: Group 1 - BCRS creating user schema model
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserRoleSchema = require('../schemas/selected-security-question');
const SelectedSecurityQuestionSchema = require('../schemas/selected-security-question');

const userSchema = new Schema({
    userName: { type: String, required: true, dropDups: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    phoneNumber: { type: String },
    address: { type: String },
    isDisabled: { type: Boolean, default: false },
    role: UserRoleSchema,
    selectedSecurityQuestions: [SelectedSecurityQuestionSchema],
    dateCreated: { type: String, default: new Date() },
    dateModified: { type: Date }
}, { collection: 'users' });

module.exports = mongoose.model('User', userSchema);

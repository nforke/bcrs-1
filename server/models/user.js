/*
 * Title: user.js
 * Author: Nicole Forke, Janet Blohn, Verlee Washington, Joann Saeou
 * Date: 21 October  2020
 * Modified: Joann Saeou
 * Description: Group 1 - BCRS creating user schema model
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserRoleSchema = require('../schemas/user-role');
const SelectedSecurityQuestionSchema = require('../schemas/selected-security-question');

const userSchema = new Schema({
    userName: { type: String, required: true, dropDups: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    phoneNumber: { type: String },
    address: { type: String },
    email: { type: String },
    isDisabled: { type: Boolean, default: false },
    role: UserRoleSchema,
    selectedSecurityQuestions: [SelectedSecurityQuestionSchema],
    dateCreated: { type: String, default: new Date() },
    dateModified: { type: Date }
}, { collection: 'users', // implicitly specifying the collection we're connecting to
    versionKey: false }); // Don't create a version key on new records

module.exports = mongoose.model('User', userSchema);

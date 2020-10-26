/**
 * =====================================================================
 * Title: Bobs Computer Repair Shop
 * Author: Nicole Forke, Janet Blohn, Verlee Washington, and Joann Saeou
 * Date: 10/22/2020
 * Description: Security question model
 * =====================================================================
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let securityQuestionsSchema = new Schema({ // mapping the module
        question: { type: String },
        isDisabled: { type: Boolean, default: false } // enabled record by default
    }, { collection: 'securityQuestions' }) // implicitly specifying the collection we're connecting to

module.exports = mongoose.model('SecurityQuestions ', securityQuestionsSchema);

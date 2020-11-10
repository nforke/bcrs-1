/*
=============================================================
; Title:  line-item.js Schema
; Author: Nicole Forke, Janet Blohn, Joann Saeou
; Modified By: Nicole Forke
; Date:   21 October 2020
; Description:  Line Item Schema for invoice
;============================================================
*/

/**
 * Require Statements
 * Author: Nicole Forke
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Define the Invoice Line Item Schema
 * Created during Sprint 1
 */
let lineItemSchema = new Schema({
    title: { type: String },
    price: { type: Number }
});

/**
 * Export the schema
 */
module.exports = lineItemSchema;

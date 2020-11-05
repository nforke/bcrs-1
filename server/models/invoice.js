/**
 * =====================================================================
 * Title: invoice.js
 * Author: Nicole Forke, Janet Blohn, and Joann Saeou
 * Date: 11/04/2020
 * Modified By: Joann Saeou
 * Description: creating invoice model to import the schemas
 * =====================================================================
 */



/** Require statements  */
const mongoose = require('mongoose');
const LineItemSchema = require('../schemas/line-item');
const Schema = mongoose.Schema;



let invoiceSchema = new Schema({
    userName: { type: Schema },
    LineItems: [LineItemSchema],
    partsAmounts: { type: Number },
    labourAmounts: { type: Number },
    lineItemTotal: { type: Number },
    total: { type: Number },
    orderDate: { type: Date, default: new Date() }
})


module.exports = mongoose.model('Invoice', invoiceSchema);
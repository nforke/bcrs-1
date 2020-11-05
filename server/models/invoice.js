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


// Invoice Schema to return more information results for users
let invoiceSchema = new Schema({
    userName: { type: Schema },
    LineItems: [LineItemSchema], // must be  used along with the line-item.js schemas  file
    partsAmounts: { type: Number },
    labourAmounts: { type: Number },
    lineItemTotal: { type: Number },
    total: { type: Number },
    orderDate: { type: Date, default: new Date() }
})


module.exports = mongoose.model('Invoice', invoiceSchema);

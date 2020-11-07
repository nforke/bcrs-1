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
    userName: { type: String },  // Change from Schema 11/05/20 Janet
    lineItems: [LineItemSchema],  // Uncapitalize the l for lineItems 11/05 Janet
    partsAmount: { type: Number },  // Change from Amounts to Amount 11/05 Janet
    laborAmount: { type: Number },  // Change from Amounts to Amount also remove "u" in labor 11/05 Janet
    lineItemTotal: { type: Number },
    total: { type: Number },
    orderDate: { type: Date, default: new Date() }
}, {collection: 'invoices'});


module.exports = mongoose.model('Invoice', invoiceSchema);

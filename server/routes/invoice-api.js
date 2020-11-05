/*
============================================
* Title: invoice-api.js
* Author: Professor Krasso
* Date: 05 November 2020
* Modifiers: Nicole Forke, Janet Blohn, Joann Saeou
* Description: Group 1 BCRS  NodeJS api routing for invoice object
* Node.js module for the invoice api
* Added to project 11/05/20 by Janet Blohn
============================================
*/

/**
 * Require statements
 */

const express = require('express');
const Invoice = require('../models/invoice');
const ErrorResponse = require('../services/error-response');
const BaseResponse = require('../services/base-response');

const router = express.Router();

/*********************************************
 * API: CreateInvoice
 * Janet Blohn
 * 11/05/2020
 **********************************************/
router.post('/:userName', async(req, res) => { // POST the invoice by userName
  try {
    const userName = req.params.userName;

    const newInvoice = {  // Get the fields from what the user chose
      username: userName,
      lineItems: req.body.lineItems,
      partsAmount: req.body.partsAmount,
      laborAmount: request.body.laborAmount,
      lineItemTotal: req.body.lineItemTotal,
      total: req.body.total
    }

    console.log(newInvoice);

    Invoice.create(newInvoice, function(err, invoice) {
      if (err) {
        console.log(err);
        const createInvoiceMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
        res.status(500).status(500).send(createInvoiceMongodbErrorResponse.toObject());
      } else {
        console.log(invoice);
        const createInvoiceResponse = new BaseResponse('200', 'New invoice created', invoice);
        res.json(createInvoiceResponse.toObject());
      }
    })
  } catch (e) {
    console.log(e);
    const createInvoiceCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
    res.status(500).send(createInvoiceCatchErrorResponse.toObject());
  }
});

module.exports = router;

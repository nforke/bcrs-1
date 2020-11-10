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
      userName: userName,
      lineItems: req.body.lineItems,
      partsAmount: req.body.partsAmount,
      laborAmount: req.body.laborAmount,
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

/**
 * =========================================
 * Sprint 3
 * API Find Purchases By Service
 * Added By: Nicole Forke
 * Date: 11/05/2020
 * =========================================
 */
router.get('/purchases-graph', async(req, res) => {
  try
  {
    Invoice.aggregate([
      {
        $unwind: '$lineItems'
      },
      {
        $group:
        {
          '_id':
          {
            'title': '$lineItems.title',
            'price': '$lineItems.price'
          },
          'count':
          {
            $sum: 1
          }
        }
      },
      {
        $sort:
        {
          '_id.title': 1
        }
      }
    ], function(err, purchaseGraph)
    {
      if (err)
      {
        console.log(err);
        const findPurchasesByServiceGraphMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
        res.status(500).send(findPurchasesByServiceGraphMongodbErrorResponse.toObject());
      }
      else
      {
        console.log(purchaseGraph);
        const findPurchasesByServiceGraphResponse = new BaseResponse('200', 'Purchases found successfully', purchaseGraph);
        res.json(findPurchasesByServiceGraphResponse.toObject());
      }
    })
  }
  catch (e)
  {
    console.log(e);
    const findPurchaesByServiceCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
    res.status(500).send(findPurchaesByServiceCatchErrorResponse.toObject());
  }
});

module.exports = router;

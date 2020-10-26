/*
=============================================================
 Title: base-response.js
 Author: Professor Krasso
 Date:   22 October 2020
 Modifiers: Nicole Forke, Janet Blohn, Verlee Washington, Joann Saeou
 Description: BCRS Capstone project
 Sends the data needed on a good response back to the requestor
=============================================================
Added to project 10/22/2020 by Janet Blohn
*/

class BaseResponse {
    constructor(httpCode, message, data) { // initializing data fields
  
      this.httpCode = httpCode;
      this.message = message;
      this.data = data;
    }
  
    toObject() {
  
      return {
        // Return it with and include the timestamp
        'httpCode': this.httpCode,
        'message': this.message,
        'data': this.data,
        'timestamp': new Date().toLocaleDateString()
      }
    }
  }
  module.exports = BaseResponse;
  
  
  
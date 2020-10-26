/*
=============================================================
 Title: error-response.js
 Author: Professor Krasso
 Date:   22 October 2020
 Modifiers: Nicole Forke, Janet Blohn, Verlee Washington, Joann Saeou
 Description: BCRS project
 Sends the error data back to the requestor should an error occur in processing
=============================================================
Added to project 10/22/2020 by Janet Blohn
*/

class ErrorResponse {// we are differentiating between the two errors
    constructor(httpCode, message, data) {
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
  module.exports = ErrorResponse; // because we want to access this from another file
  
  
/**
 * ======================================================================
 * Title: Bob's Computer Repair Shop Capstone
 * Author: Nicole Forke, Janet Blohn, and Joann Saeou
 * Date: 11/07/2020
 * Modified by: Nicole Forke
 * Description: Invoice Summary Dialog Component
 * ======================================================================
 */

 /**
  * Import statements
  */
 import { Component, OnInit, Inject } from '@angular/core';
 import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
 import { Invoice } from '../../shared/invoice.interface';

 @Component({
   selector: 'app-invoice-summary-dialog',
   templateUrl: './invoice-summary-dialog.component.html',
   styleUrls: ['./invoice-summary-dialog.component.css']
 })

 /**
  * Export component
  */
 export class InvoiceSummaryDialogComponent implements OnInit {

   invoice: Invoice;

   constructor(private dialogRef: MatDialogRef<InvoiceSummaryDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {

     this.invoice = data.invoice;
    }

   ngOnInit(): void {
   }

 }

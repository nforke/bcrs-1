/**
 * ======================================================================
 * Title: Bob's Computer Repair Shop Capstone
 * Author: Nicole Forke, Janet Blohn, and Joann Saeou
 * Date: 11/07/2020
 * Modified by: Nicole Forke
 * Description: Repair Services Component
 * ======================================================================
 */

 /**
  * Import statements
  */
 import { Component, OnInit } from '@angular/core';
 import { ServiceRepairItem } from './../../shared/service-repair-item.interface';
 import { InvoiceSummaryDialogComponent } from './../../dialog/invoice-summary-dialog/invoice-summary-dialog.component';
 import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
 import { Router } from '@angular/router';
 import { MatDialog } from '@angular/material/dialog';
 import { CookieService } from 'ngx-cookie-service';
 import { HttpClient } from '@angular/common/http';
 import { ServiceRepairService } from '../../shared/service-repair.service';
 import { LineItem } from '../../shared/line-item.interface';
 import { Invoice } from '../../shared/invoice.interface';
 import { InvoiceService } from '../../shared/invoice.service';
 
 
 @Component({
   selector: 'app-repair-services',
   templateUrl: './repair-services.component.html',
   styleUrls: ['./repair-services.component.css']
 })
 
 /**
  * Export component
  */
 export class RepairServicesComponent {
 
 
 
   // create form
   form: FormGroup;
   userName: string;
   services: ServiceRepairItem[];
   lineItems: LineItem[];
   parts = new FormControl;
   labor = new FormControl;
 
 
   number = '' // disabled the submit button added by joann so nicole can take a look at it
 
 
   constructor(private http: HttpClient, private cookieService: CookieService, private fb: FormBuilder, private dialog: MatDialog,
               private router: Router, private serviceRepairService: ServiceRepairService, private invoiceService: InvoiceService) {
 
     // get the username
     this.userName = this.cookieService.get('sessionUser');
 
     this.services = this.serviceRepairService.getServiceRepairItems();
   }
 
 
   ngOnInit(): void {
     this.form = this.fb.group({
       parts: [0, Validators.compose([Validators.required])],
       labor: [0, Validators.compose([Validators.required])]
 
     });
   }
 
   // function to return error message for parts added by: Nicole Forke
   getPartsErrorMessage() {
     if (this.parts.hasError('required')) {
       return 'Parts fee rquired';
     }
   };
 
   getLaborErrorMessage() {
     if (this.labor.hasError('required')) {
       return 'Labor fee required';
     }
   };
 
 
 
   // submit the form
   submit(form) {
     console.log(form);
     const selectedServiceIds = [];
     for (const [key, value] of Object.entries(form.checkGroup)) {
       if (value) {
         selectedServiceIds.push({
           id: key
         });
       }
     }
 
     this.lineItems = [];
 
     /**
      * Build the invoice object
      */
     for (const savedService of this.services) {
       for (const selectedService of selectedServiceIds) {
         if (savedService.id === selectedService.id) {
           this.lineItems.push({
             title: savedService.title,
             price: savedService.price
           });
         }
       }
     }
 
     console.log(this.lineItems);
 
     // calculate the selected services
     const partsAmount = parseFloat(form.parts);
     const laborAmount = form.labor * 50;
     const lineItemTotal = this.lineItems.reduce((prev, cur) => prev + cur.price, 0);
     const total = partsAmount + laborAmount + lineItemTotal;
 
     // create invoice
     const invoice = {
       userName: this.userName,
       lineItems: this.lineItems,
       partsAmount: partsAmount,
       laborAmount: laborAmount,
       lineItemTotal: lineItemTotal,
       total: total,
       orderDate: new Date()
     } as Invoice;
 
     console.log(invoice);
 
     // create invoice summary dialog
     const dialogRef = this.dialog.open(InvoiceSummaryDialogComponent, {
       data: {
         invoice: invoice
       },
       disableClose: true,
       width: '800px'
     });
 
     dialogRef.afterClosed().subscribe(result => {
       if (result === 'confirm') {
         console.log('Invoice saved');
 
         this.invoiceService.createInvoice(invoice.userName, invoice).subscribe(res => {
           this.router.navigate(['/']);
         }, err => {
           console.log(err);
         })
       }
     });
   }
 
   /**
  * cancel the navigation link
  */
   cancel() {
     this.router.navigate(['/']);
   }
 }
 
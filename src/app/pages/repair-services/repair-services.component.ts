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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { ServiceRepairService } from '../../shared/service-repair.service';
import { LineItem } from '../../shared/line-item.interface';
import { Invoice } from '../../shared/invoice.interface';
import { InvoiceService } from '../../shared/invoice.service';
import { ValidationErrors, AbstractControl } from '@angular/forms';


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



// name must match with the ngModel and placeholder
number = ''; // disabled the submit button added by joann so nicole can take a look at it


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



  // sumit the form
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



    interface ValidatorFn {
      (control: AbstractControl): ValidationErrors | null
  }

  type ValidationErrors = {
    [key: string]: any;
};

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

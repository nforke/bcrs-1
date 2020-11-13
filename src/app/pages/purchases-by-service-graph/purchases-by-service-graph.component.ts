/**
 * ======================================================================
 * Title: purchases-by-service-graph.component.ts
 * Author: Nicole Forke, Janet Blohn and Joann Saeou
 * Date: 11/06/2020
 * Modified by: Joann Saeou
 * Description: Group 1 - BCRS - a graph showing the total # of purchases
 * ======================================================================
 */

import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../shared/invoice.service';    //Added 11/06/20 Janet

@Component({
  selector: 'app-purchases-by-service-graph',
  templateUrl: './purchases-by-service-graph.component.html',
  styleUrls: ['./purchases-by-service-graph.component.css']
})
export class PurchasesByServiceGraphComponent implements OnInit {
  purchases: any;
  data: any;
  itemCount = []; //Change from itemCount: to itemCount = 11/06/20 Janet
  labels = [];

  constructor(private invoiceService: InvoiceService) {
    // call the purchases-graph API

    this.invoiceService.findPurchasesByServiceGraph().subscribe(res => {
      // map the response data to the purchases variable
      this.purchases = res['data'];

      // loop over the purchases to split out the services and the item count
      for (const item of this.purchases) {
        this.labels.push(item._id.title);
        this.itemCount.push(item.count);
      }

      // build the object literal for the primeNG bar graph
      this.data = {
        labels: this.labels, // label for services
        datasets: [
          // graph object
          {
            backgroundColor: [
              '#ED0A3F',
              '#FF8833',
              '#5FA777',
              '#0066CC',
              '#6B3FA0',
              '#AF593E',
              '#6CDAE7',
              '#6DDE44'
            ],
            hoverBackgroundColor: [
              '#ED0A3F',
              '#FF8833',
              '#5FA777',
              '#0066CC',
              '#6B3FA0',
              '#AF593E',
              '#6CDAE7',
              '#6DDE44'
            ],
            data: this.itemCount
          },
        ]
      };

      // verify the data objects structure matches PrimeNG's expected format
      console.log('Data object');
      console.log('this.data');
    });
  }

  ngOnInit() {
  }
}

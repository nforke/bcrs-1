/**
 * ======================================================================
 * Title: service-repair.service.ts
 * Author: Nicole Forke, Janet Blohn and Joann Saeou
 * Date: 11/06/2020
 * Modified by: Joann Saeou
 * Description: Group 1 - BCRS - service showing repair service
 * ======================================================================
 */



import { ServiceRepairItem } from './service-repair-item.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceRepairService {

  ServiceRepairItems: ServiceRepairItem[];

  constructor() {
    this.ServiceRepairItems = [

      {
        id: '101',
        title: 'Password Reset',
        price: 39.99
      },
      {
        id: '102',
        title: 'Spyware Removal',
        price: 99.9
      },
      {
        id: '103',
        title: 'RAM upgrade',
        price: 129.99
      },
      {
        id: '104',
        title: 'Software Installation',
        price: 49.99
      },
      {
        id: '105',
        title: 'PC Tune-up',
        price: 89.99
      },
      {
        id: '106',
        title: 'Keyboard Cleaning',
        price: 45.00
      },
      {
        id: '107',
        title: 'Disk Clean-Up',
        price: 149.99
      }

    ]
  }


  getServiceRepairItem(): ServiceRepairItem[] {
    return this.ServiceRepairItems;
  }
}

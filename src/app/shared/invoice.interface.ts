/**
 * ======================================================================
 * Title: service-repair.service.ts
 * Author: Nicole Forke, Janet Blohn and Joann Saeou
 * Date: 11/06/2020
 * Modified by: Joann Saeou
 * Description: Group 1 - BCRS - service showing repair service
 * ======================================================================
 */


 /* Import required application files */
import { LineItem } from '../shared/line-item.interface';

export interface Invoice {
  userName: string;
  lineItems: LineItem[];
  partsAmount: number;
  laborAmount: number;
  lineItemTotal: number;
  total: number;
  orderDate: Date;

}

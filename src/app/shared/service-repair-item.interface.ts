/**
 * ======================================================================
 * Title: service-repair.service.ts
 * Author: Nicole Forke, Janet Blohn and Joann Saeou
 * Date: 11/06/2020
 * Modified by: Joann Saeou
 * Description: Group 1 - BCRS - service showing repair service
 * ======================================================================
 */



export interface ServiceRepairItem {
  id: string;
  title: string;
  price: number;     // number is either double or float in MongoDb Atlas
}

/**
 * =====================================================================
 * Title: Bobs Computer Repair Shop Capstone
 * Author: Nicole Forke, Janet Blohn, Joann Saeou, and Verlee Washington
 * Date: 10/24/2020
 * Description: User interface
 * ======================================================================
 */

/**
 * Export Interface
 */
export interface User {
    _id: string;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    email: string;
    role: string; //Added 11/6/20 Janet
}

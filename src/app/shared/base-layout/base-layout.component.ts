/**
 * ======================================================================
 * Title: Bob's Computer Repair Shop Capstone
 * Author: Nicole Forke, Janet Blohn, Verlee Washington, and Joann Saeou
 * Date: 10/25/2020
 * Description: Base Layout Component
 * ======================================================================
 */

 /**
  * Import statements
  */
 import { Component, OnInit } from '@angular/core';
 import { Router } from '@angular/router';
 import { CookieService } from 'ngx-cookie-service';
 
 @Component({
   selector: 'app-base-layout',
   templateUrl: './base-layout.component.html',
   styleUrls: ['./base-layout.component.css']
 })
 
 /**
  * Export component
  */
 export class BaseLayoutComponent implements OnInit {
 
   year: number = Date.now();
   constructor(private cookieService: CookieService, private router: Router) {
 
    }
 
   ngOnInit(): void {
   }
 
   signOut() {
     this.cookieService.deleteAll();
     this.router.navigate(['/pages/signin']);
   }
 
 }
 
/**
 * ======================================================================
 * Title: Bob's Computer Repair Shop Capstone
 * Author: Nicole Forke, Janet Blohn, and Joann Saeou
 * Date: 10/25/2020
 * Description: Base Layout Component
 * Added logOut method 10/27 Janet
 * ======================================================================
 */

 /**
  * Import statements
  */
 import { Component, OnInit, ElementRef } from '@angular/core';
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
   constructor(private cookieService: CookieService, private router: Router, private elementRef: ElementRef) {
     // Clear cookies if the user hits the "X" on their browser instead of logging out
     window.onbeforeunload = function() {
       console.log(this.sessionUser);
       cookieService.deleteAll('sessionUser')
     };

    }

   ngOnInit(): void {
   }

   // Delete cookies on sign out and return to the home screen
   logOut() {
     this.cookieService.deleteAll();
     //this.router.navigate(['/pages/signin']);
     this.router.navigate(['/']);
   }

 }

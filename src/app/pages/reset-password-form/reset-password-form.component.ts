/*
============================================
; Title:  reset-password-form.component.ts
; Authors: Nicole Forke, Janet Blohn, and Joann Saeou
; Date:   29 October 2020
; Added By: Nicole Forke
; Description: Bob's Computer Repair Services Project
; Typescript for Reset Password Form Component
============================================
*/

/**
 * Import statements
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.css']
})
/**
 * Export component
 */
export class ResetPasswordFormComponent implements OnInit {

  isAuthenticated: string;
  userName: string;
  form: FormGroup;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private cookieService: CookieService) {
    this.isAuthenticated = this.route.snapshot.queryParamMap.get('isAuthenticated');
    this.userName = this.route.snapshot.queryParamMap.get('userName');
   }

  ngOnInit() {
    this.form = this.fb.group({
      password: [null, Validators.compose([Validators.required])]
    });
  }

/**
 * Function to reset password
 */
  resetPassword() {
    this.http.post('/api/session/users/' + this.userName + '/password', {

      password: this.form.controls['password'].value
    }).subscribe(res => {
      /**
       * User is authenticated and we can grant them access
       */
      this.cookieService.set('sessionUser', this.userName, 1);
      this.router.navigate(['/repair-service']);
    }, err => {
      console.log(err);
    });
  }
}

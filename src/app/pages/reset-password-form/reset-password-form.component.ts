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
  username: string;
  form: FormGroup;
  errorMessage: string;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private cookieService: CookieService) {
    this.isAuthenticated = this.route.snapshot.queryParamMap.get('isAuthenticated');
    this.username = this.route.snapshot.queryParamMap.get('userName');

    if (!this.isAuthenticated) {
      this.router.navigate(['/session/signin']);
    }
   }

  ngOnInit() {
    this.form = this.fb.group({

      // the password field must contain minimun of 7 characters long and atleast 1 uppercase, 1 number, and 1 symbol for validation to work
      password: [null, Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d$@$!%*?&].{8,}')
      ])]
    });
  }

/**
 * Function to reset password
 */
  resetPassword() {
    this.http.post('/api/session/users/' + this.username + '/password', {

      password: this.form.controls['password'].value
    }).subscribe(res => {
      if (res) {
      /**
       * User is authenticated and we can grant them access
       */
      this.cookieService.set('sessionUser', this.username, 1);
      this.router.navigate(['/repair-services']);
      } else {
        this.errorMessage = 'Password must contain at least one uppercase letter, one number, and be 8 characters long.';
      }
    }, err => {
      console.log('error message', err);
    });
  }
}

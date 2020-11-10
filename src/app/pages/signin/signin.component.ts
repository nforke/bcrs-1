/**
 * ======================================================================
 * Title: Bob's Computer Repair Shop Capstone
 * Author: Nicole Forke, Janet Blohn, Verlee Washington, and Joann Saeou
 * Date: 10/25/2020
 * Modified by: Nicole Forke
 * Description: Signin Component
 * ======================================================================
 */
/**
 * Import statements
 */
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

/**
 * Export component
 */
export class SigninComponent implements OnInit {

  form: FormGroup;
  errorMessage: string;

  constructor(private router: Router, private cookieService: CookieService, private fb: FormBuilder, private http: HttpClient) {

   }

  ngOnInit() {
    this.form = this.fb.group({
      userName: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+$')])]
    });
  }

  // tslint:disable-next-line: typedef
  signin() {
    const userName = this.form.controls.userName.value;
    const password = this.form.controls.password.value;

    this.http.post('/api/session/signin', {
      userName,
      password
    }).subscribe(res => {

      console.log(res['data']);

      if (res['data'].userName) {
        /**
         * User is authenticated and we can grant them access
         */
        if (res['data'].role.role === 'standard') {
        this.cookieService.set('sessionUser', res['data'].userName, 1);
        this.router.navigate(['/repair-services']);
        } else {
          if (res['data'].role.role === 'admin') {
        this.cookieService.set('sessionUser', res['data'].userName, 1);
        this.router.navigate(['admin/site-maintenance']);
        }
        }

      }
    }, err => {
      console.log(err);
      this.errorMessage = err.error.message;
    });
  }
}

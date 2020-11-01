/**
 * =====================================================================
 * Title: register.component
 * Author: Nicole Forke, Janet Blohn, and Joann Saeou
 * Date: 10/30/2020
 * Modified by: Joann Saeou
 * Description: Group 1 - Sprint 2 (BCRS) Register form
 * =====================================================================
 */


import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { SecurityQuestion } from '../../shared/security-question.interface';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  securityQuestions: SecurityQuestion[];  // must be used with security question interface and [NOT] the security question  service
  form: FormGroup;
  registrationForm: FormGroup;
  errorMessage: string;




  firstName = '';  // function for the disabled next button for contact information
  answer3 = '';   // function for the disabled next button for security question



  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder, private cookieService: CookieService) {
    this.http.get('/api/securityQuestions').subscribe(res => {
      // tslint:disable-next-line: no-string-literal
      this.securityQuestions = res['data'];
    }, err => {

        console.log(err);

    });
  }




  ngOnInit(): void {
    this.registrationForm = new FormGroup({

      //  contact information form
      contactInformation: new FormGroup({
        firstName: new FormControl(null, Validators.required),
        lastName: new FormControl(null, Validators.required),
        phoneNumber: new FormControl(null, Validators.required),
        address: new FormControl(null, Validators.required),
        email: new FormControl(null, Validators.required)

      }),

      //  security questions form
      securityQuestions: new FormGroup({
        securityQuestion1: new FormControl(null, Validators.required),
        securityQuestion2: new FormControl(null, Validators.required),
        securityQuestion3: new FormControl(null, Validators.required),
        answerToSecurityQuestion1: new FormControl(null, Validators.required),
        answerToSecurityQuestion2: new FormControl(null, Validators.required),
        answerToSecurityQuestion3: new FormControl(null, Validators.required)


      }),

            // credentials form

      credentials: new FormGroup({
        userName: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required)
      })
    });
  }


  // tslint:disable-next-line:typedef
  register(form) {
  const contactInformation = form.contactInformation;
  const securityQuestions = form.securityQuestions;
  const credentials = form.credentials;



// this form will let the user select the specific question
  const selectedSecurityQuestions = [
  {
    questionText: securityQuestions.securityQuestion1,
    answerText: securityQuestions.answerToSecurityQuestion1
  },
  {
    questionText: securityQuestions.securityQuestion2,
    answerText: securityQuestions.answerToSecurityQuestion2
  },
  {
    questionText: securityQuestions.securityQuestion3,
    answerText: securityQuestions.answerToSecurityQuestion3
  }
];

  console.log(selectedSecurityQuestions);

  this.http.post('/api/session/register', {
    userName: credentials.userName,
    password: credentials.password,
    firstName: contactInformation.firstName,
    lastName: contactInformation.lastName,
    phoneNumber: contactInformation.phoneNumber,
    address: contactInformation.address,
    email: contactInformation.email,
    // tslint:disable-next-line: object-literal-shorthand
    selectedSecurityQuestions: selectedSecurityQuestions


}).subscribe(res => {
  // tslint:disable-next-line: no-string-literal
  if (res['data']) {

     /**
      * User is authenticated and we can grant them access
      * TODO: the error is on line 130 the lowercase U on sessionuser
      *
      */

    this.cookieService.set('sessionUser', credentials.userName);
    this.router.navigate(['/']);
  } else {


    /**
     *  User is  NOT authenticated and we should return the error message
     *
     */
    // tslint:disable-next-line: no-string-literal
    this.errorMessage = res['text'];
  }

  }, err => {

  console.log(err);
  this.errorMessage = err;

    });
  }
}

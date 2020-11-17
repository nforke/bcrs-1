/*
============================================
; Title:  about.component.ts
; Authors: Nicole Forke, Janet Blohn, and Joann Saeou
; Date:   14 November 2020
; Added By: Nicole Forke
; Description: Bob's Computer Repair Services Project
; Typescript for Verify Username Form Component
============================================
*/

/**
 * Import statements
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-username-form',
  templateUrl: './verify-username-form.component.html',
  styleUrls: ['./verify-username-form.component.css']
})

/**
 * Export component
 */
export class VerifyUsernameFormComponent implements OnInit {

  form: FormGroup;
  errorMessage: string; // added by Nicole Forke

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) {
   }

  ngOnInit() {
    this.form = this.fb.group({
      userName: [null, Validators.compose([Validators.required])]
    });
  }

  /**
   * Function to validate userName
   */
  validateUsername() {
    const userName = this.form.controls['userName'].value;

    this.http.get('/api/session/verify/users/' + userName).subscribe(res => {
      if (res['data']) {

        this.router.navigate(['/session/verify-security-questions'], {queryParams: {userName: userName}, skipLocationChange: true});
      } else {
        this.errorMessage = "The username entered does not match our records. Please try again."; // added by Nicole Forke
      }
    }, err => {
      console.log(err);
      this.errorMessage = err; // added by Nicole Forke
    });
  }
}

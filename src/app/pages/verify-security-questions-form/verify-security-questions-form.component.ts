
/*
============================================
; Title:  verify-security-questions-form.component.ts
; Authors: Nicole Forke, Janet Blohn, and Joann Saeou
; Date:   30 October 2020
; Added By: Janet Blohn
; Description: Bob's Computer Repair Services Project
; Typescript for VerifySecurityQuestionsForm Component
============================================
*/

/* Import required modules from Angular */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verify-security-questions-form',
  templateUrl: './verify-security-questions-form.component.html',
  styleUrls: ['./verify-security-questions-form.component.css']
})
export class VerifySecurityQuestionsFormComponent implements OnInit {
  selectedSecurityQuestions: any;
  question1: string;
  question2: string;
  question3: string;
  userName: string;
  form: FormGroup;

  constructor(private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder, private router: Router) {
    this.userName = this.route.snapshot.queryParamMap.get('userName');
    console.log(this.userName);

    this.http.get('/api/users/' + this.userName + '/securityQuestions').subscribe(res => {
      this.selectedSecurityQuestions = res['data'];
      console.log(this.selectedSecurityQuestions);
      console.log(res);
    }, err => {
      console.log(err);
    }, () => {
      this.question1 = this.selectedSecurityQuestions[0].questionText;
      this.question2 = this.selectedSecurityQuestions[1].questionText;
      this.question3 = this.selectedSecurityQuestions[2].questionText;

      console.log(this.question1);
      console.log(this.question2);
      console.log(this.question3);
    });
   }

  ngOnInit() {

    this.form = this.fb.group({
      answerToSecurityQuestion1: [null, Validators.compose([Validators.required])],
      answerToSecurityQuestion2: [null, Validators.compose([Validators.required])],
      answerToSecurityQuestion3: [null, Validators.compose([Validators.required])]
    });
  }

  verifySecurityQuestions() {
    const answerToSecurityQuestion1 = this.form.controls['answerTosSecurityQuestion1'];
    const answerToSecurityQuestion2 = this.form.controls['answerTosSecurityQuestion2'];
    const answerToSecurityQuestion3 = this.form.controls['answerTosSecurityQuestion3'];

    console.log(answerToSecurityQuestion1);
    console.log(answerToSecurityQuestion2);
    console.log(answerToSecurityQuestion3);

    this.http.post('/api/session/verify/users/' + this.userName + '/securityQuestions', {
      questionText1: this.question1,
      questionText2: this.question2,
      questionText3: this.question3,

      answerText1: answerToSecurityQuestion1,
      answerText2: answerToSecurityQuestion2,
      answerText3: answerToSecurityQuestion3
      }).subscribe(res => {
        console.log(res);
        if (res['message'] === 'success') {
          this.router.navigate(['/session/reset0password'], {queryParams: {isAuthenticated: 'true', userName: this.userName}, skipLocationChange: true});
        } else {
          console.log('Unable to verify security question answers');
        }
      });
  }
}

 /*
 * Title: security-question-create.component.ts
 * Author: Verlee Washington, Nicole Forke, Janet Blohn, and Joann Saeou
 * Date: 10/25/2020
 * modified By: Joann Saeou
 * Description: this is the typescript file  for security question create configuration page CRUD operation
 */

import { SecurityQuestionService } from './../../shared/security-question.service';
import { SecurityQuestion } from './../../shared/security-question.interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-security-question-create',
  templateUrl: './security-question-create.component.html',
  styleUrls: ['./security-question-create.component.css']
})
export class SecurityQuestionCreateComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private securityQuestionService: SecurityQuestionService) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])],
    });
  }

  // tslint:disable-next-line: typedef
  create() {
    const newSecurityQuestion = {} as SecurityQuestion;
    newSecurityQuestion.text = this.form.controls.text.value;

    this.securityQuestionService.createSecurityQuestion(newSecurityQuestion).subscribe(res => {
      this.router.navigate(['admin/security-questions']);
    }, err => {
      console.log(err);
    });
  }

  cancel() {
    this.router.navigate(['admin/site-maintenance']);
  }

}


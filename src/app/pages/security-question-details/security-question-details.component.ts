/*
============================================
; Title:  delete-record-dialog.components.ts
 * Modifiers: Nicole Forke, Janet Blohn, Joann Saeou
 * Date: 10/26/2020
 * Description: Bobs Computer Repair Services
 * TypeScript for the UserDetails Component
 ============================================
 * Added to project 10/27/20 by Janet Blohn
 */

 /* Import required modules from Angular */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

// Import required application modules and components
import { SecurityQuestionService } from './../../shared/security-question.service';
import { SecurityQuestion } from './../../shared/security-question.interface';

@Component({
  selector: 'app-security-question-details',
  templateUrl: './security-question-details.component.html',
  styleUrls: ['./security-question-details.component.css']
})
export class SecurityQuestionDetailsComponent implements OnInit {
  question: any;
  questionId: string;
  form: FormGroup;

  constructor(private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder, private router: Router, private securityQuestionService: SecurityQuestionService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])],
    });
  }

  saveQuestion() {
    const updatedSecurityQuestion = {} as SecurityQuestion;
    updatedSecurityQuestion.text = this.form.controls.text.value;

    this.securityQuestionService.updateSecurityQuestion(this.questionId, updatedSecurityQuestion).subscribe(res => {
      this.router.navigate(['/security-questions'])
    })
  }

  cancel() {
    this.router.navigate(['/security-questions']);
  }
}

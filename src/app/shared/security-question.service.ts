/**
 * =====================================================================
 * Title: Bobs Computer Repair Shop Capstone
 * Author: Nicole Forke, Janet Blohn, Joann Saeou, and Verlee Washington
 * Date: 10/24/2020
 * Description: Security question service
 * ======================================================================
 */

 /**
  * Import statements
  */
 import { SecurityQuestion } from './security-question.interface';
 import { Injectable } from '@angular/core';
 import { HttpClient } from '@angular/common/http';
 import { Observable } from 'rxjs';

 @Injectable({
   providedIn: 'root'
 })

 /**
  * Export service
  */
 export class SecurityQuestionService {

  constructor(private http: HttpClient) { }

  findAllSecurityQuestions(): Observable<any> {
    return this.http.get('/api/securityQuestions');
  }

  findSecurityQuestionById(questionId: string): Observable<any> {
    return this.http.get('/api/securityQuestions/' + questionId);
  }

  createSecurityQuestion(newSecurityQuestion: SecurityQuestion): Observable<any> {
    return this.http.post('/api/securityQuestions', {
      text: newSecurityQuestion.text
    })
  }

  updateSecurityQuestion(questionId: string, updatedSecurityQuestion: SecurityQuestion): Observable<any> {
    return this.http.put('/api/securityQuestions/' + questionId, {
      text: updatedSecurityQuestion.text
    })
  }

  deleteSecurityQuestion(questionId: string): Observable<any> {
    return this.http.delete('/api/securityQuestions/' + questionId);
  }
 }

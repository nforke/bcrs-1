/**
 * =====================================================================
 * Title: Bobs Computer Repair Shop
 * Author: Nicole Forke, Janet Blohn, Verlee Washington, and Joann Saeou
 * Date: 10/22/2020
 * Modified by: Nicole Forke
 * Description: Security question model
 * =====================================================================
 */

/**
 * Import Statements
 */
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { SecurityQuestionService } from './../../shared/security-question.service';
import { SecurityQuestion } from './../../shared/security-question.interface';
import { DeleteRecordDialogComponent } from './../../shared/security-question.interface';

@Component({
  selector: 'app-security-question-list',
  templateUrl: './security-question-list.component.html',
  styleUrls: ['./security-question-list.component.css']
})

/**
 * Export Component
 */
export class SecurityQuestionListComponent implements OnInit {

  securityQuestions: SecurityQuestion [];
  displayedColumns = [ 'question', 'functions'];

  constructor(private http: HttpClient, private dialog: MatDialog, private SecurityQuestionService: SecurityQuestionService) {
    this.SecurityQuestionService.findAllSecurityQuestions().subscribe(res => {
      this.securityQuestions = res['data'];
    }, err => {
      console.log(err);
    })
   }

  ngOnInit(): void {
  }

}

delete(recordId) {
  const dialogRef = this.dialog.open(DeleteRecordDialogComponent, {
    data: {
      recordId,
      dialogHeader: 'Delete Record Dialog',
      dialogBody: 'Are you sure you want to delete security question ${recordId}?'
    },
    disableClose: true,
    width: '800px'
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 'confirm') {
      this.securityQuestionService.deleteSecurityQuestion(recordId).subscribe(res => {
        console.log('Security question deleted');
        this.securityQuestions = this.securityQuestions.filter(q => q._id !== recordId);
      })
    }
  });
}
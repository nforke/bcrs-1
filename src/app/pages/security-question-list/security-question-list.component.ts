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
import { DeleteRecordDialogComponent } from './../../shared/delete-record-dialog/delete-record-dialog.component';

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

  constructor(private http: HttpClient, private dialog: MatDialog, private securityQuestionService: SecurityQuestionService) {
    this.securityQuestionService.findAllSecurityQuestions().subscribe(res => {
      this.securityQuestions = res['data'];
    }, err => {
      console.log(err);
    });
   }

  ngOnInit() {
  }

  delete(recordId: string, securityQuestionText: string) {
    const dialogRef = this.dialog.open(DeleteRecordDialogComponent, {
      data: {
        recordId,
        dialogHeader: "Are you sure you want to delete security question:",
        dialogBody: `${securityQuestionText}`
      },
      disableClose: true,
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.securityQuestionService.deleteSecurityQuestion(recordId).subscribe(res => {
          console.log('Security question deleted');
          this.securityQuestions = this.securityQuestions.filter(q => q._id !== recordId);
       });
      }
    });
  }
}

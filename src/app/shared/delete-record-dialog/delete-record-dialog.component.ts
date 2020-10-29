/*
============================================
; Title:  delete-record-dialog.components.ts
 * Modifiers: Nicole Forke, Janet Blohn, Joann Saeou
 * Date: 10/26/2020
 * Description: Bobs Computer Repair Services
 * TypeScript for the UserDetails Component
 ============================================
 * Added to project 10/26/20 by Janet Blohn
 * Janet 10/27/20 Deleted import comment for application modules
 */

 /* Import required modules from Angular */
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-record-dialog',
  templateUrl: './delete-record-dialog.component.html',
  styleUrls: ['./delete-record-dialog.component.css']
})
export class DeleteRecordDialogComponent implements OnInit {
  recordId: string;
  dialogHeader: string;
  dialogBody: string;

  constructor(private dialogRef: MatDialogRef<DeleteRecordDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.recordId = data.recordId;
    this.dialogHeader = data.dialogHeader;
    this.dialogBody = data.dialogBody;
  }

  ngOnInit() {
  }
}

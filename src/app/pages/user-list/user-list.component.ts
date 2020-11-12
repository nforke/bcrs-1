/**
 * Title: user-list.component.ts
 * Modifiers: Nicole Forke, Janet Blohn, and Joann Saeou
 * Date: 10/28/2020
 * Added By: Janet Blohn
 * Description: TypeScript for the UserList Component for Bob's Computer Repair Service
 */

 /* Import required modules from Angular and 3rd parties*/
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

// Import required application modules and components
import { DeleteRecordDialogComponent } from './../../shared/delete-record-dialog/delete-record-dialog.component';
import { UserService } from './../../shared/user.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any;
  displayedColumns = ['userName', 'firstName', 'lastName', 'phoneNumber', 'address', 'email', 'role', 'functions'];

  constructor(private http: HttpClient, private dialog: MatDialog, private userService: UserService) {
    this.userService.findAllUsers().subscribe(res => {
      this.users = res['data'];
      console.log(this.users);
    }, err => {
      console.log(err);
    });
   }

  ngOnInit(): void {

  }

  delete(recordId: string, nameText: string): void {
    const dialogRef = this.dialog.open(DeleteRecordDialogComponent, {
      data: {
        recordId,
        dialogHeader: "Are you sure you want to delete user:",
        dialogBody: `${nameText}`
      },
      disableClose: true,
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        //this.userService.deleteUser(userName).subscribe(res => {
          this.userService.deleteUser(recordId).subscribe(res => {
          console.log('User deleted');
          this.users = this.users.filter(u => u._id !== recordId);

        });
      }
    });
  }
}

/**
 * Title: role-list.component.ts
 * Modifiers: Nicole Forke, Janet Blohn, and Joann Saeou
 * Date: 11/05/2020
 * Added By: Janet Blohn
 * Description: TypeScript for the RoleList Component for Bob's Computer Repair Service
 */
/* Import required modules from Angular */
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// Import required application modules and components
import { DeleteRecordDialogComponent } from '../../shared/delete-record-dialog/delete-record-dialog.component';
import { Role } from '../../shared/role.interface';
import { RoleService } from '../../shared/role.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {
  roles: Role[];
  displayedColumns = ['role', 'functions'];

  constructor(private dialog: MatDialog, private roleService: RoleService) {
    this.roleService.findAllRoles().subscribe(res => {
      this.roles = res['data'];
    }, err => {
      console.log(err);
    })
  }

  ngOnInit() {
  }

  delete(recordId: string, roleText: string) {
    const dialogRef = this.dialog.open(DeleteRecordDialogComponent, {
      data: {
        recordId,
        dialogHeader: "Are you sure you want to delete role:",
        dialogBody: `${roleText}`
      },
      disableClose: true,
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.roleService.deleteRole(recordId).subscribe(res => {
          console.log('Role deleted')
          this.roles = this.roles.filter(role => role._id !== recordId);
        })
      }
    });
  }
}

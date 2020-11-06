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
import { RoleService } from '../../shared/role.service';
import { Role } from '../../shared/role.interface';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {
  roles: Role[];
  displayedColumns = ['role, functions'];

  constructor(private dialog: MatDialog, private roleService: RoleService) {
    this.roleService.findAllRoles().subscribe(res => {
      this.roles = res['data'];
    }, err => {
      console.log(err);
    });
  }

  ngOnInit() {
  }

  delete(roleId, text) {
    const dialogRef = this.dialog.open(DeleteRecordDialogComponent, {
      data: {
        roleId,
        dialogHeader: 'Delete Record Dialog',
        dialogBody: 'Are you sure you want to delete role: ${text}?'
      },
      disableClose: true,
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.roleService.deleteRole(roleId).subscribe(res => {
          console.log('Role deleted')
          this.roles = this.roles.filter(role => role._id !== roleId);
        })
      }
    });
  }
}


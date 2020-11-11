/**
 * Title: role-details.component.ts
 * Modifiers: Nicole Forke, Janet Blohn, and Joann Saeou
 * Date: 11/05/2020
 * Added By: Janet Blohn
 * Description: TypeScript for the RoleDetails Component for Bob's Computer Repair Service
 */
/* Import required modules from Angular */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Import required application modules and components
import { RoleService } from '../../shared/role.service';
import { Role } from '../../shared/role.interface';

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.css']
})
export class RoleDetailsComponent implements OnInit {
  form: FormGroup;
  role: Role;
  roleId: string;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private roleService: RoleService) {
    this.roleId = this.route.snapshot.paramMap.get('roleId');

    this.roleService.findRoleById(this.roleId).subscribe(res => {
      this.role = res['data'];
    }, err => {
      console.log(err);
    }, () => {
      this.form.controls['text'].setValue(this.role.text);
    })
   }

  ngOnInit() {
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])]
    });
  }

  save() {
    const updatedRole = {
      text: this.form.controls['text'].value
    } as Role;

    this.roleService.updateRole(this.roleId, updatedRole).subscribe(res => {
      this.router.navigate (['admin/roles']);
    }, err => {
      console.log(err);
    })
  }

    // Cancel out and navigate back to the main page for roles
  cancel() {
    this.router.navigate(['admin/roles']);
  }
}

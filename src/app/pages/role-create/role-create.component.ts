/**
 * Title: role-create.component.ts
 * Modifiers: Nicole Forke, Janet Blohn, and Joann Saeou
 * Date: 11/05/2020
 * Added By: Janet Blohn
 * Description: TypeScript for the RoleCreate Component for Bob's Computer Repair Service
 */
/* Import required modules from Angular */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Import required application modules and components
import { RoleService } from '../../shared/role.service';
import { Role } from '../../shared/role.interface';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.css']
})
export class RoleCreateComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private roleService: RoleService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])]
    });
  }

  // Create a new role
  create() {
    const newRole = {
      text: this.form.controls['text'].value
    } as Role

    this.roleService.createRole(newRole).subscribe(res => {
      this.router.navigate(['/admin/roles']);
    }, err => {
      console.log(err);
    })
  }

  // Cancel out and navigate back to the main page for roles
  cancel() {
    this.router.navigate(['/admin/site-maintenance']);
  }
}

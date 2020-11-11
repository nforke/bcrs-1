/*
============================================
; Title:  user-details.components.ts
 * Modifiers: Nicole Forke, Janet Blohn, Verlee Washington, Joann Saeou
 * Date: 10/25/2020
 * Description: Bobs Computer Repair Services
 * TypeScript for the UserDetails Component
 ============================================
 * Added to project 10/27/20 by Janet Blohn
 */

/* Import required modules from Angular */
 import { Component, OnInit } from '@angular/core';
 import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 import { ActivatedRoute, Router } from '@angular/router';

 // Import required application modules and components
 import { UserService } from './../../shared/user.service';
 import { User } from './../../shared/user.interface';
 import { Role } from './../../shared/role.interface'; //Added 11/06/20 Janet
 import { RoleService } from './../../shared/role.service'; //Added 11/06/20 Janet

 @Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: User;
  userId: string;
  userName: string;
  form: FormGroup;
  roles: Role[]; //Added 11/06/20 Janet

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private userService: UserService, private roleService: RoleService) {
    this.userName = this.route.snapshot.paramMap.get('userName');

    this.userService.findUserByUserName(this.userName).subscribe(res => {
      this.user = res['data'];
      console.log(this.user);
    }, err => {
      console.log(err);
    }, () => {
      this.form.controls.firstName.setValue(this.user.firstName);
      this.form.controls.lastName.setValue(this.user.lastName);
      this.form.controls.phoneNumber.setValue(this.user.phoneNumber);
      this.form.controls.address.setValue(this.user.address);
      this.form.controls.email.setValue(this.user.email);
      this.form.controls.role.setValue(this.user.role['role']); //Added 11/06/20 Janet

      this.roleService.findAllRoles().subscribe(res => {
        this.roles = res['data'];
      }, err => {
        console.log(err);
      })
    })
   }

  ngOnInit() {
    this.form = this.fb.group({
      firstName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([Validators.required])],
      phoneNumber: [null, Validators.compose([Validators.required])],
      address: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      role: [null, Validators.compose([Validators.required])]
    });
  }

  saveUser() {
    const updatedUser = {} as User;
    updatedUser.firstName = this.form.controls.firstName.value;
    updatedUser.lastName = this.form.controls.lastName.value;
    updatedUser.phoneNumber = this.form.controls.phoneNumber.value;
    updatedUser.address = this.form.controls.address.value;
    updatedUser.email = this.form.controls.email.value;
    updatedUser.role = this.form.controls.role.value;

    console.log('savedUser object')
    console.log(updatedUser);

    this.userService.updateUser(this.userName, updatedUser).subscribe(res => {
      this.router.navigate(['admin/users']);
    });
  }

  cancel() {
    this.router.navigate(['admin/site-maintenance']);
  }
}

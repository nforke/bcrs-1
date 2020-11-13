/**
 * Title: user-create.component.ts
 * Author:  Nicole Forke, Janet Blohn, and Joann Saeou
 * Date: 10/24/2020
 * modified: Joann Saeou
 * Description: this is the user-create configuration page as known as CRUD operation
 */


import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { User } from '../../shared/user.interface';
import { UserService } from '../../shared/user.service';
import { Role } from '../../shared/role.interface';
import { RoleService } from '../../shared/role.service';


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  user: User;
  userId: string;
  form: FormGroup;
  roles: any;


  constructor(private fb: FormBuilder, private router: Router, private userService: UserService, private roleService: RoleService) { }


  /**
   * Author: Joann Saeou
   * Date: 10/24/2020
   *
   * a function that processes a FormControl or collection of controls and returns an error map or null.
   * A null map means that validation has passed.
   *
   */
  ngOnInit(): void {
    this.form = this.fb.group({
      userName: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
      firstName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([Validators.required])],
      phoneNumber: [null, Validators.compose([Validators.required])],
      address: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      role: [null, Validators.compose([Validators.required])]


    });
  }

/**
 * Create new user instance for data values
 */

  createUser() {
    const newUser = {} as User;
    newUser.userName = this.form.controls.userName.value,
    newUser.password = this.form.controls.password.value,
    newUser.firstName = this.form.controls.firstName.value,
    newUser.lastName = this.form.controls.lastName.value,
    newUser.phoneNumber = this.form.controls.phoneNumber.value,
    newUser.address = this.form.controls.address.value,
    newUser.email = this.form.controls.email.value,

    this.userService.createUser(newUser).subscribe(res =>   {
      this.router.navigate(['/admin/site-maintenance']);
    }, err => {
      console.log(err);
    });
  }

/**
 * cancel the navigation link
 */
 cancel() {
   this.router.navigate(['/admin/site-maintenance']);
  }

}

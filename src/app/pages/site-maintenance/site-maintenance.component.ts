/**
 * Title: user-create.component.ts
 * Author:  Nicole Forke, Janet Blohn, and Joann Saeou
 * Date: 11/08/2020
 * modified: Janet Blohn
 * Description: this is the site maintenance page for admin users only
 */

 /**
  * Import statements
  */
import { Component, OnInit, ViewChildren } from '@angular/core';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { User } from '../../shared/user.interface';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-site-maintenance',
  templateUrl: './site-maintenance.component.html',
  styleUrls: ['./site-maintenance.component.css']
})

/**
 * Export component
 */
export class SiteMaintenanceComponent implements OnInit {

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {

  }
}
//this.userId = users/userId;

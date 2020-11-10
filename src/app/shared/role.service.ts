/*
============================================
; Title: role.service.ts
; Author: Joann Saeou
; Date:   05 November 2020
; Description: BCRS project
; Roles service; finds, defines, updates and deletes roles for Bob's Computer Service
============================================
*/


/* Import required modules from Angular */

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/* Import required application files */
import { Role } from '../shared/role.interface';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  findAllRoles(): Observable<any> {
    return this.http.get('/api/roles');
  }

  findRoleById(roleId: string): Observable<any> {
    return this.http.get('/api/roles/' + roleId);
  }

  createRole(role: Role): Observable<any> {
    return this.http.post('/api/roles', {
      text: role.text
    })
  }

  updateRole(roleId: string, role: Role): Observable<any> {
    return this.http.put('/api/roles/' + roleId, {
      text: role.text
    })
  }

  deleteRole(roleId: string): Observable<any> {
    return this.http.delete('/api/roles/' + roleId);
  }

    findUserRole(userName: string): Observable<any> {
      return this.http.get('/api/users/' + userName + '/role');

    }
  }

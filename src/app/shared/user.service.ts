/**
 * =====================================================================
 * Title: Bobs Computer Repair Shop Capstone
 * Author: Nicole Forke, Janet Blohn, Joann Saeou, and Verlee Washington
 * Date: 10/24/2020
 * Description: User service
 * ======================================================================
 */

/**
 * Import statements
 */
import { Injectable } from '@angular/core';
import { User } from './user.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/**
 * Export Service
 */
export class UserService {
  constructor(private http: HttpClient) { }

  findAllUsers(): Observable<any> {
    return this.http.get('/api/users');
  }

  findUserById(userId: string): Observable<any> {
    return this.http.get('/api/users/' + userId);
  }

  findUserByUserName(userName: string): Observable<any> {
    return this.http.get('/api/users/' + userName);
  }

  createUser(user: User): Observable<any> {
    return this.http.post('/api/users/', {
      userName: user.userName,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      email: user.email,
      role: user.role //Added 11/6/20 Janet
    });
  }

  updateUser(userId: string, user: User): Observable<any> {
    return this.http.put('/api/users/' + userId, {
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      email: user.email,
      role: user.role  // Added 11/10/20 Janet
    });
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete('/api/users/' + userId);
  }
}

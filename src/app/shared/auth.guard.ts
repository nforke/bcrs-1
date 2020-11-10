/*
============================================
; Title:  auth.guard.js
 * Modifiers: Nicole Forke, Janet Blohn, Verlee Washington, Joann Saeou
 * Date: 10/24/2020
 * Description: Bobs Computer Repair Services
 * TypeScript Auth Guard for Sign in
 ============================================
 * Added to project 10/24/20 by Janet Blohn
 */
​
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { RoleService } from './role.service';
import { map } from 'rxjs/operators';
​
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService, private roleService: RoleService) {
​
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const sessionUser = this.cookieService.get('session_user');

    return this.roleService.findUserRole(this.cookieService.get('sessionUser')).pipe(map(res =>
        {
          if (res['data'].role === 'superAdmin' || 'admin')
          {
            return true;
          }
          else
          {
            this.router.navigate(['/']);
            return false;
          }
        }));
      }
    }

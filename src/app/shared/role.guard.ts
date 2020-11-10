
/* ============================================
; Title:  role.guard.ts
 * Modifiers: Nicole Forke, Janet Blohn,  Joann Saeou
 * Date: 11/05/2020
 * Modified by: Joann Saeou
 * Description:  Role guard for roles
 ============================================
 *
 */

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { RoleService } from './role.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router, private http: HttpClient, private cookieService: CookieService, private roleService: RoleService) { }

   canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    return this.roleService.findUserRole(this.cookieService.get('sessionUser')).pipe(map(res =>
      {
        if (res['data'].role === 'superAdmin')
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

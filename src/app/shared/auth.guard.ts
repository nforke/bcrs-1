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
​
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) {
​
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    //state: RouterStateSnapshot) {
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const sessionUser = this.cookieService.get('session_user');
    //const isSessionUser = this.cookieService.get('session_user');
​
    if (sessionUser) {
    //  if (isSessionUser) {
      // If the user is valid, allow sign in
      return true;
    } else {
      // Otherwise stay on the signin page
      this.router.navigate(['/session/signin']);
      return false;
      /*canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = this.cookieService.get('sessionuser');
    if(isAuthenticated){
      return true;
    } else {
    //if no sessionUser is present, then redirect them to the signin page.
    this.router.navigate(['/session/signin']);
    return false; */
    }
  }
}

// ============================================
//  * Title:  error.interceptor.ts
//  * Modifiers:Joann Saeou
//  * Date: 10/29/2020
//  * Description: Error Interceptor
//  *
//  ============================================
//  */
//



import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';




@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(catchError(err => {

      if ([404].indexOf(err.status) !== -1) {
        this.router.navigate(['/session/404']);
      }

      if ([500].indexOf(err.status) !== -1) {
        this.router.navigate(['/session/500']);
      }

      // Otherwise, catch the error and throw
      const error = err.error.message || err.statusText;
      return throwError;

    }));
  }
}

/*
============================================
; Title:  app.module.ts
 * Added to project by Janet Blohn
 * Modifiers: Nicole Forke, Janet Blohn, Verlee Washington, Joann Saeou
 * Date: 10/24/2020
 * Description: Bobs Computer Repair Services
 * TypeScript App Module containing all required application and angular modules
 ============================================
 */
​
 /* Import required modules from Angular */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
​
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';  // added by Joann Saeou
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
<<<<<<< HEAD
import { MatStepperModule } from '@angular/material/stepper'; // added by Joann Saeou
import { MatSelectModule } from '@angular/material/select'; // added by Joann Saeou
import { MatListModule } from '@angular/material/list';  // added by Joann Saeou
import { MatFormFieldModule } from '@angular/material/form-field'; // added by Joann Saeou
import { CookieService } from 'ngx-cookie-service';  // added by Joann Saeou


=======
import { MatListModule } from '@angular/material/list'
>>>>>>> 02e6c37c0f5815af0c91770fe36773bee0816d90
​
// Import required application modules and components
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { SecurityQuestionCreateComponent } from './pages/security-question-create/security-question-create.component';
import { SecurityQuestionListComponent } from './pages/security-question-list/security-question-list.component';
import { UserCreateComponent } from './pages/user-create/user-create.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { SigninComponent } from './pages/signin/signin.component';
import { DeleteRecordDialogComponent } from './shared/delete-record-dialog/delete-record-dialog.component'; // Added 10/27 Janet
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { SecurityQuestionDetailsComponent } from './pages/security-question-details/security-question-details.component';
import { AboutComponent } from './pages/about/about.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ResetPasswordFormComponent } from './pages/reset-password-form/reset-password-form.component'; // Added 10/27 Janet
import { ErrorInterceptor } from './shared/error.interceptor';  // added by Joann Saeou
import { ErrorComponent } from './pages/error/error.component'; // added by Joann Saeou
<<<<<<< HEAD
import { RegisterComponent } from './pages/register/register.component';   // added by Joann Saeou




=======
import { VerifySecurityQuestionsFormComponent } from './pages/verify-security-questions-form/verify-security-questions-form.component';   // added 10/30 Janet
>>>>>>> 02e6c37c0f5815af0c91770fe36773bee0816d90
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BaseLayoutComponent,
    AuthLayoutComponent,
    DeleteRecordDialogComponent,
    SecurityQuestionCreateComponent,
    SecurityQuestionDetailsComponent,
    SecurityQuestionListComponent,
    UserCreateComponent,
    UserDetailsComponent,
    UserListComponent,
    SigninComponent,
    AboutComponent,
    OrdersComponent,
    ResetPasswordFormComponent,
    ErrorComponent,
<<<<<<< HEAD
    RegisterComponent
=======
    VerifySecurityQuestionsFormComponent
>>>>>>> 02e6c37c0f5815af0c91770fe36773bee0816d90


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule,
<<<<<<< HEAD
    MatStepperModule,
    MatSelectModule,
    MatListModule,
    MatFormFieldModule
=======
    MatListModule
>>>>>>> 02e6c37c0f5815af0c91770fe36773bee0816d90
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true   // added by Joann Saeou
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

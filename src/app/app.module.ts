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
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
​
// Import required application modules and components
import { HomeComponent } from './pages/home/home.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { SecurityQuestionCreateComponent } from './pages/security-question-create/security-question-create.component';
//import { SecurityQuestionDetailsComponent } from './pages/security-question-details/security-question-details.component';
import { SecurityQuestionListComponent } from './pages/security-question-list/security-question-list.component';
//import { SigninComponent } from './pages/signin/signin.component';
import { UserCreateComponent } from './pages/user-create/user-create.component';
//import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { SigninComponent } from './pages/signin/signin.component';

​
// Note: The following will be required but have not yet been generated. Please move from this list to the above list when they are generated and uncomment in the declarations.
// import { DeleteRecordDialogComponent } from './shared/delete-record-dialog/delete-record-dialog.component;
//import { SecurityQuestionCreateComponent } from './pages/security-question-create/security-question-create.component';
//import { SecurityQuestionDetailsComponent } from './pages/security-question-details/security-question-details.component';
//import { SigninComponent } from './pages/signin/signin.component';
//import { UserCreateComponent } from './pages/user-create/user-create.component';
//import { UserDetailsComponent } from './pages/user-details/user-details.component';
​
​
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BaseLayoutComponent,
    AuthLayoutComponent,
    //DeleteRecordDialogComponent  Uncomment when component generated.
    SecurityQuestionCreateComponent,
    //SecurityQuestionDetailsComponent,
    SecurityQuestionListComponent,
    //SigninComponent,
    UserCreateComponent,
    //UserDetailsComponent,
    UserListComponent,
    SigninComponent,
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
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

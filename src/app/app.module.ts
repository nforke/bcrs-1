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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';  // added by Joann Saeou
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Import Material Angular resources */
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper'; // added by Joann Saeou
import { MatSelectModule } from '@angular/material/select'; // added by Joann Saeou
import { MatFormFieldModule } from '@angular/material/form-field'; // added by Joann Saeou
import { MatCheckboxModule } from '@angular/material/checkbox'; //Added 11/05 Janet
import { MatMenuModule } from '@angular/material/menu';

/* Import Primeng */
import { ChartModule } from 'primeng/chart'; //Added 11/05 Janet
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
import { VerifySecurityQuestionsFormComponent } from './pages/verify-security-questions-form/verify-security-questions-form.component'; // added 10/30 Janet
import { ResetPasswordFormComponent } from './pages/reset-password-form/reset-password-form.component'; // Added 10/27 Janet
import { ErrorComponent } from './pages/error/error.component'; // added by Joann Saeou
import { ErrorInterceptor } from './shared/error.interceptor';
import { RegisterComponent } from './pages/register/register.component';
import { VerifyUsernameFormComponent } from './pages/verify-username-form/verify-username-form.component';
import { NotFoundComponent } from './pages/not-found/not-found.component'; // Added by Nicole Forke
import { ServerErrorComponent } from './pages/server-error/server-error.component';  // added by Joann Saeou
import { RoleCreateComponent } from './pages/role-create/role-create.component';  //Added 11/05 Janet
import { RoleListComponent } from './pages/role-list/role-list.component';  //Added 11/05 Janet
import { RoleDetailsComponent } from './pages/role-details/role-details.component';  //Added 11/05 Janet
import { PurchasesByServiceGraphComponent } from './pages/purchases-by-service-graph/purchases-by-service-graph.component';
import { InvoiceSummaryDialogComponent } from './dialog/invoice-summary-dialog/invoice-summary-dialog.component'; // added 11/07 Nicole Forke
import { RepairServicesComponent } from './pages/repair-services/repair-services.component';
import { SiteMaintenanceComponent } from './pages/site-maintenance/site-maintenance.component';   // added by Nicole Forke

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
    VerifySecurityQuestionsFormComponent,
    ResetPasswordFormComponent,
    ErrorComponent,
    RegisterComponent,
    VerifyUsernameFormComponent,
    NotFoundComponent,
    ServerErrorComponent,
    RoleCreateComponent,
    RoleListComponent,
    RoleDetailsComponent,
    PurchasesByServiceGraphComponent,
    InvoiceSummaryDialogComponent,
    RepairServicesComponent,
    SiteMaintenanceComponent
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
    MatStepperModule,
    MatSelectModule,
    MatListModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatMenuModule,
    ChartModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true   // added by Joann Saeou
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

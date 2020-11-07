/**
 * ======================================================================
 * Title: Bob's Computer Repair Shop Capstone
 * Author: Nicole Forke, Janet Blohn, Verlee Washington, and Joann Saeou
 * Date: 10/25/2020
 * Description: App routing module
 * ======================================================================
 */

 /**
  * Import routes and root module
  */

  import { HomeComponent } from './pages/home/home.component';
  import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
  import { NgModule } from '@angular/core';
  import { Routes, RouterModule } from '@angular/router';
  import { UserCreateComponent } from './pages/user-create/user-create.component';
  import { SecurityQuestionCreateComponent } from './pages/security-question-create/security-question-create.component';
  import { SecurityQuestionDetailsComponent } from './pages/security-question-details/security-question-details.component';
  import { SecurityQuestionListComponent } from './pages/security-question-list/security-question-list.component';
  import { SigninComponent } from './pages/signin/signin.component';
  import { UserListComponent } from './pages/user-list/user-list.component';
  //import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
  import { UserDetailsComponent } from './pages/user-details/user-details.component';
  import { AboutComponent } from './pages/about/about.component';
  import { OrdersComponent } from './pages/orders/orders.component';
  import { ResetPasswordFormComponent } from './pages/reset-password-form/reset-password-form.component';
  import { RegisterComponent } from './pages/register/register.component';
  import { VerifySecurityQuestionsFormComponent } from './pages/verify-security-questions-form/verify-security-questions-form.component';
  import { VerifyUsernameFormComponent } from './pages/verify-username-form/verify-username-form.component';
  import { NotFoundComponent } from './pages/not-found/not-found.component';
  import { ServerErrorComponent } from './pages/server-error/server-error.component';
  import { PurchasesByServiceGraphComponent } from './pages/purchases-by-service-graph/purchases-by-service-graph.component'; // Added 11/07/20 Janet
  import { RoleCreateComponent } from './pages/role-create/role-create.component';  //Added 11/07 Janet
  import { RoleListComponent } from './pages/role-list/role-list.component';  //Added 11/07 Janet
  import { RoleDetailsComponent } from './pages/role-details/role-details.component';  //Added 11/07 Janet
  /* The Invoice Components have not yet been created. Adding them to app.routing commented out so they can be easily added when completed 11/7 Janet
  import { InvoiceCreateComponent } from './pages/invoice-create/invoice-create.component';  //Added 11/07 Janet
  import { InvoiceListComponent } from './pages/invoice-list/invoice-list.component';  //Added 11/07 Janet
  import { InvoiceDetailsComponent } from './pages/invoice-details/invoice-details.component';  //Added 11/07 Janet */
  import { AuthGuard } from './shared/auth.guard'; // Added 11/07/20 Janet
  import { RoleGuard } from './shared/role.guard'; // Added 11/07/20 Janet


  /**
   * Configure routes
   */

   const routes: Routes = [
    {
      path: '',
      component: BaseLayoutComponent,
      children: [
        {
          path: '',
          component: HomeComponent
        },
        {
          path: 'about',
          component: AboutComponent
        },
        {
          path: 'purchases-by-service-graph',
          component: PurchasesByServiceGraphComponent  /*,
          canActivate: 'RoleGuard'   will be implemented after testing - Janet*/
        },

        // The remaining paths listed as children here will need to be moved to an admin path once one is created. Leaving as is for now.
        {
          path: 'users',
          component: UserListComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'users/:userId',
          component: UserDetailsComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'users/create/new',
          component: UserCreateComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'users/list',
          component: UserListComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'security-questions',
          component: SecurityQuestionListComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'security-questions/:questionId',
          component: SecurityQuestionDetailsComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'security-questions/create/new',
          component: SecurityQuestionCreateComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'security-questions/list',
          component: SecurityQuestionListComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'roles',
          component: RoleListComponent /*,
          canActivate: [AuthGuard]   Turn on after testing 11/7 Janet */
        },
        {
          path: 'roles/roleId',
          component: RoleDetailsComponent /*,
          canActivate: [AuthGuard]   Turn on after testing 11/7 Janet */
        },
        {
          path: 'roles/create/new',
          component: RoleCreateComponent /*,
          canActivate: [AuthGuard]   Turn on after testing 11/7 Janet */
        },
        /*   The Invoice Paths will be un-commented out once the components are created 11/7 Janet
        {
          path: 'invoices',
          component: InvoiceListComponent //,
          //canActivate: [AuthGuard]   Turn on after testing 11/7 Janet
        },
        {
          path: 'invoices/invoiceId',
          component: InvoiceDetailsComponent //,
          //canActivate: [AuthGuard]   Turn on after testing 11/7 Janet
        },
        {
          path: 'invoices/create/new',
          component: InvoiceCreateComponent //,
          //canActivate: [AuthGuard]   Turn on after testing 11/7 Janet
        } */
      ],
    },
    {
      path: 'session',
      //component: AuthLayoutComponent,
      component: BaseLayoutComponent,
      children: [
        {
          path: 'signin',
          component: SigninComponent
        },
        {
          path: 'register',
          component: RegisterComponent
        },
        {
          path: 'forgot',
          component: VerifyUsernameFormComponent
        },
        {
          path: 'verify-security-questions',
          component: VerifySecurityQuestionsFormComponent
        },
        {
          path: 'reset-password',
          component: ResetPasswordFormComponent
        },
        {
          path: '404',
          component: NotFoundComponent
        },
        {
          path: '500',
          component: ServerErrorComponent
        }
      ],
      //canActivate: [AuthGuard]
    },
    {
      path: '**',
      redirectTo: 'session/404'
    }
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled'})],
    exports: [RouterModule]
  })

  /**
   * Export module
   */
  export class AppRoutingModule { }

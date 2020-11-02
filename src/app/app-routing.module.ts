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
  import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
  import { UserDetailsComponent } from './pages/user-details/user-details.component';
  import { AboutComponent } from './pages/about/about.component';
  import { OrdersComponent } from './pages/orders/orders.component';
  import { ResetPasswordFormComponent } from './pages/reset-password-form/reset-password-form.component';
  import { RegisterComponent } from './pages/register/register.component';
  import { VerifySecurityQuestionsFormComponent } from './pages/verify-security-questions-form/verify-security-questions-form.component';
  import { VerifyUsernameFormComponent } from './pages/verify-username-form/verify-username-form.component';
  import { NotFoundComponent } from '../../src/app/pages/not-found/not-found.component';
  import { ServerErrorComponent } from '../../src/app/pages/server-error/server-error.component';



  /**
   * Configure routes
   */

   /**
    * The components below have been commented out until the assigned components are added to the project then the comments will be removed from the routes.
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
          path: 'users',
          component: UserListComponent
        },
        {
          path: 'users/:userId',
          component: UserDetailsComponent
        },
        {
          path: 'users/create/new',
          component: UserCreateComponent
        },
        {
          path: 'users/list',
          component: UserListComponent
        },
        {
          path: 'security-questions',
          component: SecurityQuestionListComponent
        },
        {
          path: 'security-questions/:questionId',
          component: SecurityQuestionDetailsComponent
        },
        {
          path: 'security-questions/create/new',
          component: SecurityQuestionCreateComponent
        },
        {
          path: 'security-questions/list',
          component: SecurityQuestionListComponent
        },
        {
          path: 'orders',
          component: OrdersComponent
        }
      ],
      //canActivate: [AuthGuard]
    },
    {
      path: 'session',
      component: AuthLayoutComponent,
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
      ]
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

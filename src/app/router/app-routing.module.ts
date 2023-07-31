import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router

import { HomeLayoutComponent } from '../pages/home/home-layout/home-layout.component';
import { HomeSignupComponent } from '../pages/home/home-signup/home-signup.component';
import { HomeLoginComponent } from '../pages/home/home-login/home-login.component';

import { MainLayoutComponent } from '../pages/main/main-layout.component';
import { DashboardComponent } from '../pages/main/module/analysis/dashboard/dashboard.component';
import { AuthGuard } from './auth-guard';
import { OverviewComponent } from '../pages/main/module/analysis/overview/overview.component';
import { RedirectGuard } from './redirect-guard';
import { NotFoundComponent } from '../pages/not-found/not-found.component';
import { UserComponent } from '../pages/main/module/system/user/user.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeLayoutComponent,
    canActivate: [RedirectGuard],
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'signup',
        component: HomeSignupComponent,
      },
      {
        path: 'login',
        component: HomeLoginComponent,
      },
    ],
  },
  {
    path: 'main',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'analysis/overview',
        pathMatch: 'full',
      },
      {
        path: 'analysis',
        pathMatch: 'prefix',
        children: [
          {
            path: 'overview',
            component: OverviewComponent,
          },
          {
            path: 'dashboard',
            component: DashboardComponent,
          },
        ],
      },
      {
        path: 'system',
        pathMatch: 'prefix',
        children: [
          {
            path: 'user',
            component: UserComponent,
          },
        ],
      },
      // not found
      {
        path: '**',
        component: NotFoundComponent,
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

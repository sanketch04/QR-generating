// app.routes.ts

import { Routes } from '@angular/router';

import { Login } from './pages/login/login';

import { Dashboard } from './pages/dashboard/dashboard';
import { Employees } from './pages/employees/employees';
import { AddEmployee } from './pages/add-employee/add-employee';
import { QrGenerator } from '../app/components/qr-generator/qr-generator';

import { authGuard } from './guards/auth-guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: Login,
    canActivate: [authGuard]
  },

  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },

  {
    path: 'employees',
    component: Employees,
    canActivate: [authGuard]
  },

  {
    path: 'employees/add',
    component: AddEmployee,
    canActivate: [authGuard]
  },

  {
    path: 'qr',
    component: QrGenerator,
    canActivate: [authGuard]
  },

  {
    path: '**',
    redirectTo: 'dashboard'
  }

];
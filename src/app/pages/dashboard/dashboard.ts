import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

import { loadEmployees } from '../../../store/employee/employee.action';

import {
  selectEmployeeTotalCount,
  selectEmployeeLoading,
  selectEmployeeError,
} from '../../../store/employee/employee.selector';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-dashboard',
  imports: [
  AsyncPipe,
  RouterLink,
  MatSidenavModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatTooltipModule
],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private readonly router = inject(Router);

  private readonly authService = inject(AuthService);

  private readonly store = inject(Store);

  userName = '';

  userRole = '';

  // NgRx selectors
  totalEmployees$ = this.store.select(selectEmployeeTotalCount);

  loading$ = this.store.select(selectEmployeeLoading);

  error$ = this.store.select(selectEmployeeError);

  constructor() {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      const user = JSON.parse(storedUser);

      this.userName = user.username;

      this.userRole = user.role;
    }

    // Load employees through NgRx
    this.store.dispatch(
      loadEmployees({
        pageNumber: 1,
        pageSize: 10,
      }),
    );
  }

  logout(): void {
    this.authService.logout();

    this.router.navigate(['/login']);
  }

  navigateToEmployees(): void {
    this.router.navigate(['/employees']);
  }

  navigateToQr(): void {
    this.router.navigate(['/qr']);
  }
}

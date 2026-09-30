import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AuthService } from '../../services/auth';

import { loadEmployees } from '../../../store/employee/employee.action';

import {
  selectEmployees,
  selectEmployeeLoading,
  selectEmployeeError,
  selectEmployeeTotalCount,
  selectEmployeePageNumber,
  selectEmployeePageSize,
  selectEmployeeTotalPages,
} from '../../../store/employee/employee.selector';

import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employees',
  imports: [
    AsyncPipe,
    CurrencyPipe,
    DatePipe,

    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatTooltipModule,
    MatToolbarModule,
  ],
  templateUrl: './employees.html',
  styleUrl: './employees.css',
})
export class Employees {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  // ==========================================
  // Employee Data
  // ==========================================

  employees: Employee[] = [];

  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'department',
    'salary',
    'joiningDate',
    'actions',
  ];

  // ==========================================
  // NgRx Observables
  // ==========================================

  loading$ = this.store.select(selectEmployeeLoading);

  error$ = this.store.select(selectEmployeeError);

  totalCount$ = this.store.select(selectEmployeeTotalCount);

  pageNumber$ = this.store.select(selectEmployeePageNumber);

  pageSize$ = this.store.select(selectEmployeePageSize);

  totalPages$ = this.store.select(selectEmployeeTotalPages);

  // ==========================================
  // User Information
  // ==========================================

  userRole = '';

  constructor() {
    // Get logged-in user
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      const user = JSON.parse(storedUser);

      this.userRole = user.role;
    }

    // Subscribe to employees from NgRx
    this.store.select(selectEmployees).subscribe({
      next: (employees) => {
        this.employees = employees ?? [];
      },
    });

    // Load employees
    this.loadEmployeeData();
  }

  // ==========================================
  // Load Employees
  // ==========================================

  loadEmployeeData(): void {
    this.store.dispatch(
      loadEmployees({
        pageNumber: 1,
        pageSize: 10,
      }),
    );
  }

  // ==========================================
  // Navigation
  // ==========================================

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  addEmployee(): void {
    this.router.navigate(['/employees/add']);
  }

  // ==========================================
  // Logout
  // ==========================================

  logout(): void {
    this.authService.logout();

    this.router.navigate(['/login']);
  }

  // ==========================================
  // Employee Actions
  // ==========================================

  viewEmployee(id: number): void {
    console.log('View employee:', id);
  }

  editEmployee(id: number): void {
    console.log('Edit employee:', id);
  }

  deleteEmployee(id: number): void {
    console.log('Delete employee:', id);
  }
}

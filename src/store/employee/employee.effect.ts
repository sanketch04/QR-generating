import { Injectable, inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, mergeMap, of } from 'rxjs';

import { EmployeeService } from '../../app/services/employee';

import {
  loadEmployees,
  loadEmployeesSuccess,
  loadEmployeesFailure,
  createEmployeeSuccess,
  createEmployee,
  createEmployeeFailure,
} from './employee.action';

@Injectable()
export class EmployeeEffects {
  private readonly actions$ = inject(Actions);

  private readonly employeeService = inject(EmployeeService);

  // ==========================================
  // LOAD EMPLOYEES
  // ==========================================

  loadEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEmployees),

      mergeMap((action) =>
        this.employeeService
          .getEmployees(action.pageNumber, action.pageSize)

          .pipe(
            map((response) => {
              console.log('EMPLOYEE API RESPONSE:', response);

              return loadEmployeesSuccess({
                employees: response.items,

                pageNumber: response.pageNumber,

                pageSize: response.pageSize,

                totalPages: response.totalPages,
              });
            }),

            catchError((error) =>
              of(
                loadEmployeesFailure({
                  error: error?.error?.message ?? 'Unable to load employees.',
                }),
              ),
            ),
          ),
      ),
    ),
  );

  // ==========================================
  // CREATE EMPLOYEE
  // ==========================================

  createEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createEmployee),

      mergeMap((action) =>
        this.employeeService
          .createEmployee(action.employee)

          .pipe(
            map((employee) =>
              createEmployeeSuccess({
                employee,
              }),
            ),

            catchError((error) =>
              of(
                createEmployeeFailure({
                  error: error?.error?.message ?? 'Unable to create employee.',
                }),
              ),
            ),
          ),
      ),
    ),
  );
}

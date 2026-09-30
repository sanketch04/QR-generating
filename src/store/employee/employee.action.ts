import { createAction, props } from '@ngrx/store';

import { Employee } from '../../app/models/employee';
import { EmployeeCreate } from '../../app/models/enployee-create';

// ==========================================
// LOAD EMPLOYEES
// ==========================================

export const loadEmployees = createAction(
  '[Employee] Load Employees',

  props<{
    pageNumber: number;
    pageSize: number;
  }>()
);

// ==========================================
// LOAD EMPLOYEES SUCCESS
// ==========================================

export const loadEmployeesSuccess = createAction(
  '[Employee] Load Employees Success',

  props<{
    employees: Employee[];
    pageNumber: number;
    pageSize: number;
    totalPages: number;
  }>()
);

// ==========================================
// LOAD EMPLOYEES FAILURE
// ==========================================

export const loadEmployeesFailure = createAction(
  '[Employee] Load Employees Failure',

  props<{
    error: string;
  }>()
);

// ==========================================
// CREATE EMPLOYEE
// ==========================================

export const createEmployee = createAction(
  '[Employee] Create Employee',

  props<{
    employee: EmployeeCreate;
  }>()
);

// ==========================================
// CREATE EMPLOYEE SUCCESS
// ==========================================

export const createEmployeeSuccess = createAction(
  '[Employee] Create Employee Success',

  props<{
    employee: Employee;
  }>()
);

// ==========================================
// CREATE EMPLOYEE FAILURE
// ==========================================

export const createEmployeeFailure = createAction(
  '[Employee] Create Employee Failure',

  props<{
    error: string;
  }>()
);
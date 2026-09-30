import { createReducer, on } from '@ngrx/store';

import {
  loadEmployees,
  loadEmployeesSuccess,
  loadEmployeesFailure,
  createEmployee,
  createEmployeeSuccess,
  createEmployeeFailure,
} from './employee.action';

import { Employee } from '../../app/models/employee';

// ==========================================
// EMPLOYEE STATE
// ==========================================

export interface EmployeeState {
  employees: Employee[];

  totalCount: number;

  pageNumber: number;

  pageSize: number;

  totalPages: number;

  loading: boolean;

  error: string | null;
}

// ==========================================
// INITIAL STATE
// ==========================================

export const initialEmployeeState: EmployeeState = {
  employees: [],

  totalCount: 0,

  pageNumber: 1,

  pageSize: 10,

  totalPages: 0,

  loading: false,

  error: null,
};

// ==========================================
// REDUCER
// ==========================================

export const employeeReducer = createReducer(
  initialEmployeeState,

  // ==========================================
  // LOAD EMPLOYEES
  // ==========================================

  on(
    loadEmployees,

    (state) => ({
      ...state,

      loading: true,

      error: null,
    }),
  ),

  // ==========================================
  // LOAD SUCCESS
  // ==========================================

  on(
    loadEmployeesSuccess,

    (
      state,

      { employees, pageNumber, pageSize, totalPages },
    ) => ({
      ...state,

      employees,

      pageNumber,

      pageSize,

      totalPages,

      // API does not provide totalCount.
      // We can calculate it from current page
      // for now.

      totalCount: employees.length,

      loading: false,

      error: null,
    }),
  ),

  // ==========================================
  // LOAD FAILURE
  // ==========================================

  on(
    loadEmployeesFailure,

    (
      state,

      { error },
    ) => ({
      ...state,

      loading: false,

      error,
    }),
  ),

  // ==========================================
  // CREATE EMPLOYEE
  // ==========================================

  on(
    createEmployee,

    (state) => ({
      ...state,

      loading: true,

      error: null,
    }),
  ),

  // ==========================================
  // CREATE SUCCESS
  // ==========================================

  on(
    createEmployeeSuccess,

    (
      state,

      { employee },
    ) => ({
      ...state,

      employees: [employee, ...state.employees],

      totalCount: state.totalCount + 1,

      loading: false,

      error: null,
    }),
  ),

  // ==========================================
  // CREATE FAILURE
  // ==========================================

  on(
    createEmployeeFailure,

    (
      state,

      { error },
    ) => ({
      ...state,

      loading: false,

      error,
    }),
  ),
);

import { createFeatureSelector, createSelector } from '@ngrx/store';

import { EmployeeState } from './employee.reducer';

// ==========================================
// EMPLOYEE STATE
// ==========================================

export const selectEmployeeState = createFeatureSelector<EmployeeState>('employees');

// ==========================================
// EMPLOYEES
// ==========================================

export const selectEmployees = createSelector(
  selectEmployeeState,

  (state) => state.employees,
);

// ==========================================
// LOADING
// ==========================================

export const selectEmployeeLoading = createSelector(
  selectEmployeeState,

  (state) => state.loading,
);

// ==========================================
// ERROR
// ==========================================

export const selectEmployeeError = createSelector(
  selectEmployeeState,

  (state) => state.error,
);

// ==========================================
// TOTAL COUNT
// ==========================================

export const selectEmployeeTotalCount = createSelector(
  selectEmployeeState,

  (state) => state.totalCount,
);

// ==========================================
// PAGE NUMBER
// ==========================================

export const selectEmployeePageNumber = createSelector(
  selectEmployeeState,

  (state) => state.pageNumber,
);

// ==========================================
// PAGE SIZE
// ==========================================

export const selectEmployeePageSize = createSelector(
  selectEmployeeState,

  (state) => state.pageSize,
);

// ==========================================
// TOTAL PAGES
// ==========================================

export const selectEmployeeTotalPages = createSelector(
  selectEmployeeState,

  (state) => state.totalPages,
);

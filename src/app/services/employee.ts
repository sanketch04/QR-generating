import { Injectable, inject } from '@angular/core';

import {
  HttpClient,
  HttpParams
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { Employee } from '../models/employee';

import {
  EmployeeCreate
} from '../../app/models/enployee-create';

import {
  PageResponse
} from '../models/page-response';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    'https://localhost:7012/v1/api';


  getEmployees(
    pageNumber: number = 1,
    pageSize: number = 10
  ): Observable<PageResponse<Employee>> {

    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    return this.http.get<PageResponse<Employee>>(
      this.apiUrl,
      {
        params
      }
    );
  }


  getEmployeeById(
    id: number
  ): Observable<Employee> {

    return this.http.get<Employee>(
      `${this.apiUrl}/${id}`
    );
  }


  createEmployee(
    employee: EmployeeCreate
  ): Observable<Employee> {

    return this.http.post<Employee>(
      this.apiUrl,
      employee
    );
  }

}
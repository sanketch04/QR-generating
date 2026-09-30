import { Component, inject } from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import {
  MatFormFieldModule
} from '@angular/material/form-field';

import {
  MatInputModule
} from '@angular/material/input';

import { MatIconModule } from '@angular/material/icon';

import { MatSelectModule } from '@angular/material/select';

import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatNativeDateModule } from '@angular/material/core';

import { MatTooltipModule } from '@angular/material/tooltip';

import {
  createEmployee
} from '../../../store/employee/employee.action';


@Component({
  selector: 'app-add-employee',

  imports: [
    ReactiveFormsModule,

    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,

    MatDatepickerModule,
    MatNativeDateModule,

    MatTooltipModule
  ],

  templateUrl: './add-employee.html',

  styleUrl: './add-employee.css'
})
export class AddEmployee {

  private readonly fb = inject(FormBuilder);

  private readonly store = inject(Store);

  private readonly router = inject(Router);


  // ==========================================
  // Employee Form
  // ==========================================

  employeeForm = this.fb.nonNullable.group({

    firstName: [
      '',
      [
        Validators.required,
        Validators.minLength(2)
      ]
    ],

    lastName: [
      '',
      [
        Validators.required,
        Validators.minLength(2)
      ]
    ],

    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    department: [
      '',
      Validators.required
    ],

    salary: [
      0,
      [
        Validators.required,
        Validators.min(1)
      ]
    ],

    joiningDate: [
      '',
      Validators.required
    ]

  });


  // ==========================================
  // Save Employee
  // ==========================================

  saveEmployee(): void {

    if (this.employeeForm.invalid) {

      this.employeeForm.markAllAsTouched();

      return;
    }


    const formValue =
      this.employeeForm.getRawValue();


    this.store.dispatch(

      createEmployee({

        employee: {

          firstName:
            formValue.firstName,

          lastName:
            formValue.lastName,

          email:
            formValue.email,

          department:
            formValue.department,

          salary:
            Number(formValue.salary),

          joiningDate:
            formValue.joiningDate

        }

      })

    );


    this.router.navigate([
      '/employees'
    ]);

  }


  // ==========================================
  // Cancel
  // ==========================================

  cancel(): void {

    this.router.navigate([
      '/employees'
    ]);

  }

}
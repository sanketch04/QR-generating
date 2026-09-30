import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';

import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { provideTranslateService } from '@ngx-translate/core';

import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { authInterceptor } from './interceptor/auth-interceptor';

import { provideStore } from '@ngrx/store';

import { provideEffects } from '@ngrx/effects';

import { employeeReducer } from '../store/employee/employee.reducer';

import { EmployeeEffects } from '../store/employee/employee.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),

    provideZonelessChangeDetection(),

    // ==========================================
    // HTTP + JWT INTERCEPTOR
    // ==========================================

    provideHttpClient(withInterceptors([authInterceptor])),

    // ==========================================
    // TRANSLATION
    // ==========================================

    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/i18n/',

        suffix: '.json',
      }),

      fallbackLang: 'en',

      lang: 'en',
    }),

    // ==========================================
    // ROUTER
    // ==========================================

    provideRouter(routes),

    // ==========================================
    // NGRX STORE
    // ==========================================

    provideStore({
      employees: employeeReducer,
    }),

    // ==========================================
    // NGRX EFFECTS
    // ==========================================

    provideEffects([EmployeeEffects]),
  ],
};

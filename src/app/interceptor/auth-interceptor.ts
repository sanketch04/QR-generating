import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('accessToken');

  console.log('AUTH INTERCEPTOR');
  console.log('Request URL:', req.url);
  console.log('Token exists:', !!token);

  if (!token) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log('Authorization header attached:', authReq.headers.has('Authorization'));

  return next(authReq);
};

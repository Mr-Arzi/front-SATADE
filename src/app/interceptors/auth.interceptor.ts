import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';

import { AuthService } from '../services/auth.service';

const LOGIN_PATH = '/api/auth/login';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.endsWith(LOGIN_PATH)) {
    return next(req);
  }

  const token = inject(AuthService).getToken();
  if (!token) {
    return next(req);
  }

  return next(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }));
};

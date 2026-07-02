import { HttpInterceptorFn } from '@angular/common/http';
import { from, switchMap } from 'rxjs';
import { fetchAuthSession } from 'aws-amplify/auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  return from(fetchAuthSession()).pipe(
    switchMap((session) => {
      const token = session.tokens?.accessToken?.toString();

      if (!token) {
        return next(req);
      }

      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      return next(authReq);
    })
  );
};
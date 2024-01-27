import { HttpInterceptorFn } from '@angular/common/http';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const server = "http://localhost:3000"; // Put your server's url here
  const reqClone = req.clone({
    url: `${server}/${req.url}`,
  });
  return next(reqClone);
};
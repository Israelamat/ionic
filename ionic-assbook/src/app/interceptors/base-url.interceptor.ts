import { HttpInterceptorFn } from '@angular/common/http';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const server = "https://api.fullstackpro.es/ionic-products"; // Put your server's url here
  const reqClone = req.clone({
    url: `${server}/${req.url}`,
  });
  return next(reqClone);
};
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class InterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
       
          let tokenizedReq =  req.clone({
            setHeaders : {
              Authorization : ""+sessionStorage.getItem('jwt-token')
            }
          })
          return next.handle(tokenizedReq)
  }
}

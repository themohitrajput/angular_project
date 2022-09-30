import { HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, tap } from 'rxjs';

@Injectable()
export class CacheInterceptorsService implements HttpInterceptor {

  constructor() { }

   cache:Map<string,HttpResponse<any>> = new Map<string,HttpResponse<any>>();
  intercept(request:HttpRequest<any>,next:HttpHandler){

       if(request.method != 'GET'){
         console.log('response from server')
         return next.handle(request)
       }

       const cachedResponse = this.cache.get(request.url);

       if(cachedResponse){
         console.log("data coming from cache");
          return of(cachedResponse)
       }
       else{
          return next.handle(request).pipe(tap(
            statevent=>{
              if(statevent instanceof HttpResponse){
                this.cache.set(request.url, statevent.clone());
              }
            }
          ))
       }
       
  
  }
}

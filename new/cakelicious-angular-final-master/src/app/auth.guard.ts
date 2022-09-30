import { Injectable } from '@angular/core';
import {  CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AppGuardGuard implements CanActivate {

    constructor(private service:LoginService,private router:Router){}
  canActivate(){
    if(this.service.checkToken()){
      return true;
    }else{
      this.router.navigate(['signin'])
      return false;
    }
  };
  }
 
  




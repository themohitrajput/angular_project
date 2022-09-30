import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

import { environment } from "../../environments/environment.prod";
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = "https://cake-licious-backend.herokuapp.com";
  signUpApi = this.url+"/customer/sign-up";
  signInApi = this.url+"/customer/sign-in"; 
  signupGoogle =this.url+"/customer/login-with-google"
  optApi = this.url+"/customer/send-otp";

  constructor(private http:HttpClient) { }

  public signUp(user:User){
    return this.http.post(this.signUpApi,{user})
  }

  public signInn(user:User){
    return this.http.post(this.signInApi,user)
  }

  public SignInGoogle(email: any): Observable<any> {
    return this.http.post(this.signupGoogle, { email });
  }

  public checkToken() {
    return !!sessionStorage.getItem('jwt-token');
  }

  public verifyOtp(user:any):Observable<any>{
    return this.http.post(this.optApi,user)
  }

}

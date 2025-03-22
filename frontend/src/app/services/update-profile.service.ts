import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateProfileService {
  profile = "https://cake-web-ou58.onrender.comcustomer/profile"
  constructor(private http:HttpClient) { }

  
}

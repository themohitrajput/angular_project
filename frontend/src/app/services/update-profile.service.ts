import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateProfileService {
  profile = "https://cake-web-ou58.onrender.com/customer/profile"
  constructor(private http:HttpClient) { }

  
}

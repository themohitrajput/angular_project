import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateProfileService {
  profile = "http://localhost:3000/customer/profile"
  constructor(private http:HttpClient) { }

  
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  url = "https://cake-licious-backend.herokuapp.com/";

  addQuaryApi = this.url+"support-admin/addQuery"
  constructor(private http:HttpClient) { }

  public addQuary(customer:any , query:any): Observable<any> {
    return this.http.post(this.addQuaryApi, { customer, query });
  }
}

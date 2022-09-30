import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Occassion } from '../model/occassion';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class OccassionService {

  constructor( private http:HttpClient) { }
  url = "https://cake-licious-backend.herokuapp.com/";

  public getOccassion():Observable<Occassion[]>{
    let getOccassion = this.url+'occassion/viewOccassion';
    return this.http.get<Occassion[]>(getOccassion);
  }

  public getSingleOccassion(occassionId:any):Observable<Occassion>{
    let getSingleOccassion=this.url+"occassion/viewOneOccassion"
    return this.http.get<Occassion>(getSingleOccassion+'/'+ occassionId);
  }

  public getProductByOccassion(oid:any):Observable<Product[]>{
    let productsByOccasssion = this.url+"admin-product/occassion-product"
      return this.http.get<Product[]>(productsByOccasssion+'/'+oid)
  }
}

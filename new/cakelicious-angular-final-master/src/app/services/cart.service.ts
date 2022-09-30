import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  url = "https://cake-licious-backend.herokuapp.com/";

  cartApi = this.url+"cart/add-to-cart";
  getCart = this.url+"cart/view-cart";
  deleteFullCart = this.url+'cart/delete-cart';
  deleteOneitem = this.url+'cart/delete-cart-item';
  constructor(private http:HttpClient) { }

  // CART-APIS

  public addtoCart(id: any, Userid: any): Observable<any> {
    return this.http.post(this.cartApi, { id, Userid });
  }
  public getCartItems(Userid: any): Observable<any> {
    return this.http.post(this.getCart, { Userid });
  }

  public deleteCart(Userid:any):Observable<any>{
    return this.http.post(this.deleteFullCart,{Userid})
  }

  public deleteOne(Userid:any,pId:any):Observable<any>{
    return this.http.post(this.deleteOneitem,{Userid,pId})
  }



}

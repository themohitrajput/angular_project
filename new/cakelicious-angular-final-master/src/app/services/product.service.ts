import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../model/category';
import { Occassion } from '../model/occassion';
import { Product } from '../model/product';
@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private http: HttpClient) {}
  url = "https://cake-licious-backend.herokuapp.com/";

  public getProductbyCategory(categoryId: any):Observable<Product[]>{
    let getProductByCategory =
      this.url+'product/getProductBycategory';
    return this.http.get<Product[]>(getProductByCategory + '/' + categoryId);
  }


  public getProductbypId(pId: any): Observable<Product[]>{
    let getProductById = this.url+"product/getProductById";
    return this.http.get<Product[]>(getProductById + '/' + pId);
  }

  public searchProduct(text: any): Observable<any>{
    let getProductById = this.url+'product/searchProduct';
    return this.http.get<any>(getProductById + '/' + text);
  }
  public getProductList():Observable<any>{
    var api = this.url+"admin-product/viewProduct";
    return this.http.get(api);
  }

  public viewOfferItem():Observable<any>{
    var api = this.url+"offeritem/viewOffer";
    return this.http.get(api);
  }


public givRating(userId:any,pId:any,rating:any,review:any):Observable<any>
{
  var api =this.url+"product/addReview";
 return this.http.post(api,{userId,pId,rating,review});
}


public editRating(userId:any,pId:any,rating:any,review:any,rId:any):Observable<any>
{
  var api = this.url+"product/editReview";
 return this.http.post(api,{userId,pId,rating,review,rId});
}

}

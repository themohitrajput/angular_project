import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../model/category';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = "https://cake-licious-backend.herokuapp.com/";

  constructor(private http:HttpClient) {}
   public getCategory():Observable<Category[]>{
    let getCategory =
      this.url+'category/viewCategoryByuser';
    return this.http.get<Category[]>(getCategory);
  }

  public getProductByCategory(cid:any):Observable<Product[]>{
    let productByCatgory=this.url+"admin-product/category-product"
    return this.http.get<Product[]>(productByCatgory+'/'+cid)
  }
}

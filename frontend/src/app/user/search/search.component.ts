import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['.././category-wise-cake/category-wise-cake.component.css']
})
export class SearchComponent implements OnInit {
  productList:any=[];
  page: number = 1;
  count: number = 0;
  cardSize: number = 12
  cartItems: any;
  ItemsLength: any;
  ID: any;
  searchText: any="";
  constructor(private productService:ProductService ,private router:Router, private activatedRoute:ActivatedRoute,private cartService:CartService,private toastr:ToastrService) { }

  addCart(id: any) {
    console.log(id)
    console.log(this.userId)
    if (this.userId) {
      this.cartService.getCartItems(this.userId).subscribe((data) => {
        console.log(data);

        if (data) {
          let value: any;
          this.cartItems = data.cartItems;
          this.ItemsLength = this.cartItems.length;
          for (let id of this.cartItems) {
            console.log(id._id);
            this.ID.push(id._id);
          }
          value = this.ID.indexOf(id);
          console.log(value);

          if (value == -1) {
            this.cartService.addtoCart(id, this.userId).subscribe((data) => {
              if (data.status == 'ok') {
                console.log(data);
                this.toastr.success('item Added To CART', 'CakeLicious');
              } else {
                console.log(data);
                alert('item not added');
              }
            });
          } else {
            this.toastr.warning('item Already In Cart', 'CakeLicious');
          }
        } else {
          this.cartService.addtoCart(id, this.userId).subscribe((data) => {
            if (data.status == 'ok') {
              console.log(data);
              this.toastr.success('item Added To CART', 'CakeLicious');
            } else {
              console.log(data);
              alert('item not added');
            }
          });
        }
      });
    } else {
      this.router.navigate(['signin']);
    }
  }
  userId(userId: any) {
    throw new Error('Method not implemented.');
  }
  // onCardDataChange(event: any) {
  //   this.page = event;
  // }
  ngOnInit(): void {
  
    console.log('component');
    this.router.events.subscribe(event=>{
      if(event instanceof NavigationEnd){
        this.searchText = ''+this.activatedRoute.snapshot.paramMap.get('text');
        console.log(this.searchText)
        this.productService.getProductList().subscribe((data: any)=>{
          console.log(data)
          this.productList = data
        })
      }
    })
  
  }

}

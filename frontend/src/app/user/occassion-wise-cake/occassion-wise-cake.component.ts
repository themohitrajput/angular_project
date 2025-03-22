import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/services/cart.service';
import { OccassionService } from 'src/app/services/occassion.service';
import { ProductService } from 'src/app/services/product.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-occassion-wise-cake',
  templateUrl: './occassion-wise-cake.component.html',
  styleUrls: ['.././category-wise-cake/category-wise-cake.component.css'],
})
export class OccassionWiseCakeComponent implements OnInit {
  occassionId: any;
  occassionDetail: any = {};
  productbyOccassion:Product[]=[];
  occName: any;
  constructor(
    private route: ActivatedRoute,
    private occassionServe: OccassionService,
    private router: Router,
    private toastr: ToastrService,
    private cartService:CartService,
    private wishlistService:WishlistService
  ) {
    this.router.events.subscribe((event) => {
      this.route.params.subscribe((params) => {
        this.occassionId = params['occassionId'];
        this.occName = params['occName'];
        console.log(this.occassionId);
      });

      if (event instanceof NavigationEnd) {
        this.occassionServe
          .getSingleOccassion(this.occassionId)
          .subscribe((data) => {
            console.log('single');
            console.log(data);
            this.occassionDetail = data;
          });

        this.occassionServe
          .getProductByOccassion(this.occassionId)
          .subscribe((data) => {
            console.log('products');
            this.productbyOccassion = data;

            console.log(data);
          });
      }
    });
  }

  userId: any;
  // id: any;
  ID: any = [];
  userData: any;
  cartItems: any = [];
  ItemsLength: any;
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

//WISHLIST

wishlistItem: any = [];
  addWishlist(id: any) {
    console.log(id)
    console.log(this.userId)
    if (this.userId) {
      this.wishlistService.getWishlistItems(this.userId).subscribe((data) => {
        console.log(data);

        if (data) {
          let value: any;
          this.wishlistItem = data.wishlistItem;
          console.log(this.wishlistItem);
          this.ItemsLength = this.wishlistItem.length;
          for (let id of this.wishlistItem) {
            console.log(id._id);
            this.ID.push(id._id);
          }
          value = this.ID.indexOf(id);
          console.log(value);

          if (value == -1) {
            this.wishlistService.addtoWishlist(id, this.userId).subscribe((data) => {
              if (data.status == 'ok') {
                console.log(data);
                this.toastr.success('item Added To WISHLIST', 'CakeLicious');
              } else {
              this.toastr.warning('item not added')
              }
            });
          } else {
            this.toastr.warning('item Already In Wishlist', 'CakeLicious');
          }
        } else {
          this.wishlistService.addtoWishlist(id, this.userId).subscribe((data) => {
            if (data.status == 'ok') {
              console.log(data);
              this.toastr.success('item Added To WISHLIST', 'CakeLicious');
            } else {
              console.log(data);
              this.toastr.warning('item not added')
            }
          });
        }
      });
    } else {
      this.router.navigate(['signin']);
    }
  }




  ngOnInit(): void {
    this.userData = JSON.parse(sessionStorage.getItem('user-detail') || '{}');
    console.log(this.userData);
    const length = Object.keys(this.userData).length;
    console.log(length)
    if(length!=0)
    this.userId = this.userData.current_user._id;

  }

}

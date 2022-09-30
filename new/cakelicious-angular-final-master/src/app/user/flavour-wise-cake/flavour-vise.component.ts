import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/model/product';
import { FlavourService } from 'src/app/services/flavour.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-flavour-vise',
  templateUrl: './flavour-vise.component.html',
  styleUrls: ['.././category-wise-cake/category-wise-cake.component.css']
})
export class FlavourViseComponent implements OnInit {
  fid: any;
  productListByFlavour: Product[] | any;
  flavourname: any;
  constructor(private route: ActivatedRoute, private flavourServe: FlavourService, private router: Router , private toastr: ToastrService , private cartService:CartService , private wishlistService:WishlistService) {

    this.router.events.subscribe(event => {

      this.route.params.subscribe((params: Params) => {
        this.fid = params["fid"];
        this.flavourname = params["fname"];
        console.log(this.fid);
      })

      if (event instanceof NavigationEnd) {

        this.flavourServe.getProductByFlavour(this.fid).subscribe(data => {

          console.log(data)
          this.productListByFlavour = data;
        })
      }

    })
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
//////dksmflaksdkfoa
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

  //wishlist
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-view-wishlist',
  templateUrl: './view-wishlist.component.html',
  styleUrls: ['./view-wishlist.component.css']
})
export class ViewWishlistComponent implements OnInit {
  userData: any;
  userId: any;
  wishlistItem: any;
  UpdatedWishlistItems: any;
  Items: any;

  constructor(private router:Router , private wishlistService:WishlistService , private cartService:CartService , private toastr: ToastrService) {
    this.userData = JSON.parse(sessionStorage.getItem('user-detail') || '{}');
    console.log(this.userData);
    const length = Object.keys(this.userData).length;
    console.log(length)
    if(length!=0)
    this.userId = this.userData.current_user._id;

  }


  deletewishlist() {
    this.wishlistService.deleteWishlist(this.userId).subscribe((data: any) => {
      console.log(data);
      window.location.reload();
    });
  }

  deleteItem(pid: any) {
    this.wishlistService.deleteOne(this.userId, pid).subscribe((data:any) => {
      console.log(data);
      window.location.reload();
    });
  }

  // id: any;
  ID: any = [];
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





  ngOnInit(): void {
 if(this.userId){
    this.wishlistService.getWishlistItems(this.userId).subscribe((data:any) => {
      console.log(data);
      if (data) {
        console.log(data);
        this.wishlistItem = data.wishlistItem;
        this.UpdatedWishlistItems = data.wishlistItem;
        this.Items = this.wishlistItem.length;
        for (let item of data.wishlistItem) {
          console.log(item);
        }
      } else {
        this.router.navigate(['empty-cart/1']);
      }
    });
  }else{
    this.router.navigate(['signin']);
  }
}
}

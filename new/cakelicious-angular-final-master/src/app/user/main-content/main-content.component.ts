import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from 'src/app/model/product';
import { Occassion } from 'src/app/model/occassion';
import { Router } from '@angular/router';
import { FlavourService } from 'src/app/services/flavour.service';
import { OccassionService } from 'src/app/services/occassion.service';
import { LoginService } from 'src/app/services/login.service';
import { data } from 'jquery';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css'],
})
export class MainContentComponent implements OnInit {
  exclusiveList: Product[] | any = [];
  occassionList: Occassion[] | any = [];
  flavourList: any = [];
  constructor(
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService,
    private flavourService: FlavourService,
    private ocassionServe: OccassionService,
    private loginService: LoginService,
    private cartService: CartService
  ) {
    this.productService
      .getProductbyCategory('62833692871c3910a1fd0c25')
      .subscribe((data: any) => {
        console.log(data);
        this.exclusiveList = data;
      });

    this.ocassionServe.getOccassion().subscribe((data: any) => {
      console.log(data);
      this.occassionList = data;
    });
  }
  what_we_offer_options: OwlOptions = {
    loop: true,
    autoplay: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,

    navText: [
      '<i class="fa fa-caret-left" aria-hidden="true"></i>',
      '<i class="fa fa-caret-right" aria-hidden="true"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 3,
      },
      1200: {
        items: 3,
      },
      1300: {
        items: 3,
      },
      1500: {
        items: 3,
      },
    },
    nav: true,
  };

  product_options: OwlOptions = {
    loop: false,
    autoplay: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [
      '<i class="fa fa-caret-left" aria-hidden="true"></i>',
      '<i class="fa fa-caret-right" aria-hidden="true"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };
  infoOption: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 500,

    navText: [
      
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: false,
  };
  customOptions: OwlOptions = {
    loop: true,
    autoplay: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 800,
    animateIn: true,
    animateOut: true,

    navText: ['<i class="fa fa-arrow-left" aria-hidden="true"></i>', '<i class="fa fa-arrow-right" aria-hidden="true"></i>'],
    responsive: {
      0: {
        items: 2,
      },
      400: {
        items: 3,
      },
      740: {
        items: 4,
      },
      940: {
        items: 5,
      },
    },
    nav: true,
  };

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

  ngOnInit(): void {
    this.userData = JSON.parse(sessionStorage.getItem('user-detail') || '{}');
    console.log(this.userData);
    const length = Object.keys(this.userData).length;
    console.log(length)
    if(length!=0)
    this.userId = this.userData.current_user._id;


    this.flavourService.getFlaovurList().subscribe(
      (data) => {
        this.flavourList = data;
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status == 500) alert('Something went wrong...');
        }
      }
    );
  }
  //gkfjdhgjksfdj
}

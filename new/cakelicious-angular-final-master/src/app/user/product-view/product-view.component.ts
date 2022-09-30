import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
declare var Razorpay:any;
@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  productList :Product[]|any=[];
  id:any;
  size: any=1;
  egg: any="eggless";
  totalAmt:any=1;
  Address:any;
  message:any;
  userId: any;
  ID: any = [];
  userData: any;
  cartItems: any = [];
  ItemsLength: any;
  qty:any=1;
  price:any;
  paymentMethod:string='online';
  alterNumber?:number;
  constructor(private product:ProductService ,private route: ActivatedRoute,
    private router: Router  , private cartService:CartService ,private toastr:ToastrService,private orderServe:OrderService) {

      this.route.params.subscribe((params: Params) => {
        this.id = params["pId"];
        console.log(this.id);
      });

    this.product.getProductbypId(this.id).subscribe(data=>{
      console.log(data)
      this.productList =data;
      this.productList[0].size=1;
      this.productList[0].qty=1;
      this.totalAmt= this.productList[0].prodPrice
      this.productList[0].price= this.productList[0].prodPrice
    })
  }


  updateQuantity(q:any,str:string){
    this.totalAmt=0
     if(str=='QTY'){
      this.productList[0].qty=q;
       this.productList[0].price=this.productList[0].prodPrice*q;
     }else{
       this.productList[0].size=q.target.value[0]*1;
     }
     for(let item of this.productList){
      this.totalAmt+=(item.price+((item.size-1)*100));
      }

      console.log(this.productList)

 }




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



pay(check:any){
  if(check=='online'){
    this.orderServe.CreateOrder(this.totalAmt).subscribe((data) => {
      console.log(data);
      var options = {
        key: 'rzp_test_Wp8VeLBusO80zT', // Enter the Key ID generated from the Dashboard
        amount: 10000, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: 'INR',
        name: 'Acme Corp',
        description: 'Test Transaction',
        image: '../../assets/images/logo-name-removebg-preview (1).png',
        order_id: data.id,
        // "qty":this.qty,
        // "size":this.size,
        Address: this.Address,
        message: this.message, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: (response: {
          razorpay_payment_id: any;
          razorpay_order_id: any;
          razorpay_signature: any;
          razorpay_prefill: any;
        }) => {
          console.log(response);
          sessionStorage.setItem('payment-detail', JSON.stringify(response));

          console.log(response, this.userId, this.Address, this.productList);
          this.orderServe
            .placeOrder(this.userId,response, this.Address,this.alterNumber, this.productList)
            .subscribe((data) => {
              if ((data.msg == 'ok')) {
                   this.toastr.success('payment Success',"payment");
                   this.router.navigate(['/order-success'])
              }
            });
        },
        prefill: {
          name: this.userData.current_user.name,
          email: this.userData.current_user.email,
          contact: this.userData.current_user.mobile,
        },
        notes: {
          address: 'Razorpay Corporate Office',
          myData: {
            first: 'kjhhj',
            second: 'kjhhj',
            third: 'kjhhj',
          },
          qty: 'dkfed',
          size: 'dfkjnjnvn',
          Address: 'wefoneoiwn',
          message: 'fihwe',
        },
        theme: {
          color: '#3399cc',
        },
      };
      var rzp1 = new Razorpay(options);
      rzp1.on(
        'payment.failed',
        function (response: {
          error: {
            code: any;
            description: any;
            source: any;
            step: any;
            reason: any;
            metadata: { order_id: any; payment_id: any };
          };
        }) {
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
        }
      );
      rzp1.open();
    });


  }else{

    this.orderServe.CreateOrder(this.totalAmt).subscribe((data) => {
  console.log(data)
      if(data){
      console.log(this.userId,this.Address,this.alterNumber,data.id,this.totalAmt,this.productList)
       this.orderServe.cashOnDelivery(this.userId,this.Address,this.alterNumber,data.id,this.totalAmt,this.productList).subscribe(data=>{

        if(data.status=='ok'){
          this.toastr.success("order Successfull","cash on Deliver")
          this.router.navigate(['/order-success'])
        }
       })
      }
    })


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

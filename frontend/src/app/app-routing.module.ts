import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './user/cart/cart.component';
import { CategoryWiseCakeComponent } from './user/category-wise-cake/category-wise-cake.component';
import { ContactUsComponent } from './user/contact-us/contact-us.component';
import { EmptyCartComponent } from './user/empty-cart/empty-cart.component';
import { FlavourViseComponent } from './user/flavour-wise-cake/flavour-vise.component';

import { HomeComponent } from './user/home/home.component';
import { MainContentComponent } from './user/main-content/main-content.component';
import { OccassionWiseCakeComponent } from './user/occassion-wise-cake/occassion-wise-cake.component';
import { ProductViewComponent } from './user/product-view/product-view.component';
import { SearchComponent } from './user/search/search.component';
import { SigninComponent } from './user/signin/signin.component';
import { SignupComponent } from './user/signup/signup.component';
import { AllproductComponent } from './user/allproduct/allproduct.component';
import { AppGuardGuard } from './auth.guard'
import { ViewWishlistComponent } from './user/view-wishlist/view-wishlist.component';
import { OrderViewComponent } from './user/order-view/order-view.component';
import { PlaceOrderComponent } from './user/place-order/place-order.component';
import { OrderSuccessComponent } from './user/order-success/order-success.component';
import { UpdateProfleComponent } from './user/update-profle/update-profle.component';
import { AboutComponent } from './user/about/about.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: MainContentComponent },
      {
        path: 'signin',
        component: SigninComponent,
      },
      { path: 'product-view/:pId', component: ProductViewComponent },
      {
        path: 'signup',
        component: SignupComponent,
      },
      {
        path: 'contact',
        component: ContactUsComponent,
      },
      {
        path: 'allProduct',component:AllproductComponent
      },
      {
        path: 'about',component:AboutComponent
      },
      { path: 'searchProduct/:text', component: SearchComponent },
      { path: 'category-wise/:categoryId/:catName', component: CategoryWiseCakeComponent },
      { path: 'occassion-wise/:occassionId/:occName', component: OccassionWiseCakeComponent },
      {path:"flavour-wise/:fid/:fname",component:FlavourViseComponent},
      {path:"cart",component:CartComponent,canActivate:[AppGuardGuard]},
      {path:"empty-cart/:val",component:EmptyCartComponent},
      {path:'view-wishlist',component:ViewWishlistComponent},
      {path:'view-order-history',component:OrderViewComponent},
      {path:'place-order' , component:PlaceOrderComponent},
      {path:'order-success' , component:OrderSuccessComponent},
      {path:'update-profile'  , component:UpdateProfleComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

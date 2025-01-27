import { Routes } from '@angular/router';
import { SellerComponent } from './seller/seller.component';
import { ProfileComponent as sellerProfile } from './seller/profile/profile.component';
import { ProfileComponent as customerProfile }  from './customer/profile/profile.component';
import { CustomerComponent } from './customer/customer.component';
import { HomeComponent as CustomerHome } from './customer/home/home.component';
import { AllProductsComponent as CustomerProducts } from './customer/all-products/all-products.component';

export const routes: Routes = [

    {path:'seller',component:SellerComponent, children:[
        {path:"profile",component:sellerProfile}
    ]},
    {path:'',component:CustomerComponent,children:[
        {path:"",component:CustomerHome},
        {path:"products",component:CustomerProducts},
        {path:"profile",component:customerProfile},
    ]}
];

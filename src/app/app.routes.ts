import { Routes } from '@angular/router';
import { SellerComponent } from './seller/seller.component';
import { ProfileComponent as sellerProfile } from './seller/profile/profile.component';
import { ProfileComponent as customerProfile }  from './customer/profile/profile.component';
import { CustomerComponent } from './customer/customer.component';
import { HomeComponent as CustomerHome } from './customer/home/home.component';
import { AllProductsComponent as CustomerProducts } from './customer/all-products/all-products.component';
import { LoginComponent } from './customer/login/login.component';
import { RegisterComponent } from './customer/register/register.component';
import { AboutComponent } from './customer/about/about.component';
import { ContactUsComponent } from './customer/contact-us/contact-us.component';
import { CartComponent } from './customer/cart/cart.component';
import { ProductDetailsComponent as CustomerProductDetails } from './customer/product-details/product-details.component';
import { CheckoutComponent } from './customer/checkout/checkout.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ProductsComponent } from './admin/products/products.component';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { AdminLoginComponent } from './admin/login/login.component';
import { adminAuthGuard } from './admin/guards/admin-auth.guard';

export const routes: Routes = [

    {path:'seller',component:SellerComponent, children:[
        {path:"profile",component:sellerProfile}
    ]},
    {path:'',component:CustomerComponent,children:[
        {path:"",component:CustomerHome},
        {path:"productdetails/:id",component:CustomerProductDetails},
        {path:"home",component:CustomerHome},
        {path:"products",redirectTo:"products/1",pathMatch:'full'},
        {path:"products/:page",component:CustomerProducts},
        {path:"profile",component:customerProfile},
        {path:"login",component:LoginComponent},
        {path:"register",component:RegisterComponent},
        {path:"about",component:AboutComponent},
        {path:"contact-us",component:ContactUsComponent},
        {path:"cart",component:CartComponent},
        {path:"checkout",component:CheckoutComponent},
    ]},
    {path: 'admin',children: [
            { path: 'login', component: AdminLoginComponent },
            {path: '',redirectTo: 'login',pathMatch: 'full'},
            {path: '',component: AdminComponent
              //  canActivate: [adminAuthGuard]
                ,children: [
                    { path: 'dashboard', component: DashboardComponent },
                    { path: 'products', component: ProductsComponent },
                    { path: 'profile', component: ProfileComponent }
                ]
            }
        ]
    }
];

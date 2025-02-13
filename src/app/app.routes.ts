import { Routes } from '@angular/router';
import { SellerComponent } from './seller/seller.component';
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
import { SellerLoginComponent } from './seller/seller-login/seller-login.component';
import { SellerDashboardComponent } from './seller/seller-dashboard/seller-dashboard.component';
import { SellerProductsComponent } from './seller/seller-products/seller-products.component';
import { SellerProfileComponent } from './seller/seller-profile/seller-profile.component';
import { ClerkComponent } from './admin/clerk/clerk.component';
import { authCustomerGuard } from './customer/authCustomer.guard';
import { SellersComponent } from './admin/sellers/sellers.component';
import { CashierComponent } from './admin/cashier/cashier.component';
import { authAdminGuard } from './admin/authAdmin.guard';
import { UpdateRequestsComponent } from './admin/update-requests/update-requests.component';
import { RoleComponent } from './admin/role/role.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { CategoryComponent } from './admin/category/category.component';
import { CustomerService } from './_models/customerservice';
import { CustomerserviceComponent } from './admin/customerservice/customerservice.component';
import { SellerRegisterComponent } from './seller/seller-register/seller-register.component';


export const routes: Routes = [

    {path: 'seller',children: [
        { path: 'login', component: SellerLoginComponent},
        {path: '',redirectTo: 'login',pathMatch: 'full'},
        { path:'register', component: SellerRegisterComponent},
        {path: '',component: SellerComponent
          //  canActivate: [adminAuthGuard]
            ,children: [
                { path: 'dashboard', component:SellerDashboardComponent },
                { path: 'products', component: SellerProductsComponent },
                { path: 'profile', component: SellerProfileComponent }
            ]
        }
    ]

},
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
        {path:"checkout",component:CheckoutComponent,canActivate:[authCustomerGuard]},
    ]},
    {path: 'admin',children: [
            { path: 'login', component: AdminLoginComponent },
            {path: '',redirectTo: 'dashboard',pathMatch: 'full'},
            {path: '',component: AdminComponent,
                canActivate:[authAdminGuard]
                ,children: [
                    { path: 'dashboard', component: DashboardComponent },
                    {path:'products',redirectTo:"products/1",pathMatch:'full'},
                    { path: 'products/:page', component: ProductsComponent },
                    { path: 'profile', component: ProfileComponent },
                    { path: 'cashier/:page', component: CashierComponent },
                    { path: 'clerks/:page', component: ClerkComponent },
                    {path:'clerks',redirectTo:"clerks/1",pathMatch:'full'},
                    { path: 'seller', redirectTo: '/seller/1', pathMatch: 'full' },
                    { path: 'seller/:page', component: SellersComponent },
                    { path: 'UpdateRequests', redirectTo: '/UpdateRequests/1', pathMatch: 'full' },
                    { path: 'UpdateRequests/:page', component: UpdateRequestsComponent },
                    { path: 'roles/:page', component: RoleComponent },
                    {path:'roles',redirectTo:"roles/1",pathMatch:'full'},
                    { path: 'order', redirectTo: '/order/1', pathMatch: 'full' },
                    { path: 'order/:page', component: OrdersComponent },
                    { path: 'category', redirectTo: '/category/1', pathMatch: 'full' },
                    { path: 'category/:page', component: CategoryComponent },
                    { path: 'customerservice', redirectTo: '/customerservice/1', pathMatch: 'full' },
                    { path: 'customerservice/:page', component: CustomerserviceComponent },

                ]
            }
        ]
    }
];

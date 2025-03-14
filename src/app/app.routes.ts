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
import { SellerLoginComponent } from './seller/seller-login/seller-login.component';
import { SellerDashboardComponent } from './seller/seller-dashboard/seller-dashboard.component';
import { ProductsComponent as SellerProductsComponent } from './seller/products/products.component';
import { SellerProfileComponent } from './seller/seller-profile/seller-profile.component';
import { ClerkComponent } from './admin/clerk/clerk.component';
import { authCustomerGuard } from './customer/authCustomer.guard';
import { SellersComponent } from './admin/sellers/sellers.component';
import { authAdminGuard } from './admin/authAdmin.guard';
import { UpdateRequestsComponent } from './admin/update-requests/update-requests.component';
import { RoleComponent } from './admin/role/role.component';
import { SellerOrdersComponent } from './seller/seller-orders/seller-orders.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { CategoryComponent } from './admin/category/category.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SellerRegisterComponent } from './seller/seller-register/seller-register.component';
import { CustomerserviceComponent } from './admin/customerservice/customerservice.component';
import { RequestSentComponent } from './seller/request-sent/request-sent.component';
import { authSellerGuard } from './seller/auth-seller.guard';
import { BranchesComponent } from './admin/branches/branches.component';
import { ClerkBranchComponent } from './admin/clerk-branch/clerk-branch.component';
import { ClerkComponent as clerkBranchComponent } from './clerk/clerk.component';
import { LoginComponent as clerkBranchLoginComponent } from './clerk/login/login.component';
import { ProductsBranchComponent } from './clerk/products-branch/products-branch.component';
import { authClerkBranchGuard } from './clerk/auth-clerk-branch.guard';
import { UpdateQtyRequestsService } from './admin/_services/UpdateQtyRequest.service';
import { QuantityUpdateRequestsComponent } from './admin/quantity-update-requests/quantity-update-requests.component';
import { CahierComponent as cashierComponent } from './clerk/cashier/cashier.component';
import { BranchOrdersComponent } from './clerk/branch-orders/branch-orders.component';
import { ProfileComponent as ClerkPofileComponent } from './clerk/profile/profile.component';

import { SuccessComponent } from './customer/payment/success/success.component';
import { FailedComponent } from './customer/payment/failed/failed.component';
import { ReceiptComponent } from './clerk/cashier/receipt/receipt.component';
import { UnauthorizedComponent } from './admin/unauthorized/unauthorized.component';
import { authorizationGuard } from './admin/authorization.guard';


export const routes: Routes = [

    {path: 'seller',title:"seller",children: [
        { path: 'login', component: SellerLoginComponent},
        {path: '',redirectTo: 'login',pathMatch: 'full'},
        {path:'register',component:SellerRegisterComponent},
        {path:'request',component:RequestSentComponent},
        {path: '',component: SellerComponent,
           canActivate: [authSellerGuard],
            children: [
                { path: 'dashboard', component:SellerDashboardComponent },
                { path: 'products/:page', component: SellerProductsComponent },
                { path: 'profile', component: SellerProfileComponent },
                { path: 'orders/:page', component: SellerOrdersComponent }
            ]
        },

    ]

},
    {path:'',title:"green house",component:CustomerComponent,children:[
        {path:'',component:CustomerHome},
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
        {path:"sucess",component:SuccessComponent},
        {path:"failed",component:FailedComponent},
        {path:"checkout",component:CheckoutComponent,canActivate:[authCustomerGuard]}
       // {path:"**",component:PageNotFoundComponent}

    ]},
    {path:'admin',title:"admin",children: [
            { path: 'login', component: AdminLoginComponent },
            { path: 'unauthorized', component: UnauthorizedComponent },
            {path: '',redirectTo: 'dashboard',pathMatch: 'full'},
            {path: '',component: AdminComponent,
                canActivate:[authAdminGuard,authorizationGuard]
                ,children: [
                    { path: 'dashboard', component: DashboardComponent },
                    {path:'products',redirectTo:"products/1",pathMatch:'full'},
                    { path: 'products/:page', component: ProductsComponent },
                    { path: 'profile', component: ProfileComponent },
                    { path: 'clerks/:page', component: ClerkComponent },
                    {path:'clerks',redirectTo:"clerks/1",pathMatch:'full'},
                    { path: 'seller', redirectTo: '/seller/1', pathMatch: 'full' },
                    { path: 'seller/:page', component: SellersComponent },
                    { path: 'UpdateRequests', redirectTo: '/UpdateRequests/1', pathMatch: 'full' },
                    { path: 'UpdateRequests/:page', component: UpdateRequestsComponent },
                    { path: 'roles/:page', component: RoleComponent,title:"Admin-Roles" },
                    {path:'roles',redirectTo:"roles/1",pathMatch:'full'},
                    { path: 'order', redirectTo: '/order/1', pathMatch: 'full' },
                    { path: 'order/:page', component: OrdersComponent },
                    { path: 'category', redirectTo: '/category/1', pathMatch: 'full' },
                    { path: 'category/:page', component: CategoryComponent },
                    { path: 'customerservice', redirectTo: '/customerservice/1', pathMatch: 'full' },
                    { path: 'customerservice/:page', component: CustomerserviceComponent },
                    { path: 'branch', redirectTo: '/branch/1', pathMatch: 'full' },
                    { path: 'branch/:page', component: BranchesComponent },
                    { path: 'clerkBranch', redirectTo: '/branch/1', pathMatch: 'full' },
                    { path: 'clerkBranch/:page', component: ClerkBranchComponent },
                    { path: 'UpdateQty', redirectTo: '/UpdateQty/1', pathMatch: 'full' },
                    { path: 'UpdateQty/:page', component: QuantityUpdateRequestsComponent },

                ]
            }
        ]
    },
    {path:'clerk',title:"clerk",children:[
        { path:'login', component:clerkBranchLoginComponent },
        {path: '',redirectTo: 'products/1',pathMatch: 'full'},
        {path:'',component:clerkBranchComponent,
            canActivate:[authClerkBranchGuard],
            children:[
                {path:'products',redirectTo:"/products/1",pathMatch:'full'},
                {path:'products/:page',component:ProductsBranchComponent},
                {path:'cashier/order/:page',component:cashierComponent},
                {path:'cashier/order/receipt/print',component:ReceiptComponent},
                {path:'orders',redirectTo:"/orders/1",pathMatch:'full'},
                {path:'orders/:page',component:BranchOrdersComponent},
                {path:'profile',component:ClerkPofileComponent},
            ]
        },

    ]},
    {path:"**",component:PageNotFoundComponent}

];

import { Component, Input } from '@angular/core';
import { Product } from '../../_models/product';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../_services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { AuthCustomerService } from '../_services/authCustomer.service';
import { ProductService } from '../_services/product.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-customer-product-item',
  imports: [RouterLink],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  @Input() product!: Product;

  constructor(private cartSer: CartService
    , private productService: ProductService
    , private authCustomerService: AuthCustomerService
    , public toastr: ToastrService
    ,private viewPortScroller:ViewportScroller
  ) { }

  addProductToCart(productId: string) {
    let toast = this.toastr
    console.log(productId)
    let customer_id = 1;
    let qty = 1;
    if (this.authCustomerService.isLoggedIn()) {
      if(this.product.qty<qty){
        this.toastr.error("can not add out of stock product to cart");
      }else{
      this.cartSer.addProductToCart({ productId, customer_id, qty }).subscribe({
        next: (e) => {
          console.log(e.data)
          if (e.data.success) {
            this.cartSer.updateCartRegisterdCustomerProductNum();
            this.viewPortScroller.scrollToPosition([0,0]);
            toast.success("Product Added To Cart");
          } else {
            console.log(e)
            toast.error(e.data.ErrorMsg)
          }
        }
      })
    }
    } else {

      let maxProductQty = this.product.qty;
      if (!(maxProductQty < qty)) {
        this.cartSer.updateProductToCartGuest({ productId, qty },'one');
        this.toastr.success("product added to cart");

      }else{
        this.toastr.error("can not add out of stock product to cart");
      }
    }
  }

}

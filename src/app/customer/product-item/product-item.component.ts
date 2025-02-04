import { Component,Input } from '@angular/core';
import { Product } from '../../_models/product';
import {Router, RouterLink} from '@angular/router';
import { CartService } from '../_services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-product-item',
  imports: [RouterLink],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
 @Input() product!:Product;

  constructor(private cartSer:CartService,public toastr: ToastrService){}

  addProductToCart(productId:string){
    let toast=this.toastr
    console.log(productId)
    let customer_id=1;
    let qty=1
    this.cartSer.addProductToCart({productId,customer_id,qty}).subscribe({
      next(e){
        console.log(e.data)
        if(e.data.success){
          console.log(e.data)
          toast.success("Product Added To Cart")
        }else{
          toast.error("e.data.ErrorMsg")
        }
       }
    })
  }

}

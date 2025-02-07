import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Cart } from 'src/app/_models/cart';
import { CartService } from '../_services/cart.service';
import { Product } from 'src/app/_models/product';
import { CartProduct } from 'src/app/_models/cart-product';
import { AuthService } from 'src/app/_services/auth.service';
import { AuthCustomerService } from '../_services/authCustomer.service';
import { ToastrService } from 'ngx-toastr';
import { DecimalPipe,CommonModule } from '@angular/common';




@Component({
  selector: 'app-cart',
  imports: [RouterOutlet, DecimalPipe,CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  data: Cart | null = null
  test: any
  newQty: number = 0;
  productMaxQty: { [productId: string]: number } = {};

in(){

}

  constructor(public cartSer: CartService ,private toastr:ToastrService, private authCustomerService: AuthCustomerService,private route:Router ) { }

  ngOnInit(): void {
    if (this.authCustomerService.isLoggedIn()) {
      this.cartSer.getCart().subscribe(e => {
        console.log(e);
        this.data = e
        this.data.Total = 0
        e.product.forEach(p => {
          this.data!.Total += ((+p.price) * (+p.qty))
        })

      })
    } else {

      this.cartSer.getCartGuest().subscribe(guestCart => {
        if (guestCart.length > 0) {
          this.data = new Cart('', '', [], '', new Date(), new Date(), 0);
          guestCart.forEach(item => {
            const updatedQty = item.productDetails.qty > item.qty ? item.qty : item.productDetails.qty;
            if (updatedQty > 0) {
              this.data!.product.push({
                product_id: item.productId,
                seller_id: item.productDetails.seller_id,
                name: item.productDetails.name,
                qty: updatedQty,
                price: item.productDetails.price,
                _id: item.productDetails._id,
                pic_path: item.productDetails.pics
              });

              this.productMaxQty[item.productId] = item.productDetails.qty;
              this.data!.Total += (+item.productDetails.price) * (+updatedQty);
            }
          });
        }
      })
    }

  }

  IncreaseDecrease(data: CartProduct, num: number, inputElement: HTMLInputElement) {
    this.newQty = (data.qty) + num
    let CustomerId = "1";
    let ProductId = data.product_id;
    let NewQuantity = this.newQty;


    if (this.authCustomerService.isLoggedIn()) {
      this.cartSer.UpdateQty({ CustomerId, ProductId, NewQuantity }).subscribe({
        next:(e)=> {
          if (e.data.success) {
            data.qty = e.data.newQty;
            if(num==-1)
              this.data!.Total-=data.price
            else
            this.data!.Total+=data.price

          } else {
            data.qty = data.qty
            this.toastr.error(e.data.ErrorMsg)
          }
          console.log(e.data)
        }

      })
    }
    else {
      if (NewQuantity < 1) {
        NewQuantity = 1;
      } else if (NewQuantity > this.productMaxQty[ProductId]) {
        NewQuantity = this.productMaxQty[ProductId]
      }
      this.cartSer.updateProductToCartGuest({ productId: ProductId, qty: NewQuantity }, 'more');
      var productSelected = this.data?.product.find(p => p.product_id == ProductId);
      if (productSelected) {
        productSelected.qty = NewQuantity;
        this.data!.Total = this.data?.product.reduce((total, product) => {
          return total + (product.qty * product.price);
        }, 0) ?? 0;
      }
    }



  }
  UpdateQty(data: CartProduct, num: number) {
    this.newQty = num
    let CustomerId = "1";
    let ProductId = data.product_id;
    let NewQuantity = this.newQty;
    this.cartSer.UpdateQty({ CustomerId, ProductId, NewQuantity }).subscribe({
      next(e) {
        if (e.data.success) {
          data.qty = e.data.newQty
        } if (!e.data.success) {
          console.log("HOLa From Here False ")
          console.log(data.qty)

          data.qty = data.qty

        }
        console.log(e.data)
      }

    })
  }

  removeFromCart(product_id: string,price:number,qty:number) {

    if (this.authCustomerService.isLoggedIn()) {
      let CustomerId = "1";
      this.cartSer.deleteProductFromCart({productID:product_id,CustomerId}).subscribe({
        next:(e)=>{
          if(e.data.success){
            this.data!.product=this.data!.product.filter(p=>p.product_id!=product_id)
            this.data!.Total-=(price*qty)
            this.toastr.success("Product Deleted")  
          }else{
            this.toastr.error(e.data.ErrorMsg)
          }
        }
      })

    } else {
      this.cartSer.removeProductFromCartGuest(product_id);
      if (this.data) {
        this.data.product = this.data?.product.filter(p => p.product_id != product_id);
        this.data!.Total-=(price*qty)
        console.log(this.data.Total);
      }
    }
    this.cartSer.updateCartRegisterdCustomerProductNum()
  }

  porceedToCheckout(){
    if(!this.authCustomerService.isLoggedIn()){
      let cartGuest=this.data?.product;
     // console.log(cartGuest);
      localStorage.setItem('cart',JSON.stringify(cartGuest));
    } 
    this.route.navigate(['checkout']);
  }

 
  
}

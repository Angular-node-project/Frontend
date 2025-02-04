import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Cart } from 'src/app/_models/cart';
import { CartService } from '../_services/cart.service';
import { Product } from 'src/app/_models/product';
import { CartProduct } from 'src/app/_models/cart-product';
import { AuthService } from 'src/app/_services/auth.service';



@Component({
  selector: 'app-cart',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  data:Cart|null=null
  test:any
  newQty:number=0;



  constructor(public cartSer:CartService,private auth:AuthService){}
  ngOnInit(): void {

    this.cartSer.getCart().subscribe(e=>{
      this.data=e
      this.data.Total=0
      e.product.forEach(p=>{
        this.data!.Total+=((+p.price)*(+p.qty))
      })

    })
    console.log(this.auth.getLoggedInId("customer"))
  }
  get(){
    console.log(this.data)
  }

  IncreaseDecrease(data:CartProduct,num:number){
    this.newQty=(data.qty)+num
    console.log(data)
    console.log(data.qty)
    console.log(num)
    console.log(this.newQty)

    let CustomerId="1";
    let ProductId=data.product_id;
    let NewQuantity=this.newQty;
    this.cartSer.UpdateQty({CustomerId,ProductId,NewQuantity}).subscribe({
     next(e){
      if(e.data.success){
        data.qty=e.data.newQty
      }else{
        data.qty=data.qty
      }
      console.log(e.data)
     }

    })
  }
  UpdateQty(data:CartProduct,num:number){
    this.newQty=num
    console.log(data)
    console.log(data.qty)
    console.log(num)
    console.log(this.newQty)


    let CustomerId="1";
    let ProductId=data.product_id;
    let NewQuantity=this.newQty;
    this.cartSer.UpdateQty({CustomerId,ProductId,NewQuantity}).subscribe({
     next(e){
      if(e.data.success){
        data.qty=e.data.newQty
      }if(!e.data.success){
          console.log("HOLa From Here False ")
          console.log(data.qty)

          data.qty=data.qty

      }
      console.log(e.data)
     }

    })
  }


}

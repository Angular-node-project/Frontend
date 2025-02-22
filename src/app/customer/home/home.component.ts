import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from '../_core/header/header.component';
import { ProductItemComponent } from "../product-item/product-item.component";
import { ProductService } from '../_services/product.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/_models/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-customer-home',
  imports: [HeaderComponent, ProductItemComponent ,CommonModule, FormsModule ,RouterLink] ,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit ,OnDestroy {
  constructor(private productService:ProductService){}
  sub!:Subscription;
  products:Product[]=[];

  ngOnInit(): void {
     this.sub=this.productService.getTopNewThreeProducts().subscribe({
        next:(res)=>{
          this.products=res.data;
        },error:(err)=>{
          console.log(err);
        },
     })

  }
  ngOnDestroy(): void {
    if(this.sub){
      this.sub.unsubscribe();
    }
  }

}

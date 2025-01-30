import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../_services/product.service';
import { Product } from '../_models/product';
import { ActivatedRoute } from '@angular/router';
import { Response } from '../_models/response';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  constructor(private productService: ProductService ,private route:ActivatedRoute) { }

  selectedProduct!:Product;
  sub!:Subscription;
  images:{src:string ,alt:string,active:boolean}[]=[];
  selectedImage!:{src:string ,alt:string,active:boolean};
  activeTab = 'description';


  ngOnInit(): void {
    this.route.paramMap.subscribe(param=>{
      const id=param.get('id');
      if(id){
        this.getProductDetails(id);
      }
    })    
  }
  getProductDetails(id:string){
   this.sub=this.productService.getProductDetails(id).subscribe(response=>{
      this.selectedProduct=response.data;
      if(response.data.pics && response.data.pics.length > 0){
        this.images=response.data.pics.map((pic,index)=>({
          src: pic,  
          alt: `Product Image ${index + 1}`,
          active: index === 0 
        }))
      }
      this.selectedImage=this.images[0];
   
    })
  }

 

  selectImage(image: any) {
    this.images.forEach(img => img.active = false);
    image.active = true;
    this.selectedImage = image;
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
  ngOnDestroy(): void {
    if(this.sub){
      this.sub.unsubscribe()
    }
  }
}

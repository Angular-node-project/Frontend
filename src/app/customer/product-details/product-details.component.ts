import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../_services/product.service';
import { Product } from '../../_models/product';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Response } from '../../_models/response';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CartService } from '../_services/cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-customer-product-details',
  imports: [CommonModule, RouterLink,FormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
  host: {
    'class': 'app-customer-product-details'
  }
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  constructor(private productService: ProductService, private route: ActivatedRoute,private cartSer:CartService,public toastr: ToastrService) {
    // Add Font Awesome CSS
    const link = document.createElement('link');
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }

  selectedProduct!: Product;
  sub!: Subscription;
  images: { src: string, alt: string, active: boolean }[] = [];
  selectedImage!: { src: string, alt: string, active: boolean };
  activeTab = 'description';
  rating: number = 0;
  hoverRating: number = 0;
  review: string = '';
  initialQty="1";

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      const id = param.get('id');
      if (id) {
        this.getProductDetails(id);
      }
    })
  }
  getProductDetails(id: string) {
    this.sub = this.productService.getProductDetails(id).subscribe(response => {
      this.selectedProduct = response.data;
      if (response.data.pics && response.data.pics.length > 0) {
        this.images = response.data.pics.map((pic, index) => ({
          src: pic,
          alt: `Product Image ${index + 1}`,
          active: index === 0
        }))
      }
      this.selectedImage = this.images[0];
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
  setRating(rating: number) {
    this.rating = rating;
  }
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe()
    }
  }

  addProductToCart(productId:string,qty:string){
      let Qty=+qty;
      let toast=this.toastr
      let customer_id=1;
      if(Qty<=0){
        console.log("Quantity must be Positive number bigger than 0")
      }else{
        this.cartSer.addProductToCart({productId,customer_id,qty}).subscribe({
          next(e){
            if(e.data.success){
              console.log(e.data)
              toast.success("Product Added To Cart")
            }else{
              toast.error(e.data.ErrorMsg)
              // toast.error("Error")
            }
           }
        })
      }
    
  }

  //* To reset Quantity Input if one insert value below or equal to 0
  resetQty(inQty:string){
    if(+inQty<=0)
      this.initialQty="1"
  }



}

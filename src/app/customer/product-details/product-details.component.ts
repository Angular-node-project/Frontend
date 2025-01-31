import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../_services/product.service';
import { Product } from '../../_models/product';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Response } from '../../_models/response';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-product-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
  host: {
    'class': 'app-customer-product-details'
  }
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  constructor(private productService: ProductService, private route: ActivatedRoute) {
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
}

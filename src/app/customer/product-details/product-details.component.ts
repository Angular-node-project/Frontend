import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  selectedImage = 'customer/imgs/plants-ecommerce-product-featured-img-6.jpg';
  activeTab = 'description';
  
  images = [
    {
      src: 'customer/imgs/plants-ecommerce-product-featured-img-6.jpg',
      alt: 'Ficus Decora Cabernet Main',
      active: true
    },
    {
      src: 'customer/imgs/plants-ecommerce-product-featured-img-6.jpg',
      alt: 'Ficus Decora Cabernet Side',
      active: false
    },
    {
      src: 'customer/imgs/plants-store-gallery-img-1.jpg',
      alt: 'Ficus Decora Cabernet Detail',
      active: false
    }
  ];

  selectImage(image: any) {
    this.images.forEach(img => img.active = false);
    image.active = true;
    this.selectedImage = image.src;
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}

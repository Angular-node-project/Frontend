import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/products.services';
import { Product } from 'src/app/_models/product';
import { CommonModule, ViewportScroller } from '@angular/common';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

//*

@Component({
  selector: 'app-cashier',
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './cashier.component.html',
  styleUrl: './cashier.component.css'
})
export class CashierComponent implements OnInit {



  selectedProduct: any = null;
  products: Product[] = [];
  totalResults: number = 0;
  totalPages !: number;
  isLoading: boolean = true;
  selectedSort: string = '';
  selectedCategory: string = '';
  status: string = ''
  search: string = ''
  sub!: Subscription;
  currentPage = 1;


constructor( private productservice: ProductService,private viewPortScroller: ViewportScroller,private route: ActivatedRoute){}

ngOnInit() {
  this.sub = this.route.paramMap.subscribe(params => {
    this.currentPage = +params.get('page')!;
    console.log(this.currentPage);
    this.loadProducts(this.currentPage);
  });

  // Initialize Bootstrap dropdowns
  import('bootstrap').then(bootstrap => {
    const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
    dropdownElementList.forEach(dropdownToggle => {
      new bootstrap.Dropdown(dropdownToggle);
    });
  });
  this.selectedProduct = this.selectedProduct || { name: '', categories: '', description: '', qty: 0, price: 0, seller: { name: '' } };

}







  loadProducts(page: number): void {
    this.productservice.getAllProducts(page, this.selectedSort, this.selectedCategory, this.status, this.search).subscribe({
      next: (response) => {
        this.products = response.data.products;
        this.totalPages = response.data.totalPages;
        this.totalResults = response.data.totalProductsCount;
        this.scrollToTop();
        this.isLoading = false;
      },
      error: () => {
        console.log('Error loading products');
        this.isLoading = true;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  scrollToTop(): void {
    this.viewPortScroller.scrollToPosition([0, 0])
  }

  changeSearch(name: string): void {
    this.search = name;
    this.currentPage = 1;
    this.loadProducts(this.currentPage)
  }





}

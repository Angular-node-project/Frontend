import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from "../product-item/product-item.component";
import { ProductService } from '../_services/product.service';
import { Product } from '../../_models/product';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/_models/category';

@Component({
  selector: 'app-customer-all-products',
  imports: [ProductItemComponent, CommonModule, RouterLink],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css'
})
export class AllProductsComponent implements OnInit, OnDestroy {
  constructor(private productService: ProductService, private route: ActivatedRoute, private viewPortScroller: ViewportScroller) { }
  products: Product[] = [];
  categories: Category[] = [];
  selectedCategory: string = '';
  selectedSort: string = '';
  currentPage = 1;
  totalPages !: number;
  pageNumbers: number[] = [];
  totalResults: number = 0;
  pageSize: number = 6;
  sub!: Subscription

  ngOnInit(): void {

    this.sub = this.route.paramMap.subscribe(params => {
      this.currentPage = +params.get('page')!;
      console.log(this.currentPage);
      this.loadProducts(this.currentPage);
      this.loadCategories();  
    });
  }

  loadProducts(page: number): void {

    this.productService.getActiveProducts(page,this.selectedSort,this.selectedCategory).subscribe(response => {
      this.products = response.data.products;
      this.totalPages = response.data.totalPages;
      this.totalResults = response.data.totalProductsCount;
      this.generatePageNumbers();
      this.scrollToTop()
    });
  }
  loadCategories(): void {
    this.productService.getActiveCategories().subscribe(response => {
      this.categories = response.data;
    })
  }
  generatePageNumbers(): void {
    this.pageNumbers = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pageNumbers.push(i);
    }
  }
  getStartIndex(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  getEndIndex(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalResults);
  }
  scrollToTop(): void {
    this.viewPortScroller.scrollToPosition([0, 0])
  }
  onCategoryChange(event: Event): void {
    this.selectedCategory = (event.target as HTMLSelectElement).value;
    this.loadProducts(this.currentPage);
  }
  onSortChange(event: Event): void {
    this.selectedSort = (event.target as HTMLSelectElement).value;
    this.loadProducts(this.currentPage);
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}

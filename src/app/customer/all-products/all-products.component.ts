import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from "../product-item/product-item.component";
import { ProductService } from '../_services/product.service';
import { Product } from '../_models/product';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-customer-all-products',
  imports: [ProductItemComponent, CommonModule, RouterLink],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css'
})
export class AllProductsComponent implements OnInit {
  constructor(private productService: ProductService, private route: ActivatedRoute ,private viewPortScroller:ViewportScroller) { }
  products: Product[] = [];
  currentPage = 1;
  totalPages !: number;
  pageNumbers: number[] = [];
  totalResults:number=0;
  pageSize:number=6;

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.currentPage = +params.get('page')!;
      console.log(this.currentPage);
      this.loadProducts(this.currentPage);
    });
  }

  loadProducts(page: number): void {

    this.productService.getActiveProducts(page).subscribe(response => {
      this.products = response.data.products;
      this.totalPages = response.data.totalPages;
      this. totalResults=response.data.totalProductsCount;
      this.generatePageNumbers();
      this.scrollToTop()
    });
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
  scrollToTop():void{
   this.viewPortScroller.scrollToPosition([0,0])
  }

}

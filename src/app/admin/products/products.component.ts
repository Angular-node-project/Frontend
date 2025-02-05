import { CommonModule } from '@angular/common';
import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { AddUpdateComponent } from "./add-update/add-update.component";
import { SideBarComponent } from '../side-bar/side-bar.component';
import { ProductService } from '../_services/products.services';
import { Product } from 'src/app/_models/product';
import { Category } from 'src/app/_models/category';
import { Subscription } from 'rxjs';

export declare const bootstrap: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  imports: [AddUpdateComponent, CommonModule]
})
export class ProductsComponent implements OnInit {
  @ViewChild(AddUpdateComponent) addUpdateComponent!: AddUpdateComponent;
  @ViewChild(SideBarComponent) sidebarComponent!: SideBarComponent;
  selectedProduct: any = null;
  isEditMode: boolean = false;
  productToDelete: number | null = null;
  isLoading: boolean = true;
    products: Product[] = [];
    categories: Category[] = [];
    selectedCategory: string = '';
    selectedSort: string = '';
    currentPage = 1;
    totalPages !: number;
    pageNumbers: number[] = [];
    totalResults: number = 0;
    pageSize: number = 6;
    sub!: Subscription;
    status:string=''
    isSidebarOpen=true

  constructor(private productservice:ProductService) {
    // this.products = [
    //   { id: 1, name: 'Test Product', category: 'Test', description: 'Test Description ', quantity: 10, price: 100, sellerId: '1', status: 'active' }
    // ];
  }

  ngOnInit() {
    if (this.sidebarComponent) {
      this.sidebarComponent.sidebarState$.subscribe(
        state => this.isSidebarOpen = state
      );
    }
    // Initialize Bootstrap dropdowns
    import('bootstrap').then(bootstrap => {
      const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
      dropdownElementList.forEach(dropdownToggle => {
        new bootstrap.Dropdown(dropdownToggle);
      });
    });
  }
  loadProducts(page: number): void {
    this.productservice.getAllProducts(page,this.selectedSort, this.selectedCategory,this.status).subscribe({
      next: (response) => {
        this.products = response.data.products;
        this.totalPages = response.data.totalPages;
        this.totalResults = response.data.totalProductsCount;
        this.generatePageNumbers();

        this.isLoading=false;
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

  generatePageNumbers(): void {
    this.pageNumbers = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pageNumbers.push(i);
    }
  }



  addNewProduct() {
   this.isEditMode = false;
    this.selectedProduct = {};
    // Show the modal
    const modalElement = document.getElementById('productModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  ngAfterViewInit() {
    console.log('AddUpdateComponent:', this.addUpdateComponent);
  }

  onUpdate(product: any) {
    this.isEditMode = true;
    this.selectedProduct = { ...product };
    // Show the modal
    const modalElement = document.getElementById('productModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  onSaveProduct(product: any) {
    if (this.isEditMode) {


    } else {
      const newProduct = {
        ...product,
        id: this.products.length + 1,
        status: 'Active'
      };
      this.products.push(newProduct);
    }

    // Close modal first
    const modalElement = document.getElementById('productModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }

    // Then reset the form
    this.selectedProduct = {};
    this.isEditMode = false;
  }

  resetForm() {
    this.selectedProduct = {};
    this.isEditMode = false;
  }

  onDelete(productId: number) {
    this.productToDelete = productId;
    const modalElement = document.getElementById('deleteModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  confirmDelete() {
    if (this.productToDelete) {

      const modalElement = document.getElementById('deleteModal');
      if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
      }
      this.productToDelete = null;
    }
  }

  changeStatus(i: number, newStatus: string): void {

    console.log('Status updated to:', newStatus);
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      // Add your logic to fetch data for the new page
    }
  }
}

import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, ViewChild, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AddUpdateComponent } from "./add-update/add-update.component";
import { SideBarComponent } from '../side-bar/side-bar.component';
import { ProductService } from '../_services/products.services';
import { Product } from 'src/app/_models/product';
import { Category } from 'src/app/_models/category';
import { Subscription } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../_services/category.service';
import { HasPermissionDirective } from '../_directives/has-permission.directive';

export declare const bootstrap: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  imports: [AddUpdateComponent, CommonModule, FormsModule, RouterLink,HasPermissionDirective]
})
export class ProductsComponent implements OnInit {
  @ViewChild(AddUpdateComponent) addUpdateComponent!: AddUpdateComponent;
  @ViewChild(SideBarComponent) sidebarComponent!: SideBarComponent;
  selectedProduct: any = null;
  isEditMode: boolean = false;
  productToDelete: string | null = null;
  isLoading: boolean = true;
  products: Product[] = [];
  selectedCategory: string = '';
  selectedSort: string = '';
  currentPage = 1;
  totalPages !: number;
  pageNumbers: number[] = [];
  totalResults: number = 0;
  pageSize: number = 6;
  sub!: Subscription;
  status: string = ''
  search: string = ''
  @Input() isSidebarOpen = false;
  constructor(
    private productservice: ProductService
    , private route: ActivatedRoute
    , private viewPortScroller: ViewportScroller
    , private toastr: ToastrService
    
  ) {

  }


  ngOnInit() {
    this.sub = this.route.paramMap.subscribe(params => {
      this.currentPage = +params.get('page')!;
      console.log(this.currentPage);
      this.loadProducts(this.currentPage);
    });
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


  changeStatus(i: string, newStatus: string): void {

    this.productservice.changeStatus(i, newStatus).subscribe({
      next: (response) => {
        this.loadProducts(this.currentPage);
        console.log('Status updated to:', newStatus);
        this.toastr.success("status changed successfully");

      },
      error: (err) => {
        console.error('Error updating status:', err);
        this.toastr.error(err.error.message);
      }
    });

  }

  changeSearch(name: string): void {
    this.search = name;
    this.currentPage = 1;
    this.loadProducts(this.currentPage)
  }

  onDelete(productId: string) {
    this.productToDelete = productId;
    const modalElement = document.getElementById('deleteModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  confirmDelete() {
    if (this.productToDelete) {
      this.changeStatus(this.productToDelete, 'deleted');
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

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }


  ngAfterViewInit() {
    if (this.sidebarComponent) {
      this.sidebarComponent.sidebarState$.subscribe(
        state => this.isSidebarOpen = state
      );
    }
  }


  addNewProduct() {
    this.isEditMode = false;
    this.selectedProduct = {
      name: '',
      categories: [],
      description: '',
      qty: 0,
      price: 0,
      seller_id: ''
    };
    const modalElement = document.getElementById('productModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  onSaveProduct(product: any) {
    const modalElement = document.getElementById('productModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
    this.loadProducts(this.currentPage);
  }

  onUpdate(product: any) {
    this.selectedProduct = { ...product };
    this.isEditMode = true;
    const modalElement = document.getElementById('productModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  resetForm() {
    this.selectedProduct = {};
    this.isEditMode = false;
  }


  scrollToTop(): void {
    this.viewPortScroller.scrollToPosition([0, 0])
  }

}

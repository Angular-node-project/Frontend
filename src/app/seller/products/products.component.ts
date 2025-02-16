import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { AddUpdateComponent } from "./add-update/add-update.component";
import { SellerSideBarComponent } from '../seller-side-bar/seller-side-bar.component';
import { ProductsService } from '../_services/products.service';
import { Product } from 'src/app/_models/product';
import { Subscription } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthSellerService } from '../_services/authSeller.service';

export declare const bootstrap: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  imports: [AddUpdateComponent, CommonModule, FormsModule, RouterLink]
})
export class ProductsComponent implements OnInit {
  @ViewChild(AddUpdateComponent) addUpdateComponent!: AddUpdateComponent;
  @ViewChild(SellerSideBarComponent) SellerSideBarComponent!: SellerSideBarComponent;
  selectedProduct: any = null;
  isEditMode: boolean = false;
  productToDelete: string | null = null;
  isLoading: boolean = true;
  products: Product[] = [];
  selectedCategory: string = '';
  selectedSort: string = '';
  currentPage = 1;
  totalPages!: number;
  pageNumbers: number[] = [];
  totalResults: number = 0;
  pageSize: number = 6;
  sub!: Subscription;
  status: string = '';
  search: string = '';
  @Input() isSidebarOpen = false;

  constructor(
    private ProductsService: ProductsService,
    private route: ActivatedRoute,
    private viewPortScroller: ViewportScroller,
    private toastr: ToastrService,
    private AuthSellerService: AuthSellerService
  ) { }

  ngOnInit() {
    this.sub = this.route.paramMap.subscribe(params => {
      this.currentPage = +params.get('page')!;
      this.loadProducts(this.currentPage);
    });
    if (this.SellerSideBarComponent) {
      this.SellerSideBarComponent.sidebarState$.subscribe(
        state => this.isSidebarOpen = state
      );
    }
    import('bootstrap').then(bootstrap => {
      const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
      dropdownElementList.forEach(dropdownToggle => {
        new bootstrap.Dropdown(dropdownToggle);
      });
    });
    this.selectedProduct = this.selectedProduct || { name: '', categories: '', description: '', qty: 0, price: 0};
  }

  loadProducts(page: number): void {
    this.ProductsService.getProductsBySellerPaginated(this.AuthSellerService.getLoggedInId(),page,this.pageSize, this.selectedSort, this.selectedCategory, this.status, this.search).subscribe({
      next: (response) => {
        console.log(response);
        this.products = response.data.products;
        this.totalPages = response.data.totalPages;
        this.totalResults = response.data.totalProductsCount;
        this.scrollToTop();
        this.isLoading = false;
        console.log(response.data);
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

    this.ProductsService.changeStatus(i, newStatus).subscribe({
      next: (response) => {
        this.loadProducts(this.currentPage);
        console.log('Status updated to:', newStatus);
        this.toastr.success("status changed successfully");

      },
      error: (err) => {
        console.error('Error updating status:', err);
        this.toastr.error("something went wrong");
      }
    });

  }

  changeSearch(name: string): void {
    this.search = name;
    this.currentPage = 1;
    this.loadProducts(this.currentPage);
  }

  

 

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  ngAfterViewInit() {
    if (this.SellerSideBarComponent) {
      this.SellerSideBarComponent.sidebarState$.subscribe(
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
      seller_id: this.AuthSellerService.getLoggedInId()
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
    this.viewPortScroller.scrollToPosition([0, 0]);
  }
}
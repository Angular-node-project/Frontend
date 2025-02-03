import { CommonModule } from '@angular/common';
import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { AddUpdateComponent } from "./add-update/add-update.component";
import { SidebarService } from '../services/sidebar.service';

declare const bootstrap: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  imports: [AddUpdateComponent,CommonModule]
})
export class ProductsComponent implements OnInit {
  @ViewChild(AddUpdateComponent) addUpdateComponent!: AddUpdateComponent;
  products: any[] = [];
  selectedProduct: any = null;
  isEditMode: boolean = false;
  productToDelete: number | null = null;
  currentPage = 1;
  totalPages = 5; // Update this based on your actual data
  @Input() isSidebarOpen = false;

  constructor(private sidebarService: SidebarService) {
    this.products = [
      { id: 1, name: 'Test Product', category: 'Test', description: 'Test Description ', quantity: 10, price: 100, sellerId: '1', status: 'Active' }
    ];
  }

  ngOnInit() {
    this.sidebarService.sidebarState$.subscribe(
      state => this.isSidebarOpen = state
    );
    // Initialize Bootstrap dropdowns
    import('bootstrap').then(bootstrap => {
      const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
      dropdownElementList.forEach(dropdownToggle => {
        new bootstrap.Dropdown(dropdownToggle);
      });
    });
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
      const index = this.products.findIndex(p => p.id === product.id);
      if (index !== -1) {
        this.products[index] = { ...product, status: this.products[index].status };
      }
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
      this.products = this.products.filter(product => product.id !== this.productToDelete);
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
    this.products[i].status = newStatus;
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

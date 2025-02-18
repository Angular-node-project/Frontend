import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { Order } from 'src/app/_models/order';
import { Subscription } from 'rxjs';
import { OrderService } from '../_services/order.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, ViewportScroller } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { ProcessComponent } from './process/process.component';
export declare const bootstrap: any;
@Component({
  selector: 'app-orders',
  imports: [FormsModule, CommonModule, RouterLink, ProcessComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  @ViewChild(SideBarComponent) sidebarComponent!: SideBarComponent;
  orders: Order[] = []
  isEditMode: boolean = false;
  OrderToDelete: string | null = null;
  isLoading: boolean = true;
  selectedSort: string = '';
  currentPage = 1;
  totalPages !: number;
  pageNumbers: number[] = [];
  totalResults: number = 0;
  pageSize: number = 6;
  sub!: Subscription;
  status: string = '';
  governorate: string = '';
  selectedOrder!: Order;
 
  @Input() isSidebarOpen = false;

  constructor(private orderService: OrderService, private route: ActivatedRoute, private viewPortScroller: ViewportScroller, private toastr: ToastrService) {

  }
  loadOrders(page: number) {
    this.orderService.getAllOrders(page, this.selectedSort, this.status, this.governorate).subscribe({
      next: (response) => {
        this.orders = response.data.orders;
        this.totalPages = response.data.totalPages;
        this.totalResults = response.data.totalProductsCount;
        this.generatePageNumbers();
        this.scrollToTop();
        this.isLoading = false;
      },
      error: () => {
        console.log("error loading orders");
      }
    })
  }
  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe(params => {
      this.currentPage = +params.get('page')!;
      this.loadOrders(this.currentPage);
    });
    import('bootstrap').then(bootstrap => {
      const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
      dropdownElementList.forEach(dropdownToggle => {
        new bootstrap.Dropdown(dropdownToggle);
      });
    });
  }



  changeSearch(gover: string) {
    this.governorate = gover;
    this.currentPage = 1;
    this.loadOrders(this.currentPage)
  }
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadOrders(this.currentPage)
    }
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
  generatePageNumbers(): void {
    this.pageNumbers = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pageNumbers.push(i);
    }
  }
  changeStatus(id: string, status: string) {
    this.orderService.changeStatus(id, status).subscribe({
      next: (response) => {
        this.loadOrders(this.currentPage);
        this.toastr.success("Status Changed Successfully");
      }
      ,
      error: (err) => {
        console.error('Error updating status:', err);
      }
    })
  }

  confirmDelete() {
    if (this.OrderToDelete) {
      this.changeStatus(this.OrderToDelete, 'cancelled');
      const modalElement = document.getElementById('deleteModal');
      if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
      }
      this.OrderToDelete = null;
    }
  }
  onDelete(orderId: string) {
    this.OrderToDelete = orderId;
    const modalElement = document.getElementById('deleteModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
  ngAfterViewInit() {
    if (this.sidebarComponent) {
      this.sidebarComponent.sidebarState$.subscribe(
        state => this.isSidebarOpen = state
      );
    }
  }
  scrollToTop(): void {
    this.viewPortScroller.scrollToPosition([0, 0])
  }

  onSaveQty(event: any) {
    const modalElement = document.getElementById('orderProcessModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
      this.loadOrders(this.currentPage);
    }
  }
  
  process(order: Order) {
    this.selectedOrder=order;
    const modalElement = document.getElementById('orderProcessModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
  openEditModal(order: Order) {
    this.selectedOrder = order;
    console.log("Opening modal for order:", this.selectedOrder);

    const modalElement = document.getElementById('orderDetailsModal');
    if (!modalElement) {
      console.error('Modal element not found!');
      return;
    }
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
  
}

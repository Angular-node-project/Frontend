import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SellerSideBarComponent } from '../seller-side-bar/seller-side-bar.component';
import { Order } from 'src/app/_models/order';
import { Subscription } from 'rxjs';
import { OrdersService } from '../_services/orders.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, ViewportScroller } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { AuthSellerService } from '../_services/authSeller.service';

@Component({
  selector: 'app-seller-orders',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './seller-orders.component.html',
  styleUrl: './seller-orders.component.css'
})
export class SellerOrdersComponent implements OnInit {
  @ViewChild(SellerSideBarComponent) SellerSideBarComponent!: SellerSideBarComponent;
  orders: Order[] = [];
  isEditMode: boolean = false;
  OrderToDelete: string | null = null;
  isLoading: boolean = true;
  selectedSort: string = '';
  currentPage = 1;
  totalPages!: number;
  pageNumbers: number[] = [];
  totalResults: number = 0;
  pageSize: number = 6;
  sub!: Subscription;
  status: string = '';
  governorate: string = '';
  @Input() isSidebarOpen = false;

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    private viewPortScroller: ViewportScroller,
    private toastr: ToastrService,
    private AuthSellerService: AuthSellerService
  ) {}

  loadOrders(page: number) {
    const sellerId = this.AuthSellerService.getLoggedInId();
    this.ordersService.getOrdersBySellerId(sellerId, page, this.pageSize).subscribe({
      next: (response) => {
        this.orders = response.data.orders;
        this.totalPages = response.data.totalPages;
        this.totalResults = response.data.totalProductsCount;
        this.generatePageNumbers();
        this.scrollToTop();
        this.isLoading = false;
      },
      error: () => {
        console.log('error loading orders');
      }
    });
  }

  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe((params) => {
      this.currentPage = +params.get('page')!;
      console.log(this.currentPage);
      this.loadOrders(this.currentPage);
    });
    import('bootstrap').then((bootstrap) => {
      const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
      dropdownElementList.forEach((dropdownToggle) => {
        new bootstrap.Dropdown(dropdownToggle);
      });
    });
  }

  changeSearch(gover: string) {
    this.governorate = gover;
    this.currentPage = 1;
    this.loadOrders(this.currentPage);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadOrders(this.currentPage);
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

  ngAfterViewInit() {
    if (this.SellerSideBarComponent) {
      this.SellerSideBarComponent.sidebarState$.subscribe(
        (state) => (this.isSidebarOpen = state)
      );
    }
  }

  scrollToTop(): void {
    this.viewPortScroller.scrollToPosition([0, 0]);
  }
}

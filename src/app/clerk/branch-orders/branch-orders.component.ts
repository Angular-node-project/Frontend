import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProcessComponent } from 'src/app/admin/orders/process/process.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { branchorders } from 'src/app/_models/branchorder';
import { Subscription } from 'rxjs';
import { BranchOrderService } from '../_services/branchorder.service';
import { ToastrService } from 'ngx-toastr';
import { AuthClerkBranchService } from '../_services/authClerk.service';
export declare const bootstrap: any;
@Component({
  selector: 'app-branch-orders',
  imports: [FormsModule, CommonModule, RouterLink, ProcessComponent],
  templateUrl: './branch-orders.component.html',
  styleUrl: './branch-orders.component.css'
})
export class BranchOrdersComponent implements OnInit {
 @ViewChild(SideBarComponent) sidebarComponent!: SideBarComponent;
  branchorders: branchorders[] = []
  isEditMode: boolean = false;
  isLoading: boolean = true;
  currentPage = 1;
  totalPages !: number;
  pageNumbers: number[] = [];
  totalResults: number = 0;
  pageSize: number = 6;
  sub!: Subscription;
  sub1!: Subscription;
  status: string = '';
  search: string = '';
  branch_id:string='';
  selectedBranchOrder!:branchorders;
  selectedType: string = "";

  @Input() isSidebarOpen = false;

  constructor(private authservice:AuthClerkBranchService, private orderBranchService: BranchOrderService, private route: ActivatedRoute, private viewPortScroller: ViewportScroller, private toastr: ToastrService) {

  }
  loadBranchOrders(page: number) {
    this.orderBranchService.getAllOrderBranches(page, this.branch_id, this.status, this.search).subscribe({
      next: (response) => {
        this.branchorders = response.data.brancheOrders;
        this.totalPages = response.data.totalPages;
        this.totalResults = response.data.totalBrancheOrdersCount;

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
      this.loadBranchOrders(this.currentPage);
    });
    import('bootstrap').then(bootstrap => {
      const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
      dropdownElementList.forEach(dropdownToggle => {
        new bootstrap.Dropdown(dropdownToggle);
      });
    });
  }



  changeSearch(search: string) {
    this.search = search;
    this.currentPage = 1;
    this.loadBranchOrders(this.currentPage)
  }
  
 
  
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadBranchOrders(this.currentPage)
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
    if (this.sidebarComponent) {
      this.sidebarComponent.sidebarState$.subscribe(
        state => this.isSidebarOpen = state
      );
    }
  }
  scrollToTop(): void {
    this.viewPortScroller.scrollToPosition([0, 0])
  }

  
  
  openEditModal(branchOrder: branchorders) {
    this.selectedBranchOrder = branchOrder;
    console.log("Opening modal for branch Order:", this.selectedBranchOrder);

    const modalElement = document.getElementById('orderDetailsModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
   
filteredBranchOrders() {
  if (!this.selectedType) {
    return this.branchorders; 
  }
  
  return this.branchorders.filter(order => 
    (this.selectedType === "Online" && order.customer_name) ||
    (this.selectedType === "Offline" && !order.customer_name)
  );
}

}

import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { QtyRequest } from 'src/app/_models/QtyRequests';
import { Subscription } from 'rxjs';
import { UpdateQtyRequestsService } from '../_services/UpdateQtyRequest.service';
import { ToastrService } from 'ngx-toastr';
import { Branch } from 'src/app/_models/branch';
import { BranchService } from '../_services/branch.service';
export declare const bootstrap: any;
@Component({
  selector: 'app-quantity-update-requests',
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './quantity-update-requests.component.html',
  styleUrl: './quantity-update-requests.component.css'
})
export class QuantityUpdateRequestsComponent implements OnInit {
@ViewChild(SideBarComponent) sidebarComponent!: SideBarComponent;
  UpdateQtyRequests:QtyRequest[]=[];
  isEditMode: boolean = false;
 RequestrToDelete: string | null = null;
  isLoading: boolean = true;
    selectedSort: string = '';
    currentPage = 1;
    totalPages !: number;
    pageNumbers: number[] = [];
    totalResults: number = 0;
    pageSize: number = 6;
    sub!: Subscription;
    sub1!: Subscription;
    status:string='';
    search:string='';
    approvalQty: number = 1; 
    selectedRequestId: string = ''; 
     branchSearch: string = '';
        textSearch: string = '';
    branches:Branch[]=[];
  
     @Input() isSidebarOpen = false;
    constructor(private updateQty:UpdateQtyRequestsService,private branchservice:BranchService
      ,private route:ActivatedRoute,private viewPortScroller: ViewportScroller,private toastr: ToastrService) {

    }
    loadBranches(){
      this.branchservice.getAllActiveBranches().subscribe({
        next:(response)=>{
          this.branches=response.data;
        
        },
        error:()=>{
            console.log("error loading branches");
        }
      })
        }
    loadRequests(page:number){
      this.updateQty.getAllRequests(page, this.selectedSort,this.status, this.search).subscribe({
        next:(response)=>{
          this.UpdateQtyRequests=response.data.Qtyrequests;
          this.totalPages = response.data.totalPages;
          this.totalResults = response.data.totalProductsCount;
          this.generatePageNumbers();
          this.scrollToTop();
          this.isLoading = false;
        },
        error:()=>{
            console.log("error loading requests");
        }
      })
        }
  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe(params => {
      this.currentPage = +params.get('page')!;
      console.log(this.currentPage);
   this.loadRequests(this.currentPage);
  });
  this.sub1 = this.route.paramMap.subscribe(() => this.loadBranches());
   import('bootstrap').then(bootstrap => {
    const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
    dropdownElementList.forEach(dropdownToggle => {
      new bootstrap.Dropdown(dropdownToggle);
    });
  });
  }


 
  changeSearch(search:string){
    this.search=search;
    this.currentPage = 1; 
    this.loadRequests(this.currentPage)
  }
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadRequests(this.currentPage)
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
 changeStatus(id:string,status:string,qty:number){
    this.updateQty.changeStatus(id,status,qty).subscribe({
  next:(response)=>{
    this.loadRequests(this.currentPage);
    this.toastr.success("Status Changed Successfully");
  }
  ,
      error: (err) => {
        console.error('Error updating status:', err);
      }
})
  }
 
 confirmDelete() {
     if (this.RequestrToDelete) {
       this.changeStatus(this.RequestrToDelete,'disapproved',0);
       const modalElement = document.getElementById('deleteModal');
       if (modalElement) {
         const modal = bootstrap.Modal.getInstance(modalElement);
         if (modal) {
           modal.hide();
         }
       }
       this.RequestrToDelete = null;
     }
   }
   onDelete(requestId: string) {
       this.RequestrToDelete = requestId;
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
  
  openPartialApprovalModal(requestId: string) {
    this.selectedRequestId = requestId; 
    this.approvalQty = 1; 
    let modalElement = document.getElementById('partialApprovalModal');
    let modalInstance = new bootstrap.Modal(modalElement);
    modalInstance.show();
  }
  confirmPartialApproval() {
    if (this.approvalQty <= 0) {
      this.toastr.error("Please Enter Valid Quantity");
      return;
    }
    this.changeStatus(this.selectedRequestId, 'partiallyApproved', this.approvalQty);
    let modalElement = document.getElementById('partialApprovalModal');
    let modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide(); 
  }
}

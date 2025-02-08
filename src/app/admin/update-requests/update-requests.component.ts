import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, Input, input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { UpdateRequestsService } from '../_services/UpdateRequests.service';
import { UpdateRequests } from 'src/app/_models/UpdateRequests';
export declare const bootstrap: any;
@Component({
  selector: 'app-update-requests',
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './update-requests.component.html',
  styleUrl: './update-requests.component.css'
})
export class UpdateRequestsComponent {
@ViewChild(SideBarComponent) sidebarComponent!: SideBarComponent;
  UpdateRequests:UpdateRequests[]=[];
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
    status:string='';
    search:string='';
    seller_id:string='';
    selectedCategory: string = '';
     @Input() isSidebarOpen = false;
    constructor(private updaterequest:UpdateRequestsService,private route:ActivatedRoute,private viewPortScroller: ViewportScroller,private toastr: ToastrService) {

    }
    loadRequests(page:number){
      this.updaterequest.getAllRequests(page, this.selectedSort,this.selectedCategory,this.status,this.seller_id, this.search).subscribe({
        next:(response)=>{
          this.UpdateRequests=response.data.products;
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
   import('bootstrap').then(bootstrap => {
    const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
    dropdownElementList.forEach(dropdownToggle => {
      new bootstrap.Dropdown(dropdownToggle);
    });
  });
  }


 
  changeSearch(name:string){
    this.search=name;
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
 changeStatus(id:string,status:string){
    this.updaterequest.changeStatus(id,status).subscribe({
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
       this.changeStatus(this.RequestrToDelete,'disapproved');
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
}

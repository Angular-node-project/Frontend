import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { Branch } from 'src/app/_models/branch';
import { Subscription } from 'rxjs';
import { BranchService } from '../_services/branch.service';
import { ToastrService } from 'ngx-toastr';
export declare const bootstrap: any;
@Component({
  selector: 'app-branches',
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './branches.component.html',
  styleUrl: './branches.component.css'
})
export class BranchesComponent implements OnInit {
 @ViewChild(SideBarComponent) sidebarComponent!: SideBarComponent;
branches:Branch[]=[];
  isEditMode: boolean = false;
 BranchToDelete: string | null = null;
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
    sort:string='';
    isAddingBranch: boolean = false
    NewBranchName:string=''
    NewBranchLocation:string=''
    selectedBranchId:string='';
     @Input() isSidebarOpen = false;
    constructor(private branchservice:BranchService,private route:ActivatedRoute,private viewPortScroller: ViewportScroller,private toastr: ToastrService) {

    }
    loadBranches(page:number){
      this.branchservice.getAllBranches(page,this.sort,this.status, this.search).subscribe({
        next:(response)=>{
          this.branches=response.data.branches;
          this.totalPages = response.data.totalPages;
          this.totalResults = response.data.totalCategoriesCount;
          this.generatePageNumbers();
          this.scrollToTop();
          this.isLoading = false;
        },
        error:()=>{
            console.log("error loading branches");
        }
      })
        }
  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe(params => {
      this.currentPage = +params.get('page')!;
      console.log(this.currentPage);
   this.loadBranches(this.currentPage);
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
    this.loadBranches(this.currentPage)
  }
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadBranches(this.currentPage)
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
    this.branchservice.changeStatus(id,status).subscribe({
  next:(response)=>{
    this.loadBranches(this.currentPage);
    this.toastr.success("Status Changed Successfully");
  }
  ,
      error: (err) => {
        console.error('Error updating status:', err);
      }
})
  }
 
 confirmDelete() {
     if (this.BranchToDelete) {
       this.changeStatus(this.BranchToDelete,'inactive');
     
       const modalElement = document.getElementById('deleteModal');
       if (modalElement) {
         const modal = bootstrap.Modal.getInstance(modalElement);
         if (modal) {
           modal.hide();
         }
       }
       this.BranchToDelete = null;
     }
   }
   onDelete(sellerid: string) {
       this.BranchToDelete = sellerid;
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
    showAddBranch()
    {
      this.isAddingBranch = true;  
      this.isEditMode = false;
      this.NewBranchLocation = '';
      this.NewBranchName = '';
    
    
      this.openEditModal();

    } saveBranch()
    {
      if (!(this.NewBranchName.trim() && this.NewBranchLocation.trim())) {  
        this.toastr.error("Branch name or location cannot be empty!");  
        return;  
    }  
    
      this.branchservice.addBranch({
  name: this.NewBranchName,
  location: this.NewBranchLocation,
      } ).subscribe({  
        next: (response) => {  
          this.toastr.success("branch added successfully!");  
          this.loadBranches(this.currentPage);  
          this.closeModal();
          this.isAddingBranch = false;  
          this.NewBranchName = '';  
          this.NewBranchLocation='';
         
        },  
        error: () => {  
          this.toastr.error("Failed to add branch.");  
        }  
      });  
    }
    FillBranchToEdit(branch: Branch) {
      this.isAddingBranch = true;  
      this.isEditMode = true;  
      this.NewBranchName = branch.name;  
      this.NewBranchLocation = branch.location;  
      this.selectedBranchId = branch.branch_id;  
      this.openEditModal();
    }
    UpdateBranch()
    {
      
      if (!(this.NewBranchName.trim() && this.NewBranchLocation.trim())) {  
        this.toastr.error("Branch name or location cannot be empty!");  
        return;  
    }  
    
    
    
    this.isEditMode=true;
      this.branchservice.updateBranch(this.selectedBranchId,{
  name: this.NewBranchName,
  location: this.NewBranchLocation,
      } ).subscribe({  
        next: (response) => {  
          this.toastr.success("Branch Updated Successfully!");  
          this.loadBranches(this.currentPage);  
          this.closeModal();
          this.isAddingBranch = false;  
          this.isEditMode=false;
          this.NewBranchName = '';  
          this.NewBranchLocation='';
       
        },  
        error: () => {  
          this.toastr.error("Failed to add branch.");  
        }  
      });  
    }
     cancelAddBranch()
     {
      this.isAddingBranch = false;  
  this.isEditMode = false;
  this.NewBranchName = '';  
  this.NewBranchLocation = '';  
  this.selectedBranchId = '';

     }
     openEditModal() {
       const modalElement = document.getElementById('branchModal');
       if (!modalElement) {
         console.error('Modal element not found!');
         return;
       }
       if (modalElement) {
         const modal = new bootstrap.Modal(modalElement);
         modal.show();
       }
     }
     closeModal() {
       let modal = document.getElementById('branchModal');
       if (modal) {
         let modalInstance = bootstrap.Modal.getInstance(modal);
         if (modalInstance) {
           modalInstance.hide();
         }
       }
     }
}

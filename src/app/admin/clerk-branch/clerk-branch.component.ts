import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClerkBranchService } from '../_services/clerkBranch.service';
import { ToastrService } from 'ngx-toastr';
import { ClerkBranch } from 'src/app/_models/clerkBranch';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { AddUpdateComponent } from "./add-update/add-update.component";
import { Branch } from 'src/app/_models/branch';
import { BranchService } from '../_services/branch.service';
export declare const bootstrap: any;

@Component({
  selector: 'app-clerk-branch',
  imports: [FormsModule, CommonModule, RouterLink, AddUpdateComponent],
  templateUrl: './clerk-branch.component.html',
  styleUrl: './clerk-branch.component.css'
})
export class ClerkBranchComponent  implements OnInit{
  @ViewChild(SideBarComponent) sidebarComponent!: SideBarComponent;
constructor(
    private clerkbranchservice: ClerkBranchService, private route: ActivatedRoute,private toastr:ToastrService
  ,private branchservice:BranchService) { }
 isEditMode: boolean = false;
 
  isLoading: boolean = true;
  clerkBranch: ClerkBranch[] = [];
    currentPage = 1;
    totalPages !: number;
    pageNumbers: number[] = [];
    totalResults: number = 0;
    pageSize: number = 6;
    sub!: Subscription;
    sub1!: Subscription;
    status:string='';
    search:string='';
    sort:string='';
    roleSearch: string = '';
    branchSearch: string = '';
    textSearch: string = '';
branches:Branch[]=[];
    selectedBranchClerk!:ClerkBranch;
    BranchclerkToDelete:string|null=null;

     @Input() isSidebarOpen = false;
  
  ngOnInit(): void {

    this.sub = this.route.paramMap.subscribe(params => {
      this.currentPage= +params.get('page')!;
     this.loadbranchClerks(this.currentPage);
    })
    this.sub1 = this.route.paramMap.subscribe(() => this.loadBranches());
   
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
  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }


  loadbranchClerks(page:number){
    this.sub =this.clerkbranchservice.getAllClerkBranches(page,this.sort,this.status, this.search).subscribe({
      next:(response)=>{
          this.clerkBranch=response.data.clerkBranches;
          this.totalPages = response.data.totalPages;
          this.totalResults = response.data.totalClerksCount;
          console.log(response.data);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  
  onSaveClerkBranch(Role: any) {
    const modalElement = document.getElementById('clerkModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
      this.loadbranchClerks(this.currentPage);
    }

  }

  openAddModal() {
    this.isEditMode = false; 
    this.selectedBranchClerk= {
      clerkBranch_id: '', 
      branch: { branch_id: '', name: '' },
      name: '',
      email: '',
      password: '',
      role: 'Manager',
      status: 'active'
  };
  
    const modalElement = document.getElementById('clerkModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  openEditModal(item: ClerkBranch) {
    this.isEditMode = true; 
    this.selectedBranchClerk = { ...item }; 

    const modalElement = document.getElementById('clerkModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }


  changeStatus(clerkBranchId: string, status: string) {
   this.clerkbranchservice.changeStatus(clerkBranchId,status).subscribe({
      next: (response) => {
        if (response) {
          this.toastr.success("status changed successfully");
        } else {
          this.toastr.error("clerk not found");
        }
     this.loadbranchClerks(this.currentPage);
      },
      error: (err) => {
        this.toastr.error("failed to change status");
      }
    })
  }
  changeSearch(name:string){
    this.search=name;
    this.currentPage = 1; 
    this.loadbranchClerks(this.currentPage)
  }
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadbranchClerks(this.currentPage)
    }
  }
  
  generatePageNumbers(): void {
    this.pageNumbers = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pageNumbers.push(i);
    }
  }

  openDeleteModal(branchClerkID:string) {
    this.BranchclerkToDelete = branchClerkID;
    const modalElement = document.getElementById('deleteModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  confirmDelete() {
    if (this.BranchclerkToDelete) {
      this.changeStatus(this.BranchclerkToDelete, 'inactive');
      const modalElement = document.getElementById('deleteModal');
      if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
      }
      this.BranchclerkToDelete = null;
    }
  }

}

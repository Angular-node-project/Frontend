import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Clerk } from 'src/app/_models/clerk';
import { CommonModule } from '@angular/common';
import { ClerksService } from '../_services/clerks.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AddUpdateComponent } from './add-update/add-update.component';
export declare const bootstrap: any;


@Component({
  selector: 'app-clerk',
  imports: [FormsModule, CommonModule,RouterLink,AddUpdateComponent],
  templateUrl: './clerk.component.html',
  styleUrl: './clerk.component.css'
})
export class ClerkComponent implements OnInit ,OnDestroy {

  constructor(
    private clerkService: ClerksService
    , private activeRoute: ActivatedRoute
    ,private toastr:ToastrService
  ) { }

  sub!: Subscription;
  sub2!:Subscription;
  sub3!:Subscription;
  currentPage = 1;
  clerks: Clerk[] = [];
  totalPages!:number;
  totalResults!:number;
  searchedWord:string='';
  isEditMode:boolean=false;
  selectedClerk!:Clerk;
  clerkToDeleteId:string|null=null;
  clerkToDeleteName:string='';

  private searchSubject = new Subject<string>();
  ngOnInit(): void {

    this.sub = this.activeRoute.paramMap.subscribe(params => {
      this.currentPage= +params.get('page')!;
       this.fetchClerks('');
    })

    this.searchSubject.pipe(debounceTime(500)).subscribe((query)=>{
      this.fetchClerks(query)
    })
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  onSearchChange(){
    this.searchSubject.next(this.searchedWord);
  }

  fetchClerks(query:string){
    this.sub2 =this.clerkService.getAllClerks(this.currentPage,query).subscribe({
      next:(response)=>{
        if(response.status==201){
          this.clerks=response.data.updatedClerks;
          this.totalPages = response.data.totalPages;
          this.totalResults = response.data.totalClerksCount;
          console.log(response.data);
        }
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  
  onSaveClerk(Role: any) {
    const modalElement = document.getElementById('clerkModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
      this.fetchClerks('');
    }

  }

  openAddModal() {
    this.isEditMode = false;
    this.selectedClerk = new Clerk('','','','','','','');
    const modalElement = document.getElementById('clerkModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  openEditModal(item: Clerk) {
    this.isEditMode = true;
    this.selectedClerk = item;
    console.log(this.selectedClerk);
    const modalElement = document.getElementById('clerkModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }


  changeStatus(clerk_id: string, status: string) {
    this.sub3 = this.clerkService.updateStatus(clerk_id,status).subscribe({
      next: (response) => {
        if (response.data != 0) {
          this.toastr.success("status changed successfully");
        } else {
          this.toastr.error("clerk not found");
        }
        this.fetchClerks('');
      },
      error: (err) => {
        this.toastr.error("something went wrong");
      }
    })
  }


  openDeleteModal(clerk: Clerk) {
    this.clerkToDeleteId = clerk.clerk_id;
    this.clerkToDeleteName = clerk.name;
    const modalElement = document.getElementById('deleteModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  confirmDelete() {
    if (this.clerkToDeleteId) {
      this.changeStatus(this.clerkToDeleteId, 'deleted');
      const modalElement = document.getElementById('deleteModal');
      if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
      }
      this.clerkToDeleteId = null;
    }
  }


  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }
  
}

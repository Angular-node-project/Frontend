import { Component, Input, OnInit, ViewChild, viewChild } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { Category } from 'src/app/_models/category';
import { Subscription } from 'rxjs';
import { CategoryService } from '../_services/category.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, ViewportScroller } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { HasPermissionDirective } from '../_directives/has-permission.directive';
export declare const bootstrap: any;
@Component({
  selector: 'app-category',
  imports: [RouterLink,FormsModule,CommonModule,HasPermissionDirective],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
 @ViewChild(SideBarComponent) sidebarComponent!: SideBarComponent;
categories:Category[]=[];
  isEditMode: boolean = false;
 CategoryToDelete: string | null = null;
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
    selectedCategoryId:string='';
    isAddingCategory: boolean = false
    NewCategoryName:string=''
     @Input() isSidebarOpen = false;
    constructor(private categoryservice:CategoryService,private route:ActivatedRoute,private viewPortScroller: ViewportScroller,private toastr: ToastrService) {

    }
    loadCategories(page:number){
      this.categoryservice.getAllcategories(page,this.status, this.search).subscribe({
        next:(response)=>{
          this.categories=response.data.categories;
          this.totalPages = response.data.totalPages;
          this.totalResults = response.data.totalCategoriesCount;
          this.generatePageNumbers();
          this.scrollToTop();
          this.isLoading = false;
        },
        error:()=>{
            console.log("error loading categories");
        }
      })
        }
  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe(params => {
      this.currentPage = +params.get('page')!;
      console.log(this.currentPage);
   this.loadCategories(this.currentPage);
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
    this.loadCategories(this.currentPage)
  }
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadCategories(this.currentPage)
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
    this.categoryservice.changeStatus(id,status).subscribe({
  next:(response)=>{
    this.loadCategories(this.currentPage);
    this.toastr.success("Status Changed Successfully");
  }
  ,
      error: (err) => {
        console.error('Error updating status:', err);
      }
})
  }
 
 confirmDelete() {
     if (this.CategoryToDelete) {
       this.changeStatus(this.CategoryToDelete,'inactive');
     
       const modalElement = document.getElementById('deleteModal');
       if (modalElement) {
         const modal = bootstrap.Modal.getInstance(modalElement);
         if (modal) {
           modal.hide();
         }
       }
       this.CategoryToDelete = null;
     }
   }
   onDelete(sellerid: string) {
       this.CategoryToDelete = sellerid;
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
    FillCategoryToEdit(category: Category) {
      this.isAddingCategory = true;
      this.isEditMode = true;
      this.NewCategoryName = category.name;
      this.selectedCategoryId = category.category_id;
    
   
      this.openEditModal();
    }
    
        UpdateCategory()
    {
      
      if (!this.NewCategoryName.trim()) {  
        this.toastr.error("category name cannot be empty!");  
        return;  
      }  
    this.isEditMode=true;
      this.categoryservice.updateCategory(this.selectedCategoryId,{
  name: this.NewCategoryName,
       
      } ).subscribe({  
        next: (response) => {  
          this.toastr.success("category Updated Successfully!");  
          this.closeModal();
          this.loadCategories(this.currentPage);   
          this.isAddingCategory = false;  
          this.isEditMode=false;
          this.NewCategoryName = '';  
    
         
         

        },  
        error: () => {  
          this.toastr.error("Failed to add category.");  
        }  
      });  
    }
    showAddCategory()
    {
    
        this.isAddingCategory = true;
        this.isEditMode = false;
        this.NewCategoryName = '';
      
      
        this.openEditModal();
      
      
    } saveCategory()
    {
      if (!this.NewCategoryName.trim()) {  
        this.toastr.error("Category name cannot be empty!");  
        return;  
      }  
    
      this.categoryservice.addCategory(this.NewCategoryName ).subscribe({  
        next: (response) => {  
          this.toastr.success("Category added successfully!");  
          this.loadCategories(this.currentPage);  
          this.closeModal(); 
          this.isAddingCategory = false;  
          this.NewCategoryName = '';  
          

        },  
        error: () => {  
          this.toastr.error("Failed to add category.");  
        }  
      });  
    }
     cancelAddCategory()
     {
      this.isAddingCategory = false;  
  this.NewCategoryName = '';  
 
  this.isEditMode = false;
  
  this.selectedCategoryId = '';
     }
      

openEditModal() {
  const modalElement = document.getElementById('categoryModal');
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
  let modal = document.getElementById('categoryModal');
  if (modal) {
    let modalInstance = bootstrap.Modal.getInstance(modal);
    if (modalInstance) {
      modalInstance.hide();
    }
  }
}

}
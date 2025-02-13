import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { Subscription } from 'rxjs';
import { Customerservice } from '../_services/customerservice';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/_models/customerservice';
export declare const bootstrap: any;
@Component({
  selector: 'app-customerservice',
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './customerservice.component.html',
  styleUrl: './customerservice.component.css'
})
export class CustomerserviceComponent implements OnInit {
@ViewChild(SideBarComponent) sidebarComponent!: SideBarComponent;

  messages:CustomerService[]=[];
  isEditMode: boolean = false;
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
    isSendingEmail: boolean = false
    NewEmail:string=''
     @Input() isSidebarOpen = false;
    constructor(private customerservice:Customerservice,private route:ActivatedRoute,private viewPortScroller: ViewportScroller,private toastr: ToastrService) {

    }
    loadCategories(page:number){
      this.customerservice.getAllMessages(page,this.status, this.search).subscribe({
        next:(response)=>{
          this.messages=response.data.messages;
          this.totalPages = response.data.totalPages;
          this.totalResults = response.data.totalCategoriesCount;
          this.generatePageNumbers();
          this.scrollToTop();
          this.isLoading = false;
        },
        error:()=>{
            console.log("error loading messages");
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


 
  changeSearch(search:string){
    this.search=search;
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
    showSendEmail()
    {
      this.isSendingEmail = true;  

    } 
    saveEmail(email:string)
    {
      if (!this.NewEmail.trim()) {  
        this.toastr.error("message name cannot be empty!");  
        return;  
      }  
    
      this.customerservice.SendMessaege(email,this.NewEmail ).subscribe({  
        next: (response) => {  
          this.toastr.success("Email Send successfully!");  
          this.isSendingEmail = false;  
          this.NewEmail = '';  
          this.loadCategories(this.currentPage);  
        },  
        error: () => {  
          this.toastr.error("Failed to Send Email.");  
        }  
      });  
    }
     cancelSend()
     {
      this.isSendingEmail = false;  
      this.NewEmail = '';  

     }
}

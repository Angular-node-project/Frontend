import { Component, Input, OnInit, ViewChild, viewChild } from '@angular/core';
import { SellerService } from '../_services/sellers.services';
import { Seller } from 'src/app/_models/sellers';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, ViewportScroller } from '@angular/common';
import { Subscription } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { ToastrService } from 'ngx-toastr';
export declare const bootstrap: any;
@Component({
  selector: 'app-sellers',
  imports: [FormsModule, CommonModule, RouterLink,ReactiveFormsModule],
  templateUrl: './sellers.component.html',
  styleUrl: './sellers.component.css'
})
export class SellersComponent implements OnInit {
  @ViewChild(SideBarComponent) sidebarComponent!: SideBarComponent;
  sellers: Seller[] = [];
  isEditMode: boolean = false;
  SellerToDelete: string | null = null;
  isLoading: boolean = true;
  selectedSort: string = '';
  currentPage = 1;
  totalPages !: number;
  pageNumbers: number[] = [];
  totalResults: number = 0;
  pageSize: number = 6;
  sub!: Subscription;
  status: string = '';
  search: string = '';
  selectedSeller!:Seller;
  sellerForm!: FormGroup;

  @Input() isSidebarOpen = false;
  constructor(private fb:FormBuilder,
    private sellerService: SellerService, private route: ActivatedRoute, private viewPortScroller: ViewportScroller, private toastr: ToastrService) {

  }
  initializeForm() {
    this.sellerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: [ '', [ Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.com$')]],
      phone_number: [ '',  [Validators.required, Validators.pattern('^\\d{10,15}$')]],
      national_id: ['',[Validators.required, Validators.pattern('^[0-9]{14}$')]],
    
     
    });
  }
  loadSellers(page: number) {
    this.sellerService.getAllsellers(page, this.selectedSort, this.status, this.search).subscribe({
      next: (response) => {
        this.sellers = response.data.sellers;
        this.totalPages = response.data.totalPages;
        this.totalResults = response.data.totalProductsCount;
        this.generatePageNumbers();
        this.scrollToTop();
        this.isLoading = false;
      },
      error: () => {
        console.log("error loading sellers");
      }
    })
  }
  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe(params => {
      this.currentPage = +params.get('page')!;
      console.log(this.currentPage);
      this.loadSellers(this.currentPage);
    });
    import('bootstrap').then(bootstrap => {
      const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
      dropdownElementList.forEach(dropdownToggle => {
        new bootstrap.Dropdown(dropdownToggle);
      });
    });
    this.initializeForm()
  }



  changeSearch(name: string) {
    this.search = name;
    this.currentPage = 1;
    this.loadSellers(this.currentPage)
  }
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadSellers(this.currentPage)
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
    this.sellerService.Changestatus(id, status).subscribe({
      next: (response) => {
        this.loadSellers(this.currentPage);
        this.toastr.success("Status Changed Successfully");
      }
      ,
      error: (err) => {
        console.error('Error updating status:', err);
      }
    })
  }

  confirmDelete() {
    if (this.SellerToDelete) {
      this.changeStatus(this.SellerToDelete, 'inactive');

      const modalElement = document.getElementById('deleteModal');
      if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
      }
      this.SellerToDelete = null;
    }
  }
  onDelete(sellerid: string) {
    this.SellerToDelete = sellerid;
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
   
      
       
           openAddModal() {
            this.isEditMode = false;
            this.sellerForm.reset();
            this.openEditModal();
          }
        
          openEditModal(seller?: Seller) {
            if (seller) {
              this.isEditMode = true;
              this.sellerForm.patchValue(seller);
            }
            const modalElement = document.getElementById('SellerModal');
            if (modalElement) {
              const modal = new bootstrap.Modal(modalElement);
              modal.show();
            }
          }
          FillSellerToEdit(seller: Seller) {
            this.isEditMode = true; 
            this.selectedSeller = { ...seller }; 
            this.sellerForm.patchValue(seller);
            this.openEditModal();
          }
          
          
          saveSeller() {
            if (this.sellerForm.invalid) {
              this.toastr.error('Please fill out all required fields correctly.');
              return;
            }
        
            const sellerData = this.sellerForm.value;
            if (this.isEditMode) {
              
              this.sellerService.UpdateSeller(this.selectedSeller.seller_id,sellerData).subscribe({
                next: (response) => {
                  this.loadSellers(this.currentPage);
                  this.toastr.success("Seller updated successfully");
                  this.closeModal();
                },
                error: (err) => {
                  this.toastr.error(err.message||'Error updating seller.');
                },
              });
            } else {
              this.sellerService.AddSeller(sellerData).subscribe({
                next: (response) => {
                  this.loadSellers(this.currentPage);
                  this.toastr.success("Seller Add successfully");
                  this.closeModal();
                },
                error: (err) => {
                  this.toastr.error(err.message||'Error adding seller.');
                },
              });
            }
          }
        
          closeModal() {
            const modalElement = document.getElementById('SellerModal');
            if (modalElement) {
              const modalInstance = bootstrap.Modal.getInstance(modalElement);
              if (modalInstance) {
                modalInstance.hide();
              }
            }
          }
        }
   
   
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { CommonModule } from '@angular/common';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { ProductsBranchService } from '../_services/products-branch.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductBranch } from 'src/app/_models/productBranch';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { RequestQtyComponent } from './request-qty/request-qty.component';
export declare const bootstrap: any;
@Component({
  selector: 'app-products-branch',
  imports: [CommonModule, FormsModule, RouterLink, RequestQtyComponent],
  templateUrl: './products-branch.component.html',
  styleUrl: './products-branch.component.css'
})
export class ProductsBranchComponent implements OnInit, OnDestroy {
  constructor(
    private productBranchService: ProductsBranchService
    , private activeRoute: ActivatedRoute
    , private toastr: ToastrService
  ) { }

  @Input() isSidebarOpen = false;
  @ViewChild(SideBarComponent) sidebarComponent!: SideBarComponent;
  Sub!: Subscription;
  Sub2!: Subscription;
  CurrentPage: number = 1;
  allProducts: ProductBranch[] = [];
  totalPages!: number;
  totalResults!: number;
  searchedInput!: string;

  private searchSubject = new Subject<string>();

  ngOnInit(): void {

    this.Sub2 = this.activeRoute.paramMap.subscribe(params => {
      this.CurrentPage = +params.get('page')!;
      this.loadProducts();
    })


    if (this.sidebarComponent) {
      this.sidebarComponent.sidebarState$.subscribe(
        state => this.isSidebarOpen = state
      );
    }

    import('bootstrap').then(bootstrap => {
      const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
      dropdownElementList.forEach(dropdownToggle => {
        new bootstrap.Dropdown(dropdownToggle);
      });
    });
    this.searchSubject.pipe(debounceTime(200)).subscribe((query) => {
      this.fetchProducts(query);
    })


  }


  ngAfterViewInit() {
    if (this.sidebarComponent) {
      this.sidebarComponent.sidebarState$.subscribe(
        state => this.isSidebarOpen = state
      );
    }
  }


  fetchProducts(search: string) {
    this.Sub = this.productBranchService.getAllPaginatedProducts(this.CurrentPage, '', search).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status == 201) {
          this.allProducts = res.data.products;
          this.totalPages = res.data.totalPages;
          this.totalResults = res.data.totalProductsCount;
          console.log(res.data);
        }
      }, error: (err) => {
        console.log(err);
        this.toastr.error("something went wrong");
      }
    })
  }
  loadProducts() {
    this.fetchProducts('');
  }
  onsearchChange() {
    this.searchSubject.next(this.searchedInput);

  }
  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  onSaveRequests(event: any) {
    const modalElement = document.getElementById('RequestQtyModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
      this.loadProducts();
    }

  }
  requestQty() {
    const modalElement = document.getElementById('RequestQtyModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
  ngOnDestroy(): void {
    if (this.Sub) {
      this.Sub.unsubscribe();
    }
    if (this.Sub2) {
      this.Sub2.unsubscribe();
    }
  }


}

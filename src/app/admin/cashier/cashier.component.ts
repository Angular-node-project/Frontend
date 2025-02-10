import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/products.services';
import { CashierProduct } from 'src/app/_models/product';
import { CommonModule, ViewportScroller } from '@angular/common';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, FormsModule, Validators,ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CashierService } from '../_services/cashier.service';
import { ToastrService } from 'ngx-toastr';
export declare const bootstrap: any;


//*

@Component({
  selector: 'app-cashier',
  imports: [FormsModule,CommonModule,RouterLink,ReactiveFormsModule],
  templateUrl: './cashier.component.html',
  styleUrl: './cashier.component.css'
})
export class CashierComponent implements OnInit {



  selectedProduct: any = null;
  products: CashierProduct[] = [];
  totalResults: number = 0;
  totalPages !: number;
  isLoading: boolean = true;
  selectedSort: string = '';
  selectedCategory: string = '';
  status: string = ''
  search: string = ''
  sub!: Subscription;
  currentPage = 1;
  cashierProducts:CashierProduct[]=[];
  TotalAmount=0;

  form: FormGroup = new FormGroup({
    Address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required, Validators.minLength(5)]),
    phone_number: new FormControl('',[Validators.required,Validators.pattern(/^(011|012|010|015)\d{8}$/)]),
  });


constructor(private productservice: ProductService,
            private viewPortScroller: ViewportScroller,
            private route: ActivatedRoute,
            private cahierService:CashierService,
            private toastr:ToastrService
            ){}

ngOnInit() {
  this.sub = this.route.paramMap.subscribe(params => {
    this.currentPage = +params.get('page')!;
    console.log(this.currentPage);
    this.loadProducts(this.currentPage);
  });

  // Initialize Bootstrap dropdowns
  import('bootstrap').then(bootstrap => {
    const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
    dropdownElementList.forEach(dropdownToggle => {
      new bootstrap.Dropdown(dropdownToggle);
    });
  });
  this.selectedProduct = this.selectedProduct || { name: '', categories: '', description: '', qty: 0, price: 0, seller: { name: '' } };

}



  loadProducts(page: number): void {
    this.productservice.getAllProducts(page, this.selectedSort, this.selectedCategory, "active", this.search).subscribe({
      next: (response) => {
        this.products = response.data.products;
        this.products.forEach(p=>{
          p.stock=p.qty
          p.qty=1;
        })
        this.totalPages = response.data.totalPages;
        this.totalResults = response.data.totalProductsCount;
        this.scrollToTop();
        this.isLoading = false;
      },
      error: () => {
        console.log('Error loading products');
        this.isLoading = true;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  scrollToTop(): void {
    this.viewPortScroller.scrollToPosition([0, 0])
  }

  changeSearch(name: string): void {
    this.search = name;
    this.currentPage = 1;
    this.loadProducts(this.currentPage)
  }


  getCashierCart(){
      const cart = localStorage.getItem('CashierCart');
      if (!cart) {
        // Return an empty array wrapped in an Observable
        this.cashierProducts=[];
      }else{
        // Parse the cart from localStorage and return it as an Observable
        this.cashierProducts = JSON.parse(cart);
      }
    }

    save(){
      this.TotalAmount=0
      this.cashierProducts.forEach(p=>{
        this.TotalAmount+=(p.qty*p.price)
      })
      let products=JSON.stringify(this.cashierProducts)
      localStorage.setItem('CashierCart',products)
    }

  AddproductTocart(product:CashierProduct,qty:number){
    let selectedProduct=product
    selectedProduct.qty=qty
    this.getCashierCart()
    this.cashierProducts.push(selectedProduct)
    this.save()
  }
  RemoveProductFromCart(product_id:string){
    this.getCashierCart();
    this.cashierProducts=this.cashierProducts.filter(p=>p.product_id!=product_id);
    this.save()
    console.log(this.cashierProducts)
  }

  IncreaseDecrease(productid:string,qty:number){
  this.getCashierCart();
  this.cashierProducts.find(p=>{
    if(p.product_id==productid ){
        if(!(p.stock<(p.qty+qty)) && !((p.qty+qty)==0))
        p.qty+=qty
    }
  })
  this.products.find(p=>{
    if(p.product_id==productid){
      if(p.stock<(p.qty+qty))
        this.toastr.error(`Sorry but Product:${p.name} has only ${p.stock} Available in our Stocks`)
      else if(!((p.qty+qty)==0))
      p.qty+=qty
    }
  })
  this.save();
  }

  //* return true if product added into cart
  isChecked(product_id:string){
    this.getCashierCart();
    return !!this.cashierProducts.find(p=>p.product_id==product_id)
  }

  //* Modal
  show(){
    const modalElement = document.getElementById('productModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

}

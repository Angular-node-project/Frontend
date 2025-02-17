import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CashierProduct, ProductResponse } from 'src/app/_models/product';
import { CashierService } from '../_services/cashier.service';
import { ProductService } from 'src/app/admin/_services/products.services';
import { CommonModule, ViewportScroller } from '@angular/common';
export declare const bootstrap: any;


@Component({
  selector: 'app-cahier',
  imports: [FormsModule, CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './cashier.component.html',
  styleUrl: './cashier.component.css'
})
export class CahierComponent {

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
  cashierProducts: CashierProduct[] = [];
  TotalAmount = 0;
  Productres: ProductResponse[] = [];

  //*Print Receipt
  receipt: any;

  testRecept() {

    // console.log(this.receipt)
    this.receipt = { name: "s" }
    window.open("admin/cashier/p/print", "")
  }

  form: FormGroup = new FormGroup({
    Address: new FormControl('', [Validators.required]),
    AdditionalInfo: new FormControl('', []),
    city: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(/^\d{5,}$/)]),
    phone_number: new FormControl('', [Validators.required, Validators.pattern(/^(011|012|010|015)\d{8}$/)]),

  });


  constructor(private productservice: ProductService,
    private viewPortScroller: ViewportScroller,
    private route: ActivatedRoute,
    private cahierService: CashierService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.sub = this.route.paramMap.subscribe(params => {
      this.currentPage = +params.get('page')!;
      console.log(this.currentPage);
      this.loadProducts(this.currentPage);
      this.getCashierCart();
      this.cashierProducts.forEach(p => {
        this.TotalAmount += (p.qty * p.price)
      })
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
        console.log(response)
        this.products = response.data.products;
        this.products.forEach(p => {
          p.stock = p.qty
          p.qty = 1;
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


  getCashierCart() {
    const cart = localStorage.getItem('CashierCart');
    if (!cart) {
      // Return an empty array wrapped in an Observable
      this.cashierProducts = [];
    } else {
      // Parse the cart from localStorage and return it as an Observable
      this.cashierProducts = JSON.parse(cart);
    }
  }

  save() {
    this.TotalAmount = 0
    this.cashierProducts.forEach(p => {
      this.TotalAmount += (p.qty * p.price)
    })
    let products = JSON.stringify(this.cashierProducts)
    localStorage.setItem('CashierCart', products)
  }

  AddproductTocart(product: CashierProduct, qty: number) {
    let selectedProduct = product
    selectedProduct.qty = qty
    this.getCashierCart()
    this.cashierProducts.push(selectedProduct)
    this.save()
  }
  RemoveProductFromCart(product_id: string) {
    this.getCashierCart();
    this.cashierProducts = this.cashierProducts.filter(p => p.product_id != product_id);
    this.save()
    console.log(this.cashierProducts)
  }
  RemoveCashierCart() {
    localStorage.removeItem("CashierCart")
  }

  IncreaseDecrease(productid: string, qty: number) {
    this.getCashierCart();
    this.cashierProducts.find(p => {
      if (p.product_id == productid) {
        if (!(p.stock < (p.qty + qty)) && !((p.qty + qty) == 0))
          p.qty += qty
      }
    })
    this.products.find(p => {
      if (p.product_id == productid) {
        if (p.stock < (p.qty + qty))
          this.toastr.error(`Sorry but Product:${p.name} has only ${p.stock} Available in our Stocks`)
        else if (!((p.qty + qty) == 0))
          p.qty += qty
      }
    })
    this.save();
  }

  //* return true if product added into cart
  isChecked(product_id: string) {
    this.getCashierCart();
    return !!this.cashierProducts.find(p => p.product_id == product_id)
  }

  //* Modal
  show() {
    const modalElement = document.getElementById('productModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  //* Making orders
  createOrder(data: any, addInfo: string) {

    this.getCashierCart();
    console.log(this.cashierProducts)
    let address = data.Address
    let governorate = data.city
    let zipcode = data.zipCode
    let phone_number = data.phone_number
    let additional_data = addInfo;
    //     public product:{,name:string,qty:number,price:number,_id:string,pic_path:[string]}[],
    let product = this.cashierProducts.map(p => {
      return {
        product_id: p.product_id,
        seller_id: p.seller?.seller_id || p.seller_id,
        name: p.name,
        qty: p.qty,
        price: p.price,
        pic_path: p.pics,
      }
    })
    this.receipt = product
    let cashier_id = "1"
    let totalPrice = this.TotalAmount
    console.log(product)
    this.cahierService.addCashierOrder({ address, zipcode, phone_number, governorate, product, additional_data, totalPrice })
      .subscribe({
        next: (e) => {
          if (e.data.success) {
            this.RemoveCashierCart()
            console.log(e)
            this.loadProducts(this.currentPage)
            this.form.reset()
            this.TotalAmount = 0;
            this.toastr.success(e.message)
            // window.print()
          } else {
            this.getCashierCart();
            console.log("*********************************")
            console.log(e.data.data.product)
            this.loadProducts(this.currentPage)
            this.toastr.error(e.data.ErrorMsg)
            //  this.cashierProducts=e.data.data.product
            this.Productres = e.data.data.product
            this.cashierProducts.forEach(p => {
              this.Productres.forEach(pr => {
                if (pr.product_id == p.product_id) {
                  p.price = pr.price;
                  p.stock = pr.qty;
                  if (p.qty > p.stock)
                    p.qty = p.stock
                }
              })
            });
            const productIds = new Set(this.Productres.map(product => product.product_id));
            this.cashierProducts = this.cashierProducts.filter(product => productIds.has(product.product_id))
            this.save()
          }
        }
      })
  }

  printPage() {
    window.open("admin/cashier/p/print", "")
  }
}

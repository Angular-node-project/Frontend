import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CashierProduct, ProductResponse } from 'src/app/_models/product';
import { CashierService } from '../_services/cashier.service';
import { ProductService } from 'src/app/admin/_services/products.services';
import { CommonModule, ViewportScroller } from '@angular/common';
export declare const bootstrap: any;
import { ProductsBranchService } from '../_services/products-branch.service';
import { ReceiptComponent } from "./receipt/receipt.component";
import { Modal } from 'bootstrap';


@Component({
  selector: 'app-cahier',
  imports: [FormsModule, CommonModule, RouterLink, ReactiveFormsModule, ReceiptComponent],
  templateUrl: './cashier.component.html',
  styleUrl: './cashier.component.css'
})
export class CahierComponent implements OnDestroy {

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
  sub1!: Subscription;
  sub2!: Subscription;
  currentPage = 1;
  cashierProducts: CashierProduct[] = [];
  TotalAmount = 0;
  Productres: ProductResponse[] = [];

  //*Print Receipt
  receipt: any;

  testRecept() {

    // console.log(this.receipt)
    this.cahierService.testing={name:"Ali"}
    this.cahierService.setData(5)
    // window.open("clerk/cashier/order/receipt/print", "_blank")

     this.router.navigate(['clerk/cashier/order/receipt/print'])

  }

  form: FormGroup = new FormGroup({
    Address: new FormControl('', []),
    AdditionalInfo: new FormControl('', []),
    city: new FormControl('', []),
    zipCode: new FormControl('', []),
    phone_number: new FormControl('', []),

  });


  constructor(private productservice: ProductService,
    private viewPortScroller: ViewportScroller,
    private route: ActivatedRoute,
    private cahierService: CashierService,
    private toastr: ToastrService,
    private productBranchService: ProductsBranchService,
    private router: Router

  ) { }


  ngOnInit() {
    this.sub = this.route.paramMap.subscribe(params => {
      this.currentPage = +params.get('page')!;
      console.log(this.currentPage);
      this.loadProducts2(this.currentPage);
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



  loadProducts2(page: number): void {
     this.sub1=this.productBranchService.getAllPaginatedProducts(page, 'active', this.search).subscribe({
      next: (res) => {
        console.log("********************************************")
        console.log(res);
        console.log("********************************************")
        console.log(res.data);
        console.log("********************************************")

        if (res.status == 201) {
          this.products = res.data.products;
          this.products.forEach(p => {
            p.mainStock = p.qty
            p.qty = 1;
          })
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

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  scrollToTop(): void {
    this.viewPortScroller.scrollToPosition([0, 0])
  }

  changeSearch(name: string): void {
    this.search = name;
    this.currentPage = 1;
    this.loadProducts2(this.currentPage)
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

  saveReceipt(data:any){
    let products = JSON.stringify(data)
    localStorage.setItem('Receipt', products)
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
    this.TotalAmount=0
  }

  IncreaseDecrease(productid: string, qty: number) {
    this.getCashierCart();
    this.cashierProducts.find(p => {
      if (p.product_id == productid) {
        if (!(p.branch_qty < (p.qty + qty)) && !((p.qty + qty) == 0))
          p.qty += qty
      }
    })
    console.log(this.products)
    this.products.find(p => {
      if (p.product_id == productid) {
        if (p.branch_qty < (p.qty + qty)||p.mainStock < (p.qty + qty) )
          this.toastr.error(`Sorry but Product:${p.name} has only ${p.branch_qty<p.mainStock?p.branch_qty:p.mainStock} Available in our Stocks`)
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

  closeModal() {
    const modalElement = document.getElementById('productModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
      modal.hide();
    }}

  //* Making orders
  createOrder(data: any, addInfo: string,isprint:boolean) {

    this.getCashierCart();
    console.log(this.cashierProducts)
    let address = data.Address ||" "
    let governorate = data.city ||" "
    let zipcode = data.zipCode
    let phone_number = data.phone_number||" "
    let additional_data = addInfo||" ";
    let isPrint=isprint
    console.log(isPrint)
    //     public product:{,name:string,qty:number,price:number,_id:string,pic_path:[string]}[],
    let product = this.cashierProducts.map(p => {
      return {
        product_id: p.product_id,
        seller_id:  p.seller_id,
        name: p.name,
        qty: p.qty,
        price: p.price,
        pic_path: p.pics,
      }
    })
    this.receipt = product
    let cashier_id = "1"
    let totalPrice = this.TotalAmount
    this.sub2=this.cahierService.addCashierOrder({ address, zipcode, phone_number, governorate, product, additional_data, totalPrice })
      .subscribe({
        next: (e) => {
          if (e.data.success) {
            if(isPrint){
              this.saveReceipt({ address, zipcode, phone_number, governorate, product, additional_data, totalPrice })
            }
            this.RemoveCashierCart()
            console.log(e.data)
            this.loadProducts2(this.currentPage)
            this.form.reset()
            this.TotalAmount = 0;
            this.toastr.success(e.message)
            this.closeModal()
            if(isPrint)
             window.open("clerk/cashier/order/receipt/print")
          } else {
            this.getCashierCart();
            console.log("*********************************")
            console.log(e.data.data.product)
            this.loadProducts2(this.currentPage)
            this.toastr.error(e.data.ErrorMsg)
            //  this.cashierProducts=e.data.data.product
            this.Productres = e.data.data.product
            this.cashierProducts.forEach(p => {
              this.Productres.forEach(pr => {
                if (pr.product_id == p.product_id) {
                  p.price = pr.price;
                  p.branch_qty = pr.qty;
                  if (p.qty > p.branch_qty)
                    p.qty = p.branch_qty
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

  ngOnDestroy(): void {
    if(this.sub){
      this.sub.unsubscribe();
    }
    if(this.sub1){
      this.sub1.unsubscribe();
    }
    if(this.sub2){
      this.sub2.unsubscribe();
    }
  }




}

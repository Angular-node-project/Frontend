import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductsBranchService } from '../../_services/products-branch.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/_models/product';
import { QtyRequest, QtyRequestClerk } from 'src/app/_models/QtyRequests';

@Component({
  selector: 'app-request-qty',
  imports: [CommonModule, FormsModule],
  templateUrl: './request-qty.component.html',
  styleUrl: './request-qty.component.css'
})
export class RequestQtyComponent implements OnInit ,OnDestroy ,OnChanges{
  constructor(
    private productBranchService: ProductsBranchService
    , private toastr: ToastrService  
  ) { }

  @Output() saveRequests =new EventEmitter<any>();
  sub!: Subscription;
  addedItems: QtyRequestClerk[] = [];
  products: Product[] = [];
  selectedProduct!: Product;
  selectedProductQty!: number;
  qty!: number;
  sub2!:Subscription;
  sub3!:Subscription;

  ngOnInit(): void {
    this.sub = this.productBranchService.getAllActiveProducts().subscribe({
      next: (res) => {
        console.log(res);
        this.products = res.data;

      }, error: (err) => {
        this.toastr.error("something went wrong");
      }
    })
    this.addedItems=[];
  }

  ngOnChanges(): void {
    this.addedItems=[];
  }


  addItem() {
    if (this.selectedProduct && this.qty > 0) {
      const existingItem = this.addedItems.find(i => i.product_id === this.selectedProduct.product_id);

      if (existingItem) {
        var totalQty = parseInt(existingItem.requiredQty.toString()) + parseInt(this.qty.toString());
        if (totalQty > this.selectedProduct.qty) {
          this.toastr.error("you already choose qty before");
        } else {
          existingItem.requiredQty = totalQty;
        }
      } else {
        if (this.selectedProduct.qty < this.qty) {
          this.toastr.error("lease add qty within the available range");
        } else {
          this.addedItems.push({
            product_id: this.selectedProduct.product_id,
            product_name: this.selectedProduct.name,
            requiredQty: this.qty
          });
        }
      }

      this.qty = 0;
      // this.selectedProductQty = 0;
    }
  }

  removeItem(id: string) {
    console.log(id);
    this.addedItems= this.addedItems.filter(b=>b.product_id!=id);
  }
  onselectProduct() {
    //this.selectedProductQty = this.selectedProduct.qty;
    this.sub3=this.productBranchService.getProductBranchQty(this.selectedProduct.product_id).subscribe({
      next:(res)=>{
        this.selectedProductQty=res.data;
      }
    })
  }

  savaRequest(){
    this.sub2=this.productBranchService.addQtyRequests(this.addedItems).subscribe({
      next:(res)=>{
        if(res.status==201){
          this.toastr.success("requesrs added successfully , please wait admin approval");
          this.saveRequests.emit(res);
          this.addedItems=[];
        }else{
          this.toastr.error("something went wrong");
        }
      },error:(err)=>{
        this.toastr.error("something went wrong");
      }
    })
  }
  ngOnDestroy(): void {
    if(this.sub){
      this.sub.unsubscribe();
    }
    if(this.sub2){
      this.sub.unsubscribe();
    }
  }

}

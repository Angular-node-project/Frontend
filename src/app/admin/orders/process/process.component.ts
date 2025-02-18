import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/_models/order';
import { Product } from 'src/app/_models/product';
import { BranchService } from '../../_services/branch.service';
import { Branch } from 'src/app/_models/branch';
import { ProductService } from '../../_services/products.services';

@Component({
  selector: 'app-process',
  imports: [CommonModule, FormsModule],
  templateUrl: './process.component.html',
  styleUrl: './process.component.css'
})
export class ProcessComponent implements OnInit, OnChanges, OnDestroy {
  constructor(private branchService: BranchService
    , private productServie: ProductService
  ) { }
  @Input() selectedOrder!: Order;
  @Output() save = new EventEmitter<any>();
  addedItems: any = [];
  productsOrder: any = [];
  sub!: Subscription;
  activeBranches: any[] = [];
  selectedBranch: Branch | null = null;
  // availableBranchQty!: number;
  addedQty!: number;
  currentSelectedBranches: { [productId: string]: any } = {};
  currentselectedQts: { [productId: string]: number } = {};
  productAssignedBranches: { [productId: string]: { branch: any; qty: number }[] } = {};
  availableBranchQts: { [productId: string]: number } = {};



  ngOnInit(): void {
    this.loadActiveBranches();
    this.productsOrder = this.selectedOrder?.product;
    console.log(this.selectedOrder);
   
  }

  ngOnChanges(): void {
    this.loadActiveBranches();
    this.productsOrder = this.selectedOrder?.product;
    console.log(this.selectedOrder);
  }
  loadActiveBranches() {
    var ids = this.selectedOrder?.product?.map(p => p.product_id);
    this.sub = this.productServie.getBranchesByProductIds(ids).subscribe({
      next: (res) => {
        this.activeBranches = res.data;
        console.log(res.data);
      }, error: (err) => {
        console.log(err);
      }
    })

  }
  onselectBranch(product_id: string) {
    if (!this.currentSelectedBranches[product_id]) {
        console.warn("No branch selected for product:", product_id);
        return;
    }

    // Create a new object reference to trigger Angular change detection properly
    this.availableBranchQts = { ...this.availableBranchQts };

    // Assign the qty of the selected branch for the specific product
    this.availableBranchQts[product_id] = this.currentSelectedBranches[product_id].qty;

    console.log("Updated availableBranchQts:", this.availableBranchQts);
}

// Getter function to dynamically retrieve available quantity per product
getAvailableQty(product_id: string): number {
    return this.availableBranchQts[product_id] || 0;
}
  getProductBranches(product_id: string) {
    //console.log(product_id);
    console.log(this.activeBranches.filter(b => b.product_id == product_id));
    return this.activeBranches.filter(b => b.product_id == product_id);
  }
  addSelecteBranch(product_id: string) {
    console.log("5555");
    if(    this.productAssignedBranches[product_id]==null){    this.productAssignedBranches[product_id]=[]}
    this.productAssignedBranches[product_id].push({ branch: this.currentSelectedBranches[product_id], qty: this.currentselectedQts[product_id] })
    console.log(this.productAssignedBranches[product_id]);
  }
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }


}

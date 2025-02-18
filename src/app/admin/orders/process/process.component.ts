import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { concat, Subscription } from 'rxjs';
import { Order } from 'src/app/_models/order';

import { Branch } from 'src/app/_models/branch';
import { ProductService } from '../../_services/products.services';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../../_services/order.service';

@Component({
  selector: 'app-process',
  imports: [CommonModule, FormsModule],
  templateUrl: './process.component.html',
  styleUrl: './process.component.css'
})
export class ProcessComponent implements OnInit, OnChanges, OnDestroy {
  constructor(private orderService: OrderService
    , private productServie: ProductService
    , private toastr: ToastrService
  ) { }
  @Input() selectedOrder!: Order;
  @Output() save = new EventEmitter<any>();
  addedItems: any = [];
  productsOrder: any = [];
  sub!: Subscription;
  sub2!: Subscription;
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

  }

  ngOnChanges(): void {
    this.loadActiveBranches();
    this.productsOrder = this.selectedOrder?.product;

  }

  loadActiveBranches() {
    var ids = this.selectedOrder?.product?.map(p => p.product_id);
    this.sub = this.productServie.getBranchesByProductIds(ids).subscribe({
      next: (res) => {
        this.activeBranches = res.data;
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
    this.availableBranchQts = { ...this.availableBranchQts };
    this.availableBranchQts[product_id] = this.currentSelectedBranches[product_id].qty;
    console.log("Updated availableBranchQts:", this.availableBranchQts);
  }


  getAvailableQty(product_id: string): number {
    return this.availableBranchQts[product_id] || 0;
  }
  getProductBranches(product_id: string) {
    var productBranches = this.activeBranches.filter(b => b.product_id == product_id);
    var branchesIds = this.productAssignedBranches[product_id]?.map(p => p.branch.branch_id);
    return productBranches.filter(p => !(branchesIds?.includes(p.branch.branch_id)));

  }

  addSelecteBranch(product_id: string) {
    if (!this.productAssignedBranches[product_id]) {
      this.productAssignedBranches[product_id] = [];
    }
    let product = this.productsOrder.find((p: any) => p.product_id == product_id);
    if (!product) {
      this.toastr.error("Product not found.");
      return;
    }
    let totalQty = parseInt(this.currentselectedQts[product_id].toString()) +
      this.productAssignedBranches[product_id].reduce((prev, curr) => parseInt(prev.toString()) + parseInt(curr.qty.toString()), 0);
    if (totalQty > product.qty) {
      console.log(totalQty);
      this.toastr.error("the qty entered must me less or more than the product qty ordered");
    } else {
      this.productAssignedBranches[product_id].push({
        branch: this.currentSelectedBranches[product_id].branch,
        qty: this.currentselectedQts[product_id]
      });

    }
  }
  removeBranch(product_id: string, branch_id: string) {
    var branchesAssigned = this.productAssignedBranches[product_id];
    var branchesAssigned = branchesAssigned.filter(b => b.branch.branch_id != branch_id);
    this.productAssignedBranches[product_id] = branchesAssigned;


  }

  submitForm() {
    for (var product of this.productsOrder) {
      var data = this.productAssignedBranches[product.product_id];
      if (!data) {
        this.toastr.error("all products must assign to branches");
        break;
      }
      var totalQtyAssigned = data.reduce((prev, current) => { return parseInt(prev.toString()) + parseInt(current.qty.toString()) }, 0);
      if (product.qty != totalQtyAssigned) {
        this.toastr.error("all product ordered qty must assign to branches");
        break;
      }
    }
    const expandedOrders = {
      orderId: this.selectedOrder.order_id,
      data: Object.keys(this.productAssignedBranches).flatMap(product_id => {
        const product = this.productsOrder.find((p: any) => p.product_id === product_id);

        return this.productAssignedBranches[product_id].map(branchData => ({
          order_id:this.selectedOrder.order_id,
          product: {
            product_id: product?.product_id || product_id,
            name: product?.name || "Unknown Product"
          },
          branch: {
            branch_id: branchData.branch.branch_id,
            name: branchData.branch.name
          },
          qty: parseInt(branchData.qty.toString())
        }));
      })
    };
    console.log(expandedOrders);

    this.sub2 = this.orderService.assignBranches(expandedOrders).subscribe({
      next: (res) => {
        if (res.status == 201) {
          this.save.emit(res);
          this.toastr.success("order assined to branches successfully");
        } else {
          this.toastr.error("something went wrong");
        }
      }, error: (err) => {
        this.toastr.error("something went wrong");
      }
    })

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

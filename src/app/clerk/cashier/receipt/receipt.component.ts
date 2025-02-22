import { Component, Input, OnInit } from '@angular/core';
import { AuthClerkBranchService } from '../../_services/authClerk.service';
import { CashierReceipt } from 'src/app/_models/cashier';
import { CommonModule } from '@angular/common';
import { ClerkBranch } from 'src/app/_models/clerkBranch';


@Component({
  selector: 'app-receipt',
  imports: [CommonModule],
  templateUrl: './receipt.component.html',
  styleUrl: './receipt.component.css'
})
export class ReceiptComponent implements OnInit {

  constructor(    private authclerk: AuthClerkBranchService){}
  data:any;
  Receipt:CashierReceipt|null=null
  currentTimestamp = Date.now();
  clerkBranchData:ClerkBranch|null=null

  ngOnInit(): void {
    this.clerkBranchData=this.authclerk.getLoggedInData()
    this.getReceipt()
    this.currentTimestamp=Date.now()
    console.log(this.Receipt)
    let checks=window.print()
  }

  getReceipt() {
    const receipt = localStorage.getItem('Receipt');
    if (!receipt) {
      this.Receipt = null;
    } else {
      this.Receipt = JSON.parse(receipt);
    }
  }

}

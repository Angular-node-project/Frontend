import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { AddUpdateComponent } from './admin/products/add-update/add-update.component';
import { PrintReceiptComponent } from './admin/cashier/print-receipt/print-receipt.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [  ],
  imports: [
    BrowserModule,
    // NgbModule,
    CommonModule,
    AddUpdateComponent,
    NgApexchartsModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }

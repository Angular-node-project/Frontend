import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-print-receipt',
  templateUrl: './print-receipt.component.html',
  styleUrls: ['./print-receipt.component.css'], // Fixed styleUrl to styleUrls
})
export class PrintReceiptComponent {
  @Input() receipt: any; // Use @Input decorator for property binding

  print(): void {
    if (this.receipt) {
      console.log('Printing receipt:', this.receipt);
      window.print();
    } else {
      console.warn('No receipt data available.');
    }
  }
}

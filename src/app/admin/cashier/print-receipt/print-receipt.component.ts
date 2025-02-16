import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-print-receipt',
  templateUrl: './print-receipt.component.html',
  styleUrl: './print-receipt.component.css',
})
export class PrintReceiptComponent implements OnInit {
  ngOnInit(): void {
    window.print()
  }

}

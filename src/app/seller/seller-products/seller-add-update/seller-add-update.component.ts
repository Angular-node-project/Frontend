import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-seller-add-update',
  imports: [CommonModule,FormsModule],
  templateUrl: './seller-add-update.component.html',
  styleUrl: './seller-add-update.component.css'
})
export class SellerAddUpdateComponent {
   @Input() product: any = {};
  @Input() isEditMode: boolean = false;
  @Output() saveProduct = new EventEmitter<any>();

  onSubmit() {
    this.saveProduct.emit(this.product);
  }
}

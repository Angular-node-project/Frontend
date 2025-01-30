import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-add-update-product',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-update.component.html',
  styleUrls: ['./add-update.component.css']
})
export class AddUpdateComponent {
  @Input() product: any = {};
  @Input() isEditMode: boolean = false;
  @Output() saveProduct = new EventEmitter<any>();

  onSubmit() {
    this.saveProduct.emit(this.product);
  }
}

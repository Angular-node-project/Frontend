import { Component,Input } from '@angular/core';
import { Product } from '../_models/product';

@Component({
  selector: 'app-customer-product-item',
  imports: [],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
 @Input() product!:Product;
}

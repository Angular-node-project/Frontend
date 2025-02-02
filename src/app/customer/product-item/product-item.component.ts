import { Component,Input } from '@angular/core';
import { Product } from '../../_models/product';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-customer-product-item',
  imports: [RouterLink],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
 @Input() product!:Product;

}

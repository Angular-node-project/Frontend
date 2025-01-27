import { Component } from '@angular/core';
import { ProductItemComponent } from "../product-item/product-item.component";

@Component({
  selector: 'app-customer-all-products',
  imports: [ProductItemComponent],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css'
})
export class AllProductsComponent {

}

import { Component } from '@angular/core';
import { HeaderComponent } from '../_core/header/header.component';
import { ProductItemComponent } from "../product-item/product-item.component";

@Component({
  selector: 'app-customer-home',
  imports: [HeaderComponent, ProductItemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

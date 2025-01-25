import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './_core/header/header.component';
import { FooterComponent } from "./_core/footer/footer.component";

@Component({
  selector: 'app-customer-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {

}

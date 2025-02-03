import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-login',
  imports: [CommonModule,FormsModule],
  templateUrl: './seller-login.component.html',
  styleUrl: './seller-login.component.css'
})
export class SellerLoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onLogin() {
    if (this.email === 'seller@gmail.com' && this.password === '123456') {
      localStorage.setItem('sellerToken', 'true');
      this.router.navigate(['/seller/dashboard']);
    } else {
      console.log('Invalid credentials');
    }

  }
}

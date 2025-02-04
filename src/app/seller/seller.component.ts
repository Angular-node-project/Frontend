import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SellerSideBarComponent } from './seller-side-bar/seller-side-bar.component';
import { HeaderComponent } from './_core/seller-header/seller-header.component';




@Component({
  selector: 'app-seller',
  imports: [RouterOutlet,SellerSideBarComponent,HeaderComponent],
  templateUrl: './seller.component.html',
  styleUrl: './seller.component.css'
})
export class SellerComponent {
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onSidebarLinkClick() {
    if (window.innerWidth <= 768) {
      this.isSidebarOpen = false;
    }
  }
}

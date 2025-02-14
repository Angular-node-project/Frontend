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
/**
 * import { Component } from '@angular/core';
 import { RouterModule } from '@angular/router';
 import { CommonModule } from '@angular/common';
 import { HeaderComponent } from './_core/header/header.component';
 import { SideBarComponent } from './side-bar/side-bar.component';
 
 @Component({
   selector: 'app-admin',
   standalone: true,
   imports: [
     CommonModule,
     RouterModule, 
     HeaderComponent, 
     SideBarComponent
   ],
   templateUrl: './admin.component.html',
   styleUrls: ['./admin.component.css']
 })
 export class AdminComponent {
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
 
 */
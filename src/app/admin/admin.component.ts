import { Component } from '@angular/core';
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

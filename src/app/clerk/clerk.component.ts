import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './_core/header/header.component';
import { SideBarComponent } from './side-bar/side-bar.component';

@Component({
  selector: 'app-clerk',
  imports: [
        CommonModule,
        RouterModule,
        HeaderComponent,
        SideBarComponent,
  ],
  templateUrl: './clerk.component.html',
  styleUrl: './clerk.component.css'
})
export class ClerkComponent {

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

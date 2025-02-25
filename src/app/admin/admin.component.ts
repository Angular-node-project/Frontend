import { Component,NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NgApexchartsModule} from 'ng-apexcharts'
import { HeaderComponent } from './_core/header/header.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { HasPermissionDirective } from './_directives/has-permission.directive';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, 
    HeaderComponent, 
    SideBarComponent,
    NgApexchartsModule,
    HasPermissionDirective
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA],
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

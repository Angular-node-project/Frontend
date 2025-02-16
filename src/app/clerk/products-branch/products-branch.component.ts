import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-products-branch',
  imports: [CommonModule],
  templateUrl: './products-branch.component.html',
  styleUrl: './products-branch.component.css'
})
export class ProductsBranchComponent implements OnInit {

  @Input() isSidebarOpen = false;
  @ViewChild(SideBarComponent) sidebarComponent!: SideBarComponent;

  ngOnInit(): void {
    if (this.sidebarComponent) {
      this.sidebarComponent.sidebarState$.subscribe(
        state => this.isSidebarOpen = state
      );
    }
    // Initialize Bootstrap dropdowns
    import('bootstrap').then(bootstrap => {
      const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
      dropdownElementList.forEach(dropdownToggle => {
        new bootstrap.Dropdown(dropdownToggle);
      });
    });
  }

  
  ngAfterViewInit() {
    if (this.sidebarComponent) {
      this.sidebarComponent.sidebarState$.subscribe(
        state => this.isSidebarOpen = state
      );
    }
  }
  
}

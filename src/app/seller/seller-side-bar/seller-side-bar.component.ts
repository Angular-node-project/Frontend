import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-seller-side-bar',
  imports: [RouterModule, CommonModule],
  templateUrl: './seller-side-bar.component.html',
  styleUrl: './seller-side-bar.component.css'
})
export class SellerSideBarComponent {
  [x: string]: any;

   @Output() linkClick = new EventEmitter<void>();

     private sellerSidebarState = new BehaviorSubject<boolean>(false);
  sellerSidebarState$ = this.sellerSidebarState.asObservable();


  toggleSidebar() {
    this.sellerSidebarState.next(!this.sellerSidebarState.value);
  }

  onLinkClick() {
    this.linkClick.emit();
  }
}

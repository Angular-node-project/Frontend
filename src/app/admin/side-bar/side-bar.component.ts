import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { HasPermissionDirective } from '../_directives/has-permission.directive';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [RouterModule, CommonModule,HasPermissionDirective],
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  @Output() linkClick = new EventEmitter<void>();
  
  private sidebarState = new BehaviorSubject<boolean>(false);
  sidebarState$ = this.sidebarState.asObservable();

  toggleSidebar() {
    this.sidebarState.next(!this.sidebarState.value);
  }

  onLinkClick() {
    this.linkClick.emit();
  }
}

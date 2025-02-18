import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-side-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
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

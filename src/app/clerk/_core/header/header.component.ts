import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { AuthClerkBranchService } from '../../_services/authClerk.service';


@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
 
  constructor(private authClerkBranchService:AuthClerkBranchService){}

  @Output() toggleSidebarEvent = new EventEmitter<void>();
  @Input() isSidebarOpen = false;
  email: string = ""
  role: string = "";

  ngOnInit(): void {
    this.email=this.authClerkBranchService.getLoggedInData().email;
    this.role=this.authClerkBranchService.getLoggedInData().role;
  }
  notifications = [
    {
      id: 1,
      message: 'New order received',
      time: '5 minutes ago',
      isRead: false
    },
    {
      id: 2,
      message: 'Product stock low',
      time: '1 hour ago',
      isRead: false
    },
    {
      id: 3,
      message: 'New user registered',
      time: '2 hours ago',
      isRead: false
    }
  ];
  logout() {
    this.authClerkBranchService.logout();
    window.location.reload();
  }
  markAsRead(notification: any) {
    notification.isRead = true;
  }

  getUnreadCount() {
    return this.notifications.filter(n => !n.isRead).length;
  }

  toggleSidebar() {
    this.toggleSidebarEvent.emit();
  }
}

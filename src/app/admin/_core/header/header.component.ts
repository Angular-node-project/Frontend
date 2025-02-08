import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { AuthAdminService } from '../../_services/authAdmin.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  constructor(private authAdminService:AuthAdminService){}


  @Output() toggleSidebarEvent = new EventEmitter<void>();
  @Input() isSidebarOpen = false;

  email: string =""
  role: string = "";
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

  ngOnInit() {

    this.email=this.authAdminService.getUserData().email;
    this.role=this.authAdminService.getUserData().role_name;
     
    document.querySelectorAll('.dropdown-toggle').forEach(dropdownToggle => {
      new bootstrap.Dropdown(dropdownToggle);
    });
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

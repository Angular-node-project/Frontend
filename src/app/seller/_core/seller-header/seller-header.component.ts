import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-seller-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './seller-header.component.html',
  styleUrls: ['./seller-header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarEvent = new EventEmitter<void>();
  @Input() isSidebarOpen = false;

  email: string = 'seller@gmail.com';
  role: string = 'seller';
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
    // Initialize all dropdowns
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

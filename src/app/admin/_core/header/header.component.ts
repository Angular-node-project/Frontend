import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  email: string = 'admin@gmail.com';
  role: string = 'Admin';
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
}

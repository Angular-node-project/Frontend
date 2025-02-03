import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
declare var bootstrap: any;

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  adminProfile = {
    name: 'John Doe',
    email: 'admin@gmail.com',
    phone: '+1 234 567 890',
    role: 'Administrator',
    joinDate: 'January 15, 2024',
    status: 'Active',
  };

  editedProfile: any = {};
  modal: any;

  openEditModal() {
    this.editedProfile = { ...this.adminProfile };
    const modalEl = document.getElementById('editProfileModal');
    if (modalEl) {
      this.modal = new bootstrap.Modal(modalEl);
      this.modal.show();
    }
  }

  onSubmit() {
    this.adminProfile = { ...this.adminProfile, ...this.editedProfile };
    if (this.modal) {
      this.modal.hide();
    }
  }
}

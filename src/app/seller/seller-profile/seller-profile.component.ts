import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
declare var bootstrap: any;

@Component({
  selector: 'app-seller-profile',
  imports: [CommonModule,FormsModule],
  templateUrl: './seller-profile.component.html',
  styleUrl: './seller-profile.component.css'
})
export class SellerProfileComponent {
  sellerProfile = {
    name: 'John Doe',
    email: 'seller@gmail.com',
    phone: '+1 234 567 890',
    role: 'Seller',
    joinDate: 'January 15, 2024',
    status: 'Active',

  };

  editedProfile: any = {};
  modal: any;

  openEditModal() {
    this.editedProfile = { ...this.sellerProfile };
    const modalEl = document.getElementById('editProfileModal');
    if (modalEl) {
      this.modal = new bootstrap.Modal(modalEl);
      this.modal.show();
    }
  }


  onSubmit() {
    this.sellerProfile = { ...this.sellerProfile, ...this.editedProfile };
    if (this.modal) {
      this.modal.hide();
    }
  }

}

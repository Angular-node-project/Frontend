import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProfileModalComponent } from './edit-profile-modal.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, EditProfileModalComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  isEditModalOpen = false;
  adminProfile = {
    name: 'John Doe',
    email: 'admin@gmail.com',
    phone: '+1 234 567 890',
    role: 'Administrator',
    joinDate: 'January 15, 2024',
    status: 'Active',
  };

  openEditModal() {
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
  }

  updateProfile(updatedData: any) {
    // Create a copy of the profile to update
    const updatedProfile = { ...this.adminProfile };
    
    // Update only editable fields
    updatedProfile.name = updatedData.name;
    updatedProfile.email = updatedData.email;
    updatedProfile.phone = updatedData.phone;
    
    // Update the profile
    this.adminProfile = updatedProfile;
    
    // Close modal
    this.closeEditModal();
    
    // Here you would typically make an API call to update the backend
    console.log('Profile updated:', this.adminProfile);
  }
}

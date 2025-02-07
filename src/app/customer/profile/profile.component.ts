import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent  {
  adminProfile = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+1234567890',
    address: '123 Green Street, Plant City, Earth',
    gender:'male',
  };

  editedProfile: any = {};
  selectedTab: string = 'profile'; // Default tab
 

  
  selectTab(tab: string) {
    this.selectedTab = tab; // Change the selected tab
  }

  saveProfile() {
    console.log('Profile Saved:', this.adminProfile);
  }
}

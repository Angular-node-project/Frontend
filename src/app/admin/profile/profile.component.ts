import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthAdminService } from '../_services/authAdmin.service';
import { AuthenticatedClerk } from 'src/app/_models/clerk';
declare var bootstrap: any;

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  adminProfile:AuthenticatedClerk|null =null;
  constructor(private authAdminService:AuthAdminService){}
  ngOnInit(): void {
    this.adminProfile=this.authAdminService.getUserData();
  }

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

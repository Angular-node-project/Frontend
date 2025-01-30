import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-profile-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal-overlay" *ngIf="isOpen">
      <div class="modal-container">
        <div class="modal-header">
          <h3>Edit Profile</h3>
          <button class="close-btn" (click)="close()">×</button>
        </div>
        <div class="modal-body">
          <form (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label>Full Name</label>
              <input type="text" class="form-control" [(ngModel)]="profileData.name" name="name">
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" class="form-control" [(ngModel)]="profileData.email" name="email">
            </div>
            <div class="form-group">
              <label>Phone</label>
              <input type="tel" class="form-control" [(ngModel)]="profileData.phone" name="phone">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn-cancel" (click)="close()">Cancel</button>
              <button type="submit" class="btn-save">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-container {
      background: white;
      border-radius: 12px;
      width: 90%;
      max-width: 500px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .modal-header {
      padding: 20px;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .modal-header h3 {
      margin: 0;
      color: #2d4739;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: #666;
    }

    .modal-body {
      padding: 20px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      display: block;
      margin-bottom: 8px;
      color: #2d4739;
    }

    .form-control {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 14px;
    }

    .modal-footer {
      padding-top: 20px;
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }

    .btn-cancel, .btn-save {
      padding: 8px 16px;
      border-radius: 6px;
      border: none;
      cursor: pointer;
      font-size: 14px;
    }

    .btn-cancel {
      background: #f0f0f0;
      color: #333;
    }

    .btn-save {
      background: #4CAF50;
      color: white;
    }

    .btn-save:hover {
      background: #43a047;
    }
  `]
})
export class EditProfileModalComponent {
  @Input() isOpen = false;
  @Input() profileData: any = {};
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveChanges = new EventEmitter<any>();

  close() {
    this.closeModal.emit();
  }

  onSubmit() {
    this.saveChanges.emit(this.profileData);
    this.close();
  }
} 
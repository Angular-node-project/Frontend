import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthSellerService } from '../_services/authSeller.service';
import { Seller } from 'src/app/_models/sellers';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
declare var bootstrap: any;

@Component({
  selector: 'app-seller-profile',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './seller-profile.component.html',
  styleUrl: './seller-profile.component.css'
})
export class SellerProfileComponent implements OnInit {

  constructor(private authSeller: AuthSellerService, private authService:AuthService, private toastr:ToastrService) { }

  editedProfile!: Seller;
  sellerProfile!: Seller;
  modal: any;
  form!: FormGroup;
  sub!: Subscription;



  ngOnInit(): void {
    this.sellerProfile = this.authSeller.getLoggedInData();
    this.form = new FormGroup({
      name: new FormControl(this.sellerProfile?.name, [Validators.required]),
      email: new FormControl({ value: this.sellerProfile?.email, disabled: true }, [Validators.required, Validators.email]),
      national_id: new FormControl({ value: this.sellerProfile?.national_id, disabled: true }, [
        Validators.required,
        // Validators.pattern(/^\d{15}$/) 
      ]),
      registeration_number: new FormControl({ value: this.sellerProfile?.registeration_number, disabled: true }),
      phone_number: new FormControl(this.sellerProfile?.phone_number, [Validators.required]),
    });
  }

  openEditModal() {
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

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    } else {

      this.sub = this.authSeller.updateProfile(this.form.getRawValue()).subscribe({
        next: (res) => {
          console.log(res.status);
          if (res.status == 201) {
            this.toastr.success("profile updated successfully");
            this.authService.saveToken(res.data);
            window.location.reload();

          } else {
            this.toastr.error("something went wrong , please try again later");
          }
        }, error: (err) => {
          this.toastr.error("something went wrong , please try again later");
        }
      })

    }
  }

}

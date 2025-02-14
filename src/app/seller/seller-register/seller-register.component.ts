import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthSellerService } from '../_services/authSeller.service';
import { Seller } from 'src/app/_models/sellers';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './seller-register.component.html',
  styleUrl: './seller-register.component.css'
})
export class SellerRegisterComponent implements OnInit {
  constructor(
    private authsellerService: AuthSellerService,
    private toastre: ToastrService,
    private router: Router
  ) { }

  sub!: Subscription;
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    national_id: new FormControl('', [
      Validators.required,
      // Validators.pattern(/^\d{15}$/) 
    ]),
    registeration_number: new FormControl(''),
    phone_number: new FormControl('', [Validators.required]),
  });


  register() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    } else {

      this.sub = this.authsellerService.register(this.form.value).subscribe({
        next: (res) => {
          if (res.status == 201) {
            this.router.navigate(['/seller/request']);
          } else {
            this.toastre.error("something went wrong , please try again later");
          }
        }, error: (err) => {
          this.toastre.error("something went wrong , please try again later");
        }
      })

    }
  }
  ngOnInit(): void {

  }


}

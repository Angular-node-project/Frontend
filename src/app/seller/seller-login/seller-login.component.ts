import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthSellerService } from '../_services/authSeller.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-seller-login',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './seller-login.component.html',
  styleUrl: './seller-login.component.css'
})
export class SellerLoginComponent implements OnDestroy {


  constructor(
    private router: Router,
    private authSellerService: AuthSellerService,
    private toastr: ToastrService,
    private authGenrealService:AuthService

  ) { }

  sub!: Subscription;
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  onLogin() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    } else {
      this.sub = this.authSellerService.login(this.form.value.email, this.form.value.password).subscribe({
        next: (res) => {
          if (res.status == 201) {
            this.toastr.success("login successfully");
            this.authGenrealService.saveToken(res.data);
            this.router.navigate(["seller/dashboard"]);
          } else {
            this.toastr.error(res.message);
          }
        }, error: (err) => {
          this.toastr.error(err.error.message);
        }
      })
    }

  }
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}

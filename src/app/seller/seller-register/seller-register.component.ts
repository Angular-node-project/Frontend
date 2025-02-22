import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
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


export class SellerRegisterComponent implements OnDestroy {
  constructor(
    private authsellerService: AuthSellerService,
    private toastre: ToastrService,
    private router: Router
  ) { }
  
  showPassword = false;
  sub!: Subscription;
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.com$')]),
    national_id: new FormControl('', [
      Validators.required,
      // Validators.pattern(/^\d{15}$/) 
    ]),
    registeration_number: new FormControl(''),
    phone_number: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{11,}$')
    ])
    
  });


  register() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    } else {

      this.sub = this.authsellerService.register(this.form.value).subscribe({
        next: (res) => {
          console.log(res.status);
          if (res.status == 201) {
            console.log(res);
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

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}

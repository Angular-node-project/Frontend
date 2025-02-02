import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthCustomerService } from '../_services/authCustomer.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService as AuthServiceGeneral } from '../../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private authCustomerService: AuthCustomerService,private authServiceGeneral: AuthServiceGeneral, private toastr: ToastrService, private router: Router) { }
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    gender: new FormControl('', [Validators.required]),
    address: new FormControl(''),
    phone_number: new FormControl(''),
  });

  register() {
    this.authCustomerService.register(this.form.value).subscribe({
      next: (response) => {
        this.authServiceGeneral.saveToken(response.data.token);
        this.toastr.success('Registration successful');
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.toastr.error('Registration failed');
      }
    });
  }
}

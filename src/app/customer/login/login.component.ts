import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthCustomerService as AuthCustomerService } from '../_services/authCustomer.service';
import { AuthService as AuthServiceGeneral } from '../../_services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private toastr: ToastrService, private authService: AuthCustomerService, private authServiceGeneral: AuthServiceGeneral, private router: Router) { }
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  login() {
    this.authService.login(this.form.value.email, this.form.value.password).subscribe({
      next: (response) => {
        console.log(response);
        this.authServiceGeneral.saveToken(response.data);
        this.toastr.success('Login successful');
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.toastr.error('Login failed');
        console.log(error);
      },
      complete: () => {
        console.log("Login successful");
      }
    })
  }
}

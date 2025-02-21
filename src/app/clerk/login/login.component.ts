import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthClerkBranchService } from '../_services/authClerk.service';
import { AuthService } from 'src/app/_services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule ,CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
showPassword = false;
  constructor(private router: Router
    , private authClerkBranchService: AuthClerkBranchService
    , private authGeneralService: AuthService
    , private toastr: ToastrService
  ) { }

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  onLogin() {
    this.authClerkBranchService.login(this.form.value.email, this.form.value.password).subscribe({
      next: (response) => {
        if (response.status == 201) {
          this.authGeneralService.saveToken(response.data);
          this.toastr.success("login sucess");
          this.router.navigate(['/clerk']);
        } else {
          this.toastr.error(response.message);
        }

      },
      error:(error)=>{
        this.toastr.error(error.error.message);
      }
    })
  }
}

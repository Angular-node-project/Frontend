import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthAdminService } from '../_services/authAdmin.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class AdminLoginComponent {

  constructor(private router: Router
    , private authAdminService: AuthAdminService
    , private authGeneralService: AuthService
    , private toastr: ToastrService
  ) { }

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  onLogin() {
    this.authAdminService.login(this.form.value.email, this.form.value.password).subscribe({
      next: (response) => {
        if (response.status == 201) {
          this.authGeneralService.saveToken(response.data);
          this.toastr.success("login sucess");
          this.router.navigate(['/admin']);
        } else {
          this.toastr.error(response.message);
        }

      },
      error:(error)=>{
        this.toastr.error("something went wrong");
      }
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CustomerService } from 'src/app/_models/customerservice';
import { Customerservice } from '../_services/customerservice.service';

@Component({
  selector: 'app-contact-us',
  imports: [FormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {

  name: string = '';
  email: string = '';
  inquiry: string = '';

  constructor(private customerservice: Customerservice, private toastr: ToastrService) {}

  sendmessage() {
    const data = { email: this.email, name: this.name, inquiry: this.inquiry };
    
    this.customerservice.SendMessaege(data).subscribe({
      next: (response) => {
        this.toastr.success("Email sent successfully!");
        this.resetForm(); 
      },
      error: (response) => {
        this.toastr.error("Failed to send email.");
      }
    });
  }

  resetForm() {
    this.name = '';
    this.email = '';
    this.inquiry = '';
  }
}

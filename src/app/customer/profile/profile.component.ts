import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { CustomerProfileInfo, UpdatedCustomerProfileInfo } from 'src/app/_models/customer';
import { AuthCustomerService } from '../_services/authCustomer.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../_services/cart.service';
import { Order } from 'src/app/_models/order';
import { formatDate } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  isName = true;
  isAddress = true;
  isphone = true;

  sub1!: Subscription
  sub2!: Subscription
  sub3!: Subscription
  sub4!: Subscription


  validateName() {
    this.isName = this.adminProfile.name.trim().length >= 6
  }
  validateAddress() {
    this.isAddress = this.adminProfile.address.trim().length >= 6
  }
  validatePhone() {
    const pattern = /^(011|012|010|015)\d{8}$/;
    this.isphone = pattern.test(this.adminProfile.phone.trim())
  }


  adminProfile: CustomerProfileInfo = {
    name: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
  };

  orders: Order[] = []

  editedProfile: UpdatedCustomerProfileInfo | null = null;
  selectedTab: string = 'profile'; // Default tab


  constructor(private customerService: AuthCustomerService,private viewPortScroller:ViewportScroller, private toastr: ToastrService, private cartService: CartService) { }
  ngOnInit(): void {
    this.sub1 = this.customerService.getProfileInfo().subscribe(
      {
        next: (e) => {
          this.adminProfile.name = e.data.name
          this.adminProfile.email = e.data.email
          this.adminProfile.phone = e.data.phone_number
          this.adminProfile.address = e.data.address
          this.adminProfile.gender = e.data.gender
        }
      }
    )

  this.loadCustomerOrder();

  }

  loadCustomerOrder(){
    this.sub2 = this.cartService.getOrder().subscribe({
      next: (e) => {
        this.orders = e.data
        this.orders.forEach(o => {
          o.createdAt = formatDate(o.createdAt, 'yyyy-MM-dd', 'en-US');
        })
      }
    })
  }

  selectTab(tab: string) {
    this.selectedTab = tab; // Change the selected tab
  }

  saveProfile(currentPassword: string, newPassword: string) {

    if (this.isAddress && this.isName && this.isphone) {
      if ((currentPassword.trim().length >= 6 && newPassword.trim().length >= 6) || (currentPassword.trim().length == 0 && newPassword.trim().length == 0)) {
        let updatedprofile: UpdatedCustomerProfileInfo = {
          // customer_id:"7a3f6369-37c9-4b00-b9a3-b6181a54eb0e",
          name: this.adminProfile.name,
          email: this.adminProfile.email,
          phone_number: this.adminProfile.phone,
          address: this.adminProfile.address,
          gender: this.adminProfile.gender,
          currentPassword: currentPassword,
          newPassword: newPassword
        }
        this.sub3 = this.customerService.updateProfileInfoWithPassword(updatedprofile).subscribe({
          next: (e) => {
            console.log(e);
            if (e.status != 201) {
              this.toastr.error(e.message)
            } else {
              
              this.toastr.success(e.message)
            }
            this.scrollToTop();
            this.adminProfile.name = e.data.name
            this.adminProfile.address = e.data.address
            this.adminProfile.phone = e.data.phone_number
            this.adminProfile.gender = e.data.gender
          }, error: (err) => {
            console.log(err)
          }
        })
      }
      else {
        if (currentPassword.trim().length > 0) {
          if (!newPassword) {
            console.log("New Password is required")
            this.toastr.error("New Password is required")
          }
        } else if (currentPassword.trim().length > 0) {
          if (!newPassword) {
            console.log("current Password is required")
            this.toastr.error("current Password is required")

          }
        }
        if (currentPassword.trim().length < 6 || newPassword.trim().length < 6) {
          this.toastr.error("Password is Too short min length is:6")

        }
      }

    }

  }


  //* Styling
  getStatusIcon(status: String) {
    switch (status) {
      case 'pending':
        return 'clock';
      case 'processing':
        return 'cog';
      case 'shipped':
        return 'truck';
      case 'cancelled':
        return 'times-circle';
      case 'delivered':
        return 'check-circle';
      default:
        return 'question-circle';
    }
  }

  cancelOrder(order_id: string) {
    this.sub4 = this.customerService.cancelOrder(order_id).subscribe({
      next: (value) => {
        this.scrollToTop();
        this.toastr.success("order  cancelled successfully");
        this.loadCustomerOrder();
      },
      error: (err) => {
        this.scrollToTop();
        this.toastr.error(err.error.message);
        this.loadCustomerOrder();
      }
    })
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe()
    }
    if (this.sub2) {
      this.sub2.unsubscribe()
    }
    if (this.sub3) {
      this.sub3.unsubscribe()
    }
  }



  scrollToTop(): void {
    this.viewPortScroller.scrollToPosition([0, 0]);
  }

}





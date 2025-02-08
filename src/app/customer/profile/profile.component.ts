import { Component, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { CustomerProfileInfo, UpdatedCustomerProfileInfo } from 'src/app/_models/customer';
import { AuthCustomerService } from '../_services/authCustomer.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../_services/cart.service';
import { Order } from 'src/app/_models/order';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  adminProfile:CustomerProfileInfo = {
    name: '',
    email: '',
    phone: '',
    address: '',
    gender:'',
  };
  // orders=[{
  //   order_id:"1",
  //   product:[{product_name:"22",qty:2}],
  //   total:20,
  //   status:"a"
  // }]
  orders:Order[]=[]

  isEdit=false;
  editedProfile: UpdatedCustomerProfileInfo|null = null;
  selectedTab: string = 'profile'; // Default tab


    constructor(private customerService:AuthCustomerService,private toastr: ToastrService,private cartService:CartService){}
  ngOnInit(): void {
    this.customerService.getProfileInfo().subscribe(
      {
        next:(e)=>{
          this.adminProfile.name=e.data.name
          this.adminProfile.email=e.data.email
          this.adminProfile.phone=e.data.phone_number
          this.adminProfile.address=e.data.address
          this.adminProfile.gender=e.data.gender
        }
      }
    )

    this.cartService.getOrder("7a3f6369-37c9-4b00-b9a3-b6181a54eb0e").subscribe({
      next:(e)=>{
        console.log(this.orders)
        console.log("***********************************")
        console.log(e)
        console.log("***********************************")
        this.orders=e.data
        console.log(this.orders)

      }
    })

  }

  selectTab(tab: string) {
    this.selectedTab = tab; // Change the selected tab
  }

  saveProfile(currentPassword:string,newPassword:string) {
    console.log(currentPassword,newPassword)
    if(this.isEdit){
      if(currentPassword.length<6 || newPassword.length<6){
        console.log("TOoooooooooooo Short ")
      }else{
        let updatedprofile:UpdatedCustomerProfileInfo={
          customer_id:"7a3f6369-37c9-4b00-b9a3-b6181a54eb0e",
          name:this.adminProfile.name,
          email:this.adminProfile.email,
          phone_number :this.adminProfile.phone,
          address:this.adminProfile.address,
          gender:this.adminProfile.gender,
          currentPassword:currentPassword,
          newPassword:newPassword
        }
        this.customerService.updateProfileInfoWithPassword(updatedprofile).subscribe({
          next:(e)=>{
            console.log(e);
            this.toastr.success(e.message)
            this.adminProfile.name=e.data.name
            this.adminProfile.address=e.data.address
            this.adminProfile.phone=e.data.phone_number
            this.adminProfile.gender=e.data.gender
          },error:(err)=>{

            console.log("Error")
            console.log(err)
          }
        })


      }

    }else{
      let profile={
        customer_id:"7a3f6369-37c9-4b00-b9a3-b6181a54eb0e",
        name:this.adminProfile.name,
        phone_number:this.adminProfile.phone,
        email:this.adminProfile.email,
        address:this.adminProfile.address,
        gender:this.adminProfile.gender,
      }
      this.customerService.updateProfileInfoWithoutPassword(profile).subscribe({
        next:(e)=>{
          console.log(e);
          this.toastr.success(e.message)
          this.adminProfile.name=e.data.name
          this.adminProfile.address=e.data.address
          this.adminProfile.phone=e.data.phone_number
          this.adminProfile.gender=e.data.gender
        },error:(err)=>{
          console.log("Error")
          console.log(err)
        }
      })
    }
    }

  }


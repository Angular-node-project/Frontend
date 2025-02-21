import { Component, OnInit } from '@angular/core';
import { AuthClerkBranchService } from '../_services/authClerk.service';
import { ClerkBranch } from 'src/app/_models/clerkBranch';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  constructor(private authClerk:AuthClerkBranchService ){}
  profileData!:ClerkBranch; 

  ngOnInit(): void {
      this.profileData=this.authClerk.getLoggedInData();
  }


}

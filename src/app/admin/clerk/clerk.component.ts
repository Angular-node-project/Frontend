import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Clerk } from 'src/app/_models/clerk';
import { CommonModule } from '@angular/common'; // Import CommonModule



@Component({
  selector: 'app-clerk',
  imports: [FormsModule,CommonModule],
  templateUrl: './clerk.component.html',
  styleUrl: './clerk.component.css'
})
export class ClerkComponent {


  clerks:Clerk[]=[
    {"clerk_id":"1","name":"Ali","email":"Ali@Ali.com","password":"123456","role_id":"123","status":"active"},
    {"clerk_id":"2","name":"Yousef","email":"Yousef@Yousef.com","password":"123456","role_id":"456","status":"inactive"},
    {"clerk_id":"3","name":"Ba7Ba7","email":"Ba7Ba7@Ba7Ba7.com","password":"123456","role_id":"789","status":"active"}
  ]

    constructor() {}



}

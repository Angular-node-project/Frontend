import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Clerk } from 'src/app/_models/clerk';
import { CommonModule } from '@angular/common';
import { ClerksService } from '../_services/clerks.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-clerk',
  imports: [FormsModule, CommonModule,RouterLink],
  templateUrl: './clerk.component.html',
  styleUrl: './clerk.component.css'
})
export class ClerkComponent implements OnInit ,OnDestroy {

  constructor(
    private clerkService: ClerksService
    , private activeRoute: ActivatedRoute
  ) { }

  sub!: Subscription;
  sub2!:Subscription;
  currentPage = 1;
  clerks: Clerk[] = [];
  totalPages!:number;
  totalResults!:number;
  ngOnInit(): void {

    this.sub = this.activeRoute.paramMap.subscribe(params => {
      this.currentPage= +params.get('page')!;
      console.log("fdgfd",params.get('page'));
      this.sub2 =this.clerkService.getAllClerks(this.currentPage).subscribe({
        next:(response)=>{
          if(response.status==201){
            this.clerks=response.data.updatedClerks;
            this.totalPages = response.data.totalPages;
            this.totalResults = response.data.totalClerksCount;
            console.log(response.data);
          }
        },
        error:(err)=>{
          console.log(err);
        }
      })
    })
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }
  

}

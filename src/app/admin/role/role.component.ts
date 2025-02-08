import { Component } from '@angular/core';
import { RolesService } from '../_services/roles.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Role } from 'src/app/_models/role-permisssion';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-role',
  imports: [RouterLink,CommonModule],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent {

   constructor(
      private roleService: RolesService
      , private activeRoute: ActivatedRoute
    ) { }
  
    sub!: Subscription;
    sub2!:Subscription;
    currentPage = 1;
    roles: Role[] = [];
    totalPages!:number;
    totalResults!:number;
    ngOnInit(): void {
  
      this.sub = this.activeRoute.paramMap.subscribe(params => {
        this.currentPage= +params.get('page')!;
        this.sub2 =this.roleService.getAllClerks(this.currentPage).subscribe({
          next:(response)=>{
            if(response.status==201){
              this.roles=response.data.roles;
              this.totalPages = response.data.totalPages;
              this.totalResults = response.data.totalRolesCount;
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

import { Component } from '@angular/core';
import { RolesService } from '../_services/roles.service';
import { ActivatedRoute, RouterEvent, RouterLink } from '@angular/router';
import { debounce, debounceTime, Subject, Subscription } from 'rxjs';
import { Permission, Role } from 'src/app/_models/role-permisssion';
import { CommonModule } from '@angular/common';
import { AddUpdateComponent } from './add-update/add-update.component';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
export declare const bootstrap: any;

@Component({
  selector: 'app-role',
  imports: [RouterLink, CommonModule, AddUpdateComponent, FormsModule],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent {

  constructor(
    private roleService: RolesService
    , private activeRoute: ActivatedRoute
    , private toastr: ToastrService
  ) { }

  sub!: Subscription;
  sub2!: Subscription;
  sub3!: Subscription;
  currentPage = 1;
  roles: Role[] = [];
  permissions: Permission[] = [];
  totalPages!: number;
  totalResults!: number;
  isEditMode!: boolean;
  selectedRole!: Role;
  roleToDeleteId: string | null = null;
  roleToDeleteName: string | null = null;
  searchedInput: string = '';

  private searchSubject = new Subject<string>()

  ngOnInit(): void {

    this.sub = this.activeRoute.paramMap.subscribe(params => {
      this.currentPage = +params.get('page')!;
      this.loadRoles();

    })
    this.searchSubject.pipe(debounceTime(500)).subscribe((query)=>{
      this.fetchRoles(query);
    })
  }

  onSearchChange(){
    this.searchSubject.next(this.searchedInput);
  }

  fetchRoles(query: string) {
    this.sub2 = this.roleService.getAllRoles(this.currentPage,query).subscribe({
      next: (response) => {
        if (response.status == 201) {
          this.roles = response.data.roles;
          this.totalPages = response.data.totalPages;
          this.totalResults = response.data.totalRolesCount;
          console.log(response.data);
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  loadRoles() {
   this.fetchRoles('');
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  onSaveRole(Role: any) {
    const modalElement = document.getElementById('RoleModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
      this.loadRoles();
    }

  }

  addNewRole() {
    this.isEditMode = false;
    this.selectedRole = new Role('', '', [], '');
    const modalElement = document.getElementById('RoleModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  openEditModal(item: Role) {
    this.isEditMode = true;
    this.selectedRole = item;
    const modalElement = document.getElementById('RoleModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }


  changeStatus(role_id: string, status: string) {
    this.sub3 = this.roleService.updateRoleStatus(role_id, status).subscribe({
      next: (response) => {
        if (response.data != 0) {
          this.toastr.success("status changed successfully");
        } else {
          this.toastr.error("role not found");
        }
        this.loadRoles();
      },
      error: (err) => {
        this.toastr.error("something went wrong");
      }
    })
  }


  openDeleteModal(role: Role) {
    this.roleToDeleteId = role.role_id;
    this.roleToDeleteName = role.name;
    const modalElement = document.getElementById('deleteModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  confirmDelete() {
    if (this.roleToDeleteId) {
      this.changeStatus(this.roleToDeleteId, 'deleted');
      const modalElement = document.getElementById('deleteModal');
      if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
      }
      this.roleToDeleteId = null;
    }
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
    if (this.sub3) {
      this.sub2.unsubscribe();
    }
  }



}

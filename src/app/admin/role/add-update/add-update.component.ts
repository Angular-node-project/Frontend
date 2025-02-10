import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Permission, Role } from 'src/app/_models/role-permisssion';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RolesService } from '../../_services/roles.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-update-role',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-update.component.html',
  styleUrl: './add-update.component.css'
})
export class AddUpdateComponent implements OnInit, OnDestroy, OnChanges {
  @Input() selectedRole!: Role;
  @Input() isEditMode: boolean = false;
  @Output() saveRole = new EventEmitter<any>();
  sub3!: Subscription;
  data: Permission[] = [];
  selectedPermissions: Permission[] = [];
  groupedPermissions: { [key: string]: { action: string; permission_id: string }[] } = {};
  roleData:Role=new Role('','',[],'');

  constructor(
    private roleService: RolesService,
    private toastr: ToastrService
  ) { }

  isChecked(permissionId: string): boolean {
    return this.selectedPermissions.some(p => p.permission_id === permissionId);
  }

  ngOnInit(): void {
    this.loadPermissions();
  }


  ngOnChanges(): void {
    if (this.isEditMode) {
      this.roleData.role_id=this.selectedRole.role_id;
      this.roleData.name = this.selectedRole.name;
      this.selectedPermissions=this.selectedRole.permissions;
      this.roleData.status=this.selectedRole.status;

    }else{
      this.roleData.role_id='';
      this.roleData.name = ''
      this.selectedPermissions=[];
      this.roleData.status='';
    }
  }

  loadPermissions() {
    this.sub3 = this.roleService.getAllPermissions().subscribe({
      next: (response) => {
        if (response.status == 201) {
          this.data = response.data;
          this.groupedPermissions = this.data.reduce((acc, perm) => {
            if (!acc[perm.controller]) {
              acc[perm.controller] = [];
            }
            acc[perm.controller].push({ action: perm.action, permission_id: perm.permission_id });
            return acc;
          }, {} as { [key: string]: { action: string; permission_id: string }[] });

          console.log(this.groupedPermissions);
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  togglePermission(controller: string, action: string, permission_id: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    console.log(checked);
    if (checked) {
      if (!this.selectedPermissions.some(perm => perm.permission_id === permission_id)) {
        this.selectedPermissions.push({ controller, action, permission_id });
      }
    } else {
      this.selectedPermissions = this.selectedPermissions.filter(perm => perm.permission_id !== permission_id);
    }

  }

  saveData() {
    this.roleData.permissions=this.selectedPermissions;
    if (this.isEditMode) {
      this.roleService.updateRole(this.roleData).subscribe({
        next:(response)=>{
           if(response.data!=0){
            this.toastr.success("role updated successfully");
           }else{
            this.toastr.error("role is not existed");
           }
           this.saveRole.emit(response);
        },error:(err)=>{
           console.log("something went wrong");
        }
      })

    } else {
      this.roleData.status='active';
      this.roleService.saveRole(this.roleData).subscribe({
        next: (response) => {
          if (response.status == 201) {
            this.saveRole.emit(response);
            this.toastr.success("role added successfully");
          }
        },
        error:(err)=>{
          this.toastr.error("something went wrong");
        }
      })

    }

  }

  ngOnDestroy(): void {
    if (this.sub3) {
      this.sub3.unsubscribe();
    }
  }

}

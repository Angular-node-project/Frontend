import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Clerk } from 'src/app/_models/clerk';
import { RolesService } from '../../_services/roles.service';
import { Role } from 'src/app/_models/role-permisssion';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ClerksService } from '../../_services/clerks.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-update-clerk',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-update.component.html',
  styleUrl: './add-update.component.css'
})
export class AddUpdateComponent implements OnInit, OnDestroy,OnChanges {
  @Input() selectedClerk!: Clerk;
  @Input() isEditMode!: boolean ;
  @Output() saveClerk = new EventEmitter<any>();
  clerkForm!: FormGroup;
  activeRoles: Role[] = [];
  sub!: Subscription;
  clerkData!:Clerk;

  constructor(private fb: FormBuilder
    , private roleService: RolesService
    , private clerkService:ClerksService 
    , private toastr :ToastrService 
  ) { }


  ngOnChanges(): void {
    console.log(this.isEditMode);
    if(this.isEditMode){
      this.clerkData=this.selectedClerk;
      console.log(this.clerkData);
      this.clerkForm = this.fb.group({
        clerk_id: [this.clerkData?.clerk_id || ''],
        name: [this.clerkData?.name || '', [Validators.required, Validators.minLength(3)]],
        email: [this.clerkData?.email || '', [Validators.required, Validators.email]],
        role_id: [this.clerkData?.role_id || '', Validators.required],
      });
    }else{
      this.resetForm();
    }

  }

  ngOnInit() {

    
      this.clerkForm = this.fb.group({
        clerk_id: [''],
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        role_id: ['', Validators.required],
      });
    
    this.sub = this.roleService.getActiveRoles().subscribe({
      next: (res) => {
        console.log(res.data);
        this.activeRoles = res.data;
      }
    })
    this.resetForm();

  }

  onSubmit() {
    if(this.isEditMode) {
      console.log(this.clerkForm.value);
       this.clerkService.update(this.clerkForm.value).subscribe({
        next:(res)=>{
           this.toastr.success("clerk added successfully");
           this.saveClerk.emit(res);
           this.resetForm();
        },error:(err)=> {
          this.toastr.error("something went wrong");
        }

       })
    } else {

      this.clerkService.save(this.clerkForm.value).subscribe({
        next:(res)=>{
           this.toastr.success("clerk added successfully");
           this.saveClerk.emit(res);
           this.resetForm();
        },error:(err)=> {
          this.toastr.error("something went wrong");
        },
       })
    }
  }
  resetForm(){
    this.clerkForm.reset({
      clerk_id: '',
      name: '',
      email: '',
      role_id: ''
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}

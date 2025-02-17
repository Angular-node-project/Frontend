import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ClerkBranch } from 'src/app/_models/clerkBranch';
import { ClerkBranchService } from '../../_services/clerkBranch.service';
import { ActivatedRoute } from '@angular/router';
import { BranchService } from '../../_services/branch.service';
import { Branch } from 'src/app/_models/branch';

@Component({
  selector: 'app-add-update',
  imports: [FormsModule,CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './add-update.component.html',
  styleUrl: './add-update.component.css'
})
export class AddUpdateComponent implements OnInit,OnChanges {
 @Input() selectedClerkBranch!: ClerkBranch;
  @Input() isEditMode!: boolean ;
  @Output() saveClerk = new EventEmitter<any>();
  clerkBranchForm!: FormGroup;
  
  sub!: Subscription;
  clerkBranchData!:any;
branches:Branch[]=[]
  constructor(private fb: FormBuilder
    , private clerkbranchservice:ClerkBranchService 
    , private toastr :ToastrService 
    ,private route:ActivatedRoute
    ,private branchservice:BranchService
  ) { }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedClerkBranch'] && this.isEditMode) {
      this.clerkBranchData = { ...this.selectedClerkBranch };
  
      
      this.clerkBranchForm = this.fb.group({
        name: [this.clerkBranchData.name || '',[Validators.required, Validators.minLength(3)]],
        email: [this.clerkBranchData.email || '',[Validators.required,Validators.email]],
        role: [this.clerkBranchData.role || '',[Validators.required]],
        branch: [this.branches.find(b => b.branch_id === this.clerkBranchData.branch?.branch_id) || null,[Validators.required]]
      });
    } else {
      this.resetForm();
    }
  }
  
  loadBranches(){
    this.branchservice.getAllActiveBranches().subscribe({
      next:(response)=>{
        this.branches=response.data;
      
      },
      error:()=>{
          console.log("error loading categories");
      }
    })
      }
      ngOnInit() {
       
      
        this.clerkBranchForm = this.fb.group({
          name: ['', [Validators.required, Validators.minLength(3)]],
          email: ['', [Validators.required, Validators.email]],
          role: ['', Validators.required],
          branch: [null, Validators.required] 
        });
      
        this.sub = this.route.paramMap.subscribe(() => this.loadBranches());
      }
      

  onSubmit() {
    const formData = {
      ...this.clerkBranchForm.value,
      branch: {
        branch_id: this.clerkBranchForm.value.branch.branch_id,
        name: this.clerkBranchForm.value.branch.name
      }
    };
  
    console.log("formdata", formData);
  
    if (this.isEditMode) {
      this.clerkbranchservice.updateClerkBranch(this.selectedClerkBranch.clerkBranch_id, formData).subscribe({
        next: (response) => {
          this.toastr.success("Clerk Branch updated successfully");
          this.saveClerk.emit(response);
          this.resetForm();
        },
        error: () => {
          this.toastr.error("Something went wrong");
        }
      });
    } else {
      this.clerkbranchservice.addClerkBranch(formData).subscribe({
        next: (response) => {
          this.toastr.success("Clerk Branch added successfully");
          this.saveClerk.emit(response);
          this.resetForm();
        },
        error: () => {
          this.toastr.error("Something went wrong");
        }
      });
    }
  }
  
  
  resetForm(){
    this.clerkBranchForm?.reset({
      name: '',
      email: '',
      role: '',
      branch:''
    });
  }

}

import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, QueryList, OnDestroy } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProductService } from '../../_services/products.services';
import { Category } from 'src/app/_models/category';
import { Seller } from 'src/app/_models/sellers';
import { SellerService } from '../../_services/sellers.services';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../_services/category.service';
import { BranchService } from '../../_services/branch.service';
import { Branch } from 'src/app/_models/branch';

@Component({
  standalone: true,
  selector: 'app-add-update-product',
  imports: [CommonModule, FormsModule, NgSelectModule, ReactiveFormsModule],
  templateUrl: './add-update.component.html',
  styleUrls: ['./add-update.component.css']
})
export class AddUpdateComponent implements OnInit, OnChanges ,OnDestroy {
  @Input() selectedProduct: any = {};
  @Input() isEditMode: boolean = false;
  @Output() saveProduct = new EventEmitter<any>();
  categories: Category[] = [];
  sellers: Seller[] = []
  isLoading: boolean = false;
  selectedFiles: File[] = [];
  form!: FormGroup;
  selectedCategories: any[] = [];
  imagePreviews: any[] = [];
  fileInputs: HTMLInputElement[] = [];


  selectedBranches: { branch_id: string, qty: number }[] = []
  branches :Branch[]=[

  ];



  constructor(private productservice: ProductService
    , private sellerservice: SellerService
    , private toastr: ToastrService
    , private categoryservice: CategoryService
    , private branchesService:BranchService
  ) { }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.selectedCategories = Array.isArray(this.selectedProduct.categories)
      ? this.selectedProduct.categories.map((category: any) => ({
        category_id: category.category_id,
        name: category.name,
      }))
      : [];


    this.form = new FormGroup({
      name: new FormControl(this.selectedProduct.name, [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern('^[a-zA-Z ]+$')
      ]),
      description: new FormControl(this.selectedProduct.description, [
        Validators.required,
        Validators.minLength(6)
      ]),
      price: new FormControl(this.selectedProduct.price, [
        Validators.required,
        Validators.pattern('^[1-9]\\d*(\\.\\d+)?$')
      ]),
      qty: new FormControl(this.selectedProduct.qty, [
        Validators.required,
        Validators.pattern('^[1-9]\\d*$')
      ]),
      show: new FormControl(this.selectedProduct.show, [Validators.required]),
      status: new FormControl('active'),
      seller_id: new FormControl(this.selectedProduct.seller_id, [Validators.required]),
      categories: new FormControl(this.selectedCategories, [Validators.required]),
      branches: new FormArray([])
    });
    this.loadCategories();
    this.loadSellers();
    this.loadBranches();
    this.imagePreviews = [];
    if (this.branchesArray.length == 0) {
      this.addBranchRow();
      // this.addBranchRow();
    }
  }

  get branchesArray(): FormArray {
    return this.form.get('branches') as FormArray;
  }

  ngOnChanges(changes: SimpleChanges) {

    if (this.form && changes['selectedProduct']?.currentValue) {
      const product = changes['selectedProduct'].currentValue;
      this.selectedCategories = Array.isArray(product.categories)
        ? product.categories.map((category: any) => ({
          category_id: category.category_id,
          name: category.name,
        }))
        : [];
      this.selectedBranches = Array.isArray(product.branches)
        ? product.branches.map((branch: any) => ({
          branch_id: branch.branch_id,
          qty: branch.qty,
        }))
        : [];

      this.form.patchValue({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        qty: product.qty || '',
        status: product.status || 'active',
        show: product.show || '',
        seller_id: product.seller?.seller_id || '',
        categories: this.selectedCategories,
        branches: []
      });

      const branchesFormArray = this.form.get('branches') as FormArray;
      branchesFormArray.clear();
      this.selectedBranches.forEach(branch => {
        branchesFormArray.push(
          new FormGroup({
            branch_id: new FormControl(branch.branch_id, Validators.required),
            qty: new FormControl(branch.qty, [Validators.required, Validators.min(1)]),
          })
        );
      });

      if (branchesFormArray.length == 0) {
        this.addBranchRow();
      }
    }




    this.imagePreviews = [];
    this.imagePreviews = this.selectedProduct?.pics?.length > 0 ? this.selectedProduct.pics : [];

  }


  isSelected(item: any): boolean {
    return this.selectedProduct.categories?.some((category: any) => category.category_id === item.category_id);
  }
  toggleSelect(item: any): void {
    if (this.isSelected(item)) {
      this.selectedCategories = this.selectedCategories.filter(category => category.category_id !== item.category_id);
    } else {
      this.selectedCategories.push({ category_id: item.category_id, name: item.name });
    }
    this.form.controls['categories'].setValue([...this.selectedCategories]);
  }

  loadCategories() {
    this.categoryservice.getActiveCategories().subscribe({
      next: (response) => {
        console.log("Fetched categories:", response);
        this.categories = response.data.categories;

      },
      error: () => {
        console.log('Error loading categories');
        this.isLoading = true;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  loadSellers(): void {
    this.sellerservice.getsellersByStatus("active").subscribe({
      next: (response) => {
        this.sellers = response.data;
      },
      error: () => {
        console.log('Error loading products');
        this.isLoading = true;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }


  onSubmit(): void {
    const totalBranchesQty = this.branchesArray.value.reduce((sum: number, item: any) => sum = sum + item.qty, 0);
    const totalQty = this.form.value.qty;
    if (totalBranchesQty != totalQty) {
      this.toastr.error("the qty added to branches must equal the total qty");
      return;
    }

    var productData = {
      ...this.form.value,
      pics: this.imagePreviews,
      branches: this.branchesArray.value.map((item: any) => ({
        branch: {
          branch_id: item.branch_id,
          name: this.branches.find(b => b.branch_id === item.branch_id)?.name || ""
        },
        qty: item.qty
      }))
    }
    if (this.isEditMode) {
      this.productservice.UpdateProduct(productData, this.selectedProduct.product_id).subscribe({
        next: (response) => {
          console.log('Product Updated:', response);
          this.saveProduct.emit(response);
          this.toastr.success("product updated successfully");
        },
        error: (error) => {
          this.toastr.error("something went wrong");
          console.error('Error updating product:', error);
        },
      });
    } else {

      this.productservice.addProduct(productData).subscribe({
        next: (response) => {
          console.log('Product Added:', response);
          this.toastr.success("product updated successfully");
          this.saveProduct.emit(response);
        },
        error: (error) => {
          console.error('Error adding product:', error);
          this.toastr.success("something went wrong");
        },
      });
    }
  }


  onFileChange(event: Event) {
    console.log(this.imagePreviews);
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviews.push(reader.result as string);
      };
      reader.readAsDataURL(input.files[0]);
      input.value = "";
    }
  }

  removeImage(index: number) {
    this.imagePreviews.splice(index, 1);
  }

  loadBranches(){
    this.branchesService.getAllActiveBranches().subscribe({
      next:(res)=>{
        this.branches=res.data
        console.log(this.branches);
      },error:(err)=>{
      console.log(err);
      }
    })


  }

  addBranchRow(branch_id: number | null = null, qty: number = 1) {
    console.log("77");
    this.branchesArray.push(
      new FormGroup({
        branch_id: new FormControl(branch_id, Validators.required),
        qty: new FormControl(qty, [Validators.required, Validators.min(1)]),
      })
    );
     console.log(this.branches);

  }

  removeBranch(index: number) {
    this.branchesArray.removeAt(index);
  }
  getAvailableBranches(currentBranchId: string | null = null): any[] {
    const selectedBranchIds = this.branchesArray.value
      .map((b: any) => b.branch_id)
      .filter((id: string | null) => id !== currentBranchId); 
    
    return this.branches.filter(branch => 
      !selectedBranchIds.includes(branch.branch_id) || branch.branch_id === currentBranchId
    );
  }

}








import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProductService } from '../../_services/products.services';
import { Category } from 'src/app/_models/category';
import { Seller } from 'src/app/_models/sellers';
import { SellerService } from '../../_services/sellers.services';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone: true,
  selector: 'app-add-update-product',
  imports: [CommonModule, FormsModule,NgSelectModule,ReactiveFormsModule],
  templateUrl: './add-update.component.html',
  styleUrls: ['./add-update.component.css']
})
export class AddUpdateComponent implements OnInit ,OnChanges{
  @Input() selectedProduct: any = {};
  @Input() isEditMode: boolean = false;
  @Output() saveProduct = new EventEmitter<any>();
  categories: Category[] = [];
  sellers:Seller[]=[]
  isLoading: boolean = false;
  selectedFiles: File[] = [];
  imagePreview1: string | ArrayBuffer | null = null;
  imagePreview2: string | ArrayBuffer | null = null;
  form!: FormGroup;
  selectedCategories: any[] = [];
  constructor(private productservice:ProductService,private sellerservice:SellerService,private toastr: ToastrService){

  }
 
  ngOnInit(): void {
    this.selectedCategories = Array.isArray(this.selectedProduct.categories) 
    ? this.selectedProduct.categories.map((category: any) => ({
        category_id: category.category_id,
        name: category.name,
      })) 
    : [];
  

    this.form = new FormGroup({
      name: new FormControl(this.selectedProduct.name , [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern('^[a-zA-Z ]+$')
      ]),
      description: new FormControl(this.selectedProduct.description , [
        Validators.required,
        Validators.minLength(6)
      ]),
      price: new FormControl(this.selectedProduct.price , [
        Validators.required,
        Validators.pattern('^[1-9]\\d*(\\.\\d+)?$')
      ]),
      qty: new FormControl(this.selectedProduct.qty , [
        Validators.required,
        Validators.pattern('^[1-9]\\d*$')
      ]),
      status: new FormControl('active'),
      seller_id: new FormControl(this.selectedProduct.seller_id ,[Validators.required]),
      categories: new FormControl(this.selectedCategories,[Validators.required]),
    });
      this.loadCategories();
      this.loadSellers();
  
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
  
      this.form.setValue({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        qty: product.qty || '',
        status: product.status || 'active',
        seller_id: product.seller.seller_id || '',
        categories: this.selectedCategories,
      });
    }
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
    this.productservice.getActiveCategories().subscribe({
      next: (response) => {
        console.log("Fetched categories:", response);  
        this.categories = response.data;
    
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
      this.sellers=response.data;
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
  onFileChange(event: any, imageIndex: number): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (imageIndex === 1) {
          this.imagePreview1 = reader.result as string;
        } else if (imageIndex === 2) {
          this.imagePreview2 = reader.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }
  
  
  onSubmit(): void {  
    console.log("Product ID:", this.selectedProduct.product_id);
    console.log("Product Data:", this.form.value);
    console.log(this.form.valid);  
console.log(this.form.errors);


    if (this.isEditMode) {
      this.productservice.UpdateProduct(this.form.value, this.selectedProduct.product_id).subscribe({
        next: (response) => {
          console.log('Product Updated:', response);
          this.saveProduct.emit(response);
        },
        error: (error) => {
          console.error('Error updating product:', error);
        },
      });
    } else {
      this.productservice.addProduct(this.form.value).subscribe({
        next: (response) => {
          console.log('Product Added:', response);
          this.saveProduct.emit(response);
        },
        error: (error) => {
          console.error('Error adding product:', error);
        },
      });
    }
  }
      
  
}
  




  


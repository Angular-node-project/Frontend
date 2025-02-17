import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProductsService } from '../../_services/products.service';
import { Category } from 'src/app/_models/category';
import { Seller } from 'src/app/_models/sellers';
import { SellerService } from 'src/app/seller/_services/seller.service';
import { ToastrService } from 'ngx-toastr';
import { SellerUpdateRequests } from 'src/app/_models/UpdateRequests';
import { AuthSellerService } from '../../_services/authSeller.service';
//import {productservice} from {../../_services/products.service};

@Component({
  standalone: true,
  selector: 'app-add-update-product',
  imports: [CommonModule, FormsModule, NgSelectModule, ReactiveFormsModule],
  templateUrl: './add-update.component.html',
  styleUrls: ['./add-update.component.css']
})
export class AddUpdateComponent implements OnInit, OnChanges {
  @Input() selectedProduct: any = {};
  @Input() isEditMode: boolean = false;
  @Output() saveProduct = new EventEmitter<any>();
  categories: Category[] = [];
  sellers: Seller[] = [];
  isLoading: boolean = false;
  selectedFiles: File[] = [];

  form!: FormGroup;
  selectedCategories: any[] = [];


  imagePreviews: any[] = [];
  fileInputs: HTMLInputElement[] = [];

  SellerProductRequest: SellerUpdateRequests|null=null;
   

  constructor(private ProductsService: ProductsService, private sellerservice: SellerService, private toastr: ToastrService,private AuthSellerService:AuthSellerService) {
   
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
    });
    this.loadCategories();
    this.loadSellers();
    this.imagePreviews=[];
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
        show: product.show || '',
        status: product.status || 'active',
        seller_id: product.seller?.seller_id || '',
        categories: this.selectedCategories,
      });
    }
    this.imagePreviews=[];
    this.imagePreviews=this.selectedProduct.pics?.length>0?this.selectedProduct.pics:[];
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
    this.ProductsService.getActiveCategories().subscribe({
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
    var productData={
      ...this.form.value,
      pics:this.imagePreviews,
      seller_id:this.AuthSellerService.getLoggedInId()
    }
    const sellerId=this.AuthSellerService.getLoggedInId();
   const sellerName=this.AuthSellerService.getLoggedInName();
   
   
    this.SellerProductRequest = {
      request_id: this.isEditMode ? this.selectedProduct.request_id : '',
      seller: { seller_id:sellerId, name:sellerName },
      updatedProduct: {
      product_id: this.isEditMode ? this.selectedProduct.product_id : '',
      categories: this.selectedCategories,
      name: this.form.value.name,
      description: this.form.value.description,
      seller_id: sellerId,
      pics: this.imagePreviews,
      details: this.form.value.details || '',
      qty: this.form.value.qty,
      show: this.form.value.show,
      price: this.form.value.price,
      status: this.form.value.status,
      },
      status: this.isEditMode ? this.selectedProduct.status : 'pending'
    };
    console.log(this.SellerProductRequest);
    if (this.isEditMode) {
      if(this.selectedProduct.status=="pending")
      {
        this.ProductsService.updatePendingProduct(productData, this.selectedProduct.product_id).subscribe({
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
      }//end of if
      else{
      this.ProductsService.updateProduct(sellerId, this.selectedProduct.product_id,this.SellerProductRequest).subscribe({
        next: (response) => {
          console.log('Product Updated:', response);
          this.saveProduct.emit(response);
          this.toastr.success("product updated successfully");
        },
        error: (error) => {
          this.toastr.error("something went wrong");
          console.error('Error updating product:', error);
        },
      });}//end of else
    } else {
      this.ProductsService.addProduct(sellerId,productData).subscribe({
        next: (response) => {
          console.log('Product Added:', response);
          this.toastr.success("product updated successfully");
          this.saveProduct.emit(response);
        },
        error: (error) => {
          console.error('Error adding product:', error);
          this.toastr.error("something went wrong");
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


}








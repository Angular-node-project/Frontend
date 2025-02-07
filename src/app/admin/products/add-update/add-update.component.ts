import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProductService } from '../../_services/products.services';
import { Category } from 'src/app/_models/category';
import { Seller } from 'src/app/_models/sellers';
import { SellerService } from '../../_services/sellers.services';

@Component({
  standalone: true,
  selector: 'app-add-update-product',
  imports: [CommonModule, FormsModule,NgSelectModule],
  templateUrl: './add-update.component.html',
  styleUrls: ['./add-update.component.css']
})
export class AddUpdateComponent implements OnInit {
  @Input() selectedProduct: any = {};
  @Input() isEditMode: boolean = false;
  @Output() saveProduct = new EventEmitter<any>();
  categories: Category[] = [];
  sellers:Seller[]=[]
  isLoading: boolean = false;
  selectedFiles: File[] = [];
  imagePreview1: string | ArrayBuffer | null = null;
  imagePreview2: string | ArrayBuffer | null = null;
  constructor(private productservice:ProductService,private sellerservice:SellerService){

  }
  ngOnInit(): void {
    this.selectedProduct.categories = this.selectedProduct.categories || [];

      this.loadCategories();
      this.loadSellers();
  
  }
  isSelected(item: any): boolean {
  
    return this.selectedProduct.categories && this.selectedProduct.categories.some((category: any) => category.category_id === item.category_id);
  }
  toggleSelect(item: any): void {
    if (!this.selectedProduct.categories) {
      this.selectedProduct.categories = []; 
    }
  
    console.log("Before toggle:", this.selectedProduct.categories);
  
    const index = this.selectedProduct.categories.findIndex(
      (category: any) => category.category_id === item.category_id
    );
  
    if (index !== -1) {
    
      this.selectedProduct.categories.splice(index, 1);
    } else {
     
      const category = {
        category_id: item.category_id,
        name: item.name
      };
      this.selectedProduct.categories.push(category);
    }
  
    console.log("After toggle:", this.selectedProduct.categories);
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
  onFileChange(event: any): void {
    const files = event.target.files;
    if (files.length > 0) {
      this.selectedFiles = Array.from(files);
    }
  }

  
      onSubmit(): void {  
       const productData = {
          name: this.selectedProduct.name,
          description: this.selectedProduct.description,
          price: this.selectedProduct.price,
          qty: this.selectedProduct.qty,
          status: 'active',
          seller_id: this.selectedProduct.seller_id,
          categories: this.selectedProduct.categories.map((category: any) => ({
            category_id: category.category_id,
            name: category.name,
          }))
        };
        console.log("product id",this.selectedProduct.product_id)
        console.log("product data",productData)
        if (this.isEditMode) {

          this.productservice.UpdateProduct(productData, this.selectedProduct.product_id).subscribe({
            next: (response) => {
              console.log('Product Updated:', response);
              this.saveProduct.emit(response);
            },
            error: (error) => {
              console.error('Error updating product:', error);
            },
          });
        } else {
       
          this.productservice.addProduct(productData).subscribe({
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
  




  


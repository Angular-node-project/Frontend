import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { ProductService } from '../_services/product.service';
import { Product } from '../../_models/product';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Response } from '../../_models/response';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CartService } from '../_services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { AuthCustomerService } from '../_services/authCustomer.service';



@Component({
  selector: 'app-customer-product-details',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
  host: {
    'class': 'app-customer-product-details'
  }
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  constructor(private productService: ProductService
    , private authCustomerService: AuthCustomerService
    , private route: ActivatedRoute
    , private cartSer: CartService
    , public toastr: ToastrService
    , private viewPortScroller: ViewportScroller
  ) {
    // Add Font Awesome CSS
    // const link = document.createElement('link');
    // link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
    // link.rel = 'stylesheet';
    // document.head.appendChild(link);
  }

  selectedProduct!: Product;
  sub!: Subscription;
  images: { src: string, alt: string, active: boolean }[] = [];
  selectedImage!: { src: string, alt: string, active: boolean };
  activeTab = 'description';
  rating: number = 0;
  hoverRating: number = 0;
  review: string = '';
  initialQty = "1";
  productMaxQty: number = 0;
  @ViewChild('comment') commentTextarea!: ElementRef;
  comment: string = "";


  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      const id = param.get('id');
      if (id) {
        this.getProductDetails(id);
      }
    })
 

  }
  getProductDetails(id: string) {
    this.sub = this.productService.getProductDetails(id).subscribe(response => {
      console.log(response)
      this.selectedProduct = response.data;
      if (response.data.pics && response.data.pics.length > 0) {
        this.images = response.data.pics.map((pic, index) => ({
          src: pic,
          alt: `Product Image ${index + 1}`,
          active: index === 0
        }))
        this.productMaxQty = response.data.qty;

      }
      this.selectedImage = this.images[0];
    })

  }

  selectImage(image: any) {
    this.images.forEach(img => img.active = false);
    image.active = true;
    this.selectedImage = image;
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
  setRating(rating: number) {
    this.rating = rating;
  }
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe()
    }
  }

  addProductToCart(productId: string, qty: string) {
    let Qty = +qty;
    let toast = this.toastr
    let customer_id = 1;
    if (Qty <= 0) {
      this.toastr.error("qty must be more than 1");
    } else if (Qty > this.productMaxQty) {
      this.toastr.error("the qty added must be less than max product qty");
    }
    else {
      if (this.authCustomerService.isLoggedIn()) {
        this.cartSer.addProductToCart({ productId, customer_id, qty }).subscribe({
          next: (e) => {
            if (e.data.success) {
              console.log(e.data);
              toast.success("Product Added To Cart");
              this.cartSer.updateCartRegisterdCustomerProductNum();
            } else {
              toast.error(e.data.ErrorMsg);
            }
          }
        })
      } else {
        if (Qty > this.productMaxQty) {
          this.toastr.error("the qty added must be less than max product qty");
        } else {

          this.cartSer.updateProductToCartGuest({ productId, qty: Qty }, 'more');
          this.toastr.success("qty addedd successfully")
        }
      }
    }

  }

  //* To reset Quantity Input if one insert value below or equal to 0
  resetQty(inQty: string) {
    if (+inQty <= 0)
      this.initialQty = "1"
  }

  addReview() {
    var review = {
      rate: this.rating,
      comment: this.commentTextarea.nativeElement.value
    }
    if (this.rating < 1) {
      this.toastr.error("please provide atleast rate before add review");
    } else {

      this.productService.addReview(review, this.selectedProduct.product_id).subscribe({
        next: (res) => {
          this.scrollToTop();
          if (res.data) {
            this.resetForm();
            this.toastr.success("review added successfully");
            this.selectedProduct.reviews.push(
              {customer:{customer_id:"",name:this.authCustomerService.getLoggedInName()},
               rate:this.rating,
               comment:this.commentTextarea.nativeElement.value,
               created_at:new Date
            }
            )
          } else {
            this.resetForm();
            this.toastr.error("you already have added commint on this product");
          }
        }, error: (error) => {
          this.scrollToTop();
          this.resetForm();
          this.toastr.error(error.error.message);
        }
      })
    }

  }

  isLoggedIn() {
    return this.authCustomerService.isLoggedIn();
  }
  canAddReview() {
    return this.selectedProduct.doesCustomerOrderThisProduct;
  }

  scrollToTop(): void {
    this.viewPortScroller.scrollToPosition([0, 0])
  }

  resetForm() {
    setTimeout(() => {
      this.rating = 0;
      this.hoverRating = 0;
      this.comment = "";
      if (this.commentTextarea) {
        this.commentTextarea.nativeElement.value = "";
      }
    },0);
  }
}

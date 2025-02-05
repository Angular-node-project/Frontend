import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { AuthCustomerService } from '../../_services/authCustomer.service';
import { CartService } from '../../_services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-header',
  imports: [CommonModule, RouterLink, RouterLinkActive,FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isCollapsed = true;
  isTransparent: boolean = true;
  isLoggedIn: boolean = false;
  loggedInName: string = '';
  constructor(private router: Router, private authCustomerService: AuthCustomerService,private cartSer:CartService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authCustomerService.isLoggedIn();
    this.loggedInName = this.authCustomerService.getLoggedInName();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isLoggedIn = this.authCustomerService.isLoggedIn();
      this.loggedInName = this.authCustomerService.getLoggedInName();
      console.log(event.urlAfterRedirects);
      if (event.urlAfterRedirects == '/home' || event.urlAfterRedirects == '/') {
        this.isTransparent = true;
        console.log("hhh");
      } else {
        this.isTransparent = false;
      }
    });
    console.log(this.isTransparent)
    // Check if the page is directly accessed
    if (this.router.url === '/home' || this.router.url === '/') {
      this.isTransparent = true;
      console.log("Directly on home page, navbar is transparent");
    } else {
      this.isTransparent = false;
      console.log("Directly on another page, navbar is solid");
    }


    this.cartSer.getCart().subscribe(e=>{
      this.numOfProducts=e.product.length 
    })


  }
  numOfProducts=0;


}

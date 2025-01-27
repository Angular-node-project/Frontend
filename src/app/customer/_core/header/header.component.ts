import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-customer-header',
  imports: [CommonModule,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isCollapsed = true;
  isTransparent: boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      console.log(event.urlAfterRedirects);
      if (event.urlAfterRedirects == '/home'||event.urlAfterRedirects == '/') {
        this.isTransparent = true;
        console.log("hhh");
      } else {
        this.isTransparent = false;
      }
    });
    console.log(this.isTransparent)
    // Check if the page is directly accessed
    if (this.router.url === '/home'|| this.router.url === '/') {
      this.isTransparent = true;
      console.log("Directly on home page, navbar is transparent");
    } else {
      this.isTransparent = false;
      console.log("Directly on another page, navbar is solid");
    }
  }
}

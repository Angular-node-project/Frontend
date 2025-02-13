import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  imports: [],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void {
        // Hide header and footer
        document.querySelector('app-customer-header')?.classList.add('d-none');
        document.querySelector('app-customer-footer')?.classList.add('d-none');
  }
  
  ngOnDestroy(): void {
    // Show header and footer when leaving the component
    document.querySelector('app-customer-header')?.classList.remove('d-none');
    document.querySelector('app-customer-footer')?.classList.remove('d-none');
  }
}

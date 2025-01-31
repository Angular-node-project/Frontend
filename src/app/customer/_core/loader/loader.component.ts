import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-loader',
  imports: [CommonModule],
  template: `
    <div class="text-center py-5">
      <div class="spinner-border text-dark" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `,
  styleUrl: './loader.component.css'
})
export class LoaderComponent {

}

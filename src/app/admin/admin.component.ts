import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from './side-bar/side-bar.component';

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet,SideBarComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}

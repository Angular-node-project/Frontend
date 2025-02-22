import { Component, Input, OnInit } from '@angular/core';
import { CashierService } from '../../_services/cashier.service';

@Component({
  selector: 'app-receipt',
  imports: [],
  templateUrl: './receipt.component.html',
  styleUrl: './receipt.component.css'
})
export class ReceiptComponent implements OnInit {

  constructor(    private cahierService: CashierService){}
  data:any;

  ngOnInit(): void {
    console.log("test is 0003")
     this.cahierService.data$.subscribe((data) => {
      console.log('Received data:', data);
      this.data = data;
      console.log(this.data)
    });
    console.log(this.cahierService.testing)
  }


  @Input()
  test: any



}

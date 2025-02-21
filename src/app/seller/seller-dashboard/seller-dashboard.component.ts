import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { ApexAxisChartSeries, ApexNonAxisChartSeries, ApexResponsive, ApexChart, ApexXAxis, ApexDataLabels, ApexTitleSubtitle, ChartComponent, NgApexchartsModule, ApexPlotOptions, ApexYAxis, ApexFill } from 'ng-apexcharts'
import { AnalysisService } from '../_services/analysis.service';
import { Subscription } from 'rxjs';
import { AuthSellerService } from '../_services/authSeller.service';

@Component({
  selector: 'app-seller-dashboard',
  imports: [],
  templateUrl: './seller-dashboard.component.html',
  styleUrl: './seller-dashboard.component.css'
})
export class SellerDashboardComponent implements OnInit{
  NumofProducts=0;
  NumofOrders=0;
  NumofDeliveredOrders=0;

  sub1!:Subscription
  sub2!:Subscription
  sub3!:Subscription
  constructor(private sAnalysisService: AnalysisService,private AuthSellerService:AuthSellerService) {}

  ngOnInit(): void {
   
    this.Cards()
  }

  Cards(){
  this.sub1 = this.sAnalysisService.countSellerProducts(this.AuthSellerService.getLoggedInId()).subscribe({
    next: (response) => {
      this.NumofProducts = response.data;
      console.log(this.NumofProducts);
      console.log(response);
    },
    error: (err) => {
      console.error('Error fetching product count', err);
    }
  });

  this.sub2 = this.sAnalysisService.countOrdersForSeller(this.AuthSellerService.getLoggedInId(), 'pending').subscribe({
    next: (response) => {
      this.NumofOrders = response.data;
    },
    error: (err) => {
      console.error('Error fetching order count', err);
    }
  });
  this.sub3 = this.sAnalysisService.countOrdersForSeller(this.AuthSellerService.getLoggedInId(), 'delivered').subscribe({
    next: (response) => {
      this.NumofDeliveredOrders = response.data;
    },
    error: (err) => {
      console.error('Error fetching order count', err);
    }
  });
  
}
  
}

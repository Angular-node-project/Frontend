// import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
// import { FormsModule } from '@angular/forms'
// import { ApexAxisChartSeries, ApexNonAxisChartSeries, ApexResponsive, ApexChart, ApexXAxis, ApexDataLabels, ApexTitleSubtitle, ChartComponent, NgApexchartsModule, ApexPlotOptions, ApexYAxis, ApexFill } from 'ng-apexcharts'
// import { AnalysisService } from '../_services/analysis.service';
// import { Subscription } from 'rxjs';
// import { AuthSellerService } from '../_services/authSeller.service';

// export type ChartOptions2 = {
//   series: ApexNonAxisChartSeries;
//   chart: ApexChart;
//   responsive: ApexResponsive[];
//   labels: any;
// };

// @Component({
//   selector: 'app-seller-dashboard',
//   imports: [
//     NgApexchartsModule,
//     FormsModule
//   ],
//   templateUrl: './seller-dashboard.component.html',
//   styleUrl: './seller-dashboard.component.css'
// })
// export class SellerDashboardComponent implements OnInit, OnDestroy {
//   @ViewChild('chart') chart!: ChartComponent;
    

      
//   NumofProducts=0;
//   NumofOrders=0;
//   NumofDeliveredOrders=0;

//   sub1!:Subscription
//   sub2!:Subscription
//   sub3!:Subscription
//   constructor(private sAnalysisService: AnalysisService,private AuthSellerService:AuthSellerService) {
   
//   }

//   ngOnInit(): void {
   
//     this.Cards()
//   }
 

//   Cards(){
//   this.sub1 = this.sAnalysisService.countSellerProducts(this.AuthSellerService.getLoggedInId()).subscribe({
//     next: (response) => {
//       this.NumofProducts = response.data;
//       console.log(this.NumofProducts);
//       console.log(response);
//     },
//     error: (err) => {
//       console.error('Error fetching product count', err);
//     }
    

//   });


//   this.sub2 = this.sAnalysisService.countOrdersForSeller(this.AuthSellerService.getLoggedInId(), 'pending').subscribe({
//     next: (response) => {
//       this.NumofOrders = response.data;
//     },
//     error: (err) => {
//       console.error('Error fetching order count', err);
//     }
//   });
//   this.sub3 = this.sAnalysisService.countOrdersForSeller(this.AuthSellerService.getLoggedInId(), 'delivered').subscribe({
//     next: (response) => {
//       this.NumofDeliveredOrders = response.data;
//     },
//     error: (err) => {
//       console.error('Error fetching order count', err);
//     }
//   });
  
// }
// ngOnDestroy(): void {
//   if(this.sub1){
//     this.sub1.unsubscribe()
//   }
//   if(this.sub2){
//     this.sub2.unsubscribe()
//   }
//   if(this.sub3){
//     this.sub3.unsubscribe()
//   }
// }
  
// }

//================
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApexNonAxisChartSeries, ApexResponsive, ApexChart, ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { AnalysisService } from '../_services/analysis.service';
import { Subscription } from 'rxjs';
import { AuthSellerService } from '../_services/authSeller.service';
import { CommonModule } from '@angular/common';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  responsive: ApexResponsive[];
};

@Component({
  selector: 'app-seller-dashboard',
  imports: [CommonModule, NgApexchartsModule, FormsModule],
  templateUrl: './seller-dashboard.component.html',
  styleUrl: './seller-dashboard.component.css'
})
export class SellerDashboardComponent implements OnInit, OnDestroy {
  @ViewChild('chart') chart!: ChartComponent;

  NumofProducts = 0;
  NumofOrders = 0;
  NumofDeliveredOrders = 0;
  NumofCanceledOrders = 0;
  NumofPendingProducts = 0;
  NumofActiveProducts = 0;
  NumofInactiveProducts = 0;

  sub1!: Subscription;
  sub2!: Subscription;
  sub3!: Subscription;
  sub4!: Subscription;
  sub5!: Subscription;
  sub6!: Subscription;
  sub7!: Subscription;

  public chartOptions!: ChartOptions;
  public productChartOptions!: ChartOptions;

  constructor(private sAnalysisService: AnalysisService, private authSellerService: AuthSellerService) {}

  ngOnInit(): void {
    this.Cards();
  }

  Cards() {
    const sellerId = this.authSellerService.getLoggedInId();

    this.sub1 = this.sAnalysisService.countSellerProducts(sellerId).subscribe({
      next: (response) => {
        this.NumofProducts = response.data;
      },
      error: (err) => {
        console.error('Error fetching product count', err);
      }
    });

    this.sub2 = this.sAnalysisService.countOrdersForSeller(sellerId, 'pending').subscribe({
      next: (response) => {
        this.NumofOrders = response.data;
        this.updateChart();
      },
      error: (err) => {
        console.error('Error fetching pending orders', err);
      }
    });

    this.sub3 = this.sAnalysisService.countOrdersForSeller(sellerId, 'delivered').subscribe({
      next: (response) => {
        this.NumofDeliveredOrders = response.data;
        this.updateChart();
      },
      error: (err) => {
        console.error('Error fetching delivered orders', err);
      }
    });

    this.sub4 = this.sAnalysisService.countOrdersForSeller(sellerId, 'canceled').subscribe({
      next: (response) => {
        this.NumofCanceledOrders = response.data;
        this.updateChart();
      },
      error: (err) => {
        console.error('Error fetching canceled orders', err);
      }
    });

    this.sub5 = this.sAnalysisService.countSellerProductsByStatus(sellerId, 'pending').subscribe({
      next: (response) => {
        this.NumofPendingProducts = response.data;
        this.updateProductChart();
      },
      error: (err) => {
        console.error('Error fetching pending products', err);
      }
    });

    this.sub6 = this.sAnalysisService.countSellerProductsByStatus(sellerId, 'active').subscribe({
      next: (response) => {
        this.NumofActiveProducts = response.data;
        this.updateProductChart();
      },
      error: (err) => {
        console.error('Error fetching active products', err);
      }
    });

    this.sub7 = this.sAnalysisService.countSellerProductsByStatus(sellerId, 'inactive').subscribe({
      next: (response) => {
        this.NumofInactiveProducts = response.data;
        this.updateProductChart();
      },
      error: (err) => {
        console.error('Error fetching inactive products', err);
      }
    });
  }

  updateChart() {
    this.chartOptions = {
      series: [this.NumofOrders, this.NumofDeliveredOrders, this.NumofCanceledOrders],
      chart: {
        type: 'pie'
      },
      labels: ['Pending Orders', 'Delivered Orders', 'Canceled Orders'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 300
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };
  }

  updateProductChart() {
    this.productChartOptions = {
      series: [this.NumofPendingProducts, this.NumofActiveProducts, this.NumofInactiveProducts],
      chart: {
        type: 'pie'
      },
      labels: ['Pending Products', 'Active Products', 'Inactive Products'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 300
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };
  }

  ngOnDestroy(): void {
    this.sub1?.unsubscribe();
    this.sub2?.unsubscribe();
    this.sub3?.unsubscribe();
    this.sub4?.unsubscribe();
    this.sub5?.unsubscribe();
    this.sub6?.unsubscribe();
    this.sub7?.unsubscribe();
  }
}

import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { ApexAxisChartSeries, ApexNonAxisChartSeries, ApexResponsive, ApexChart, ApexXAxis, ApexDataLabels, ApexTitleSubtitle, ChartComponent, NgApexchartsModule, ApexPlotOptions, ApexYAxis, ApexFill } from 'ng-apexcharts'
import { AnalysisService } from '../_services/analysis.service';
import { Subscription } from 'rxjs';

export type ChartOptions1 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};
export type ChartOptions2 = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};
export type ChartOptions3 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [
    NgApexchartsModule,
    FormsModule
  ],
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit,OnDestroy {
  @ViewChild('chart') chart!: ChartComponent;
  public LineChart: ChartOptions1;
  public DonutChart: ChartOptions2;
  public ColumnChart: ChartOptions3;

  DonutChartData: any[] = []
  DonutChartLabels: any[] = ["Female","Male"]
  LineChartData: any[] = []
  LineChartLabels: any[] = []
  ColumnChartData: any[] = []
  ColumnChartLabels: any[] = []

  NumofOrders=0
  NumofProducts=0
  NumofBranches=0
  TotalSales=0

  sub1!:Subscription
  sub2!:Subscription
  sub3!:Subscription
  sub4!:Subscription
  sub5!:Subscription
  sub6!:Subscription
  sub7!:Subscription
  sub8!:Subscription
  sub9!:Subscription
  sub10!:Subscription
  sub11!:Subscription
  sub12!:Subscription
  sub13!:Subscription

  constructor(private adminAnalysisService: AnalysisService) {
    this.LineChart = {
      series: [
        {
          name: "Desktops",
          data: this.LineChartData
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep"
        ]
      }
    };

    this.DonutChart = {
      series: this.DonutChartData,
      chart: {
        width: "50%",
        type: "pie"
      },
      labels: this.DonutChartLabels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: "100%"
            },
            legend: {
              position: "right"
            }
          }
        }
      ]
    };
    this.ColumnChart = {
      series: [
        {
          name: "Registeration",
          data: this.ColumnChartData
        }
      ],
      chart: {
        width: "50%",
        height: 300,
        type: "bar"
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top" // top, center, bottom
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + " ";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },

      xaxis: {
        categories: [
          "Sat",
          "Sun",
          "Mon",
          "Tue",
          "Wen",
          "Thr",
          "Fri",
        ],
        position: "top",
        labels: {
          offsetY: -18
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5
            }
          }
        },
        tooltip: {
          enabled: true,
          offsetY: -35
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100]
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: false,
          formatter: function (val) {
            return val + "";
          }
        }
      },
      title: {
        text: "Monthly Inflation in Argentina, 2002",
        offsetY: 320,
        align: "center",
        style: {
          color: "#444"
        }
      }
    };
  }
  ngOnInit(): void {
    //* gender count
    this.callGetGenderCount()
    //* # registeration over Month
    this.callNumOfRegistrationOverMonth()
    //* # registeration over Days of Week
    this.callNumOfRegistrationOverDayOfWeeks()
    //* Cards
    this.Cards()
  }

  test(selectionVal: string) {
    console.log(selectionVal)
    switch (selectionVal) {
      case "Customers":
        //* gender count
        this.callGetGenderCount()
        //* # registeration over Month
        this.callNumOfRegistrationOverMonth()
        //* # registeration over Days of Week
        this.callNumOfRegistrationOverDayOfWeeks()
        break;
      case "Orders":
        this.callGetOrdersByDayOfWeek()
        this.callGetOrdersByMonth()
        this.callGetOrderCountsByStatus()
        break;
      case "Sellers":
        this.getSellerRegistrationsPerWeek()
        this.getSellerRegistrationMonth()
        this.SellersCountsBystatus()
        break;

    }
  }

  //* Customers
  callGetGenderCount() {
    this.sub1=this.adminAnalysisService.getGenderCount().subscribe({
      next: (e) => {
        this.DonutChartData=[]
        this.DonutChartLabels=[]
        console.log(e.data)
        e.data.map(p => {
          this.DonutChartData.push(+p.count)
        })
        this.DonutChartLabels=["Female","Male"]
        this.DonutChart.series=this.DonutChartData
        this.DonutChart.labels=this.DonutChartLabels
      }
    })
  }
  callNumOfRegistrationOverMonth() {
    this.sub2=this.adminAnalysisService.numOfRegistrationOverMonth().subscribe({
      next: (e) => {
        this.LineChartData=[]
        console.log(e.data)
        e.data.forEach(p => {
          this.LineChartData.push(+p)
        })
        this.LineChart.series=[
          {
            name: "#Registeration",
            data: this.LineChartData
          }
        ]
      }
    })
  }
  callNumOfRegistrationOverDayOfWeeks() {
    this.sub3=this.adminAnalysisService.numOfRegistrationOverDayOfWeeks().subscribe({
      next: (e) => {
        this.ColumnChartData=[]
        console.log(e.data)
        e.data.forEach(p => {
          this.ColumnChartData.push(+p)
        })
        this.ColumnChart.series=[
          {
            name: "#Registeration",
            data: this.ColumnChartData
          }
        ]
      }
    })
  }

//* Orders
callGetOrdersByDayOfWeek(){
  this.sub4=this.adminAnalysisService.getOrdersByDayOfWeek().subscribe({
    next: (e) => {
      this.ColumnChartData=[]
      console.log("callGetOrdersByDayOfWeek")
      console.log(e.data)
      e.data.forEach(p => {
        this.ColumnChartData.push(+p)
      })
      this.ColumnChart.series=[
        {
          name: "#Orders",
          data: this.ColumnChartData
        }
      ]
    }
  })
}
callGetOrdersByMonth(){
  this.sub5=this.adminAnalysisService.getOrdersByMonth().subscribe({
    next: (e) => {
      this.LineChartData=[]
      console.log(e.data)
      e.data.forEach(p => {
        this.LineChartData.push(+p)
      })
      this.LineChart.series=[
        {
          name: "#Orders",
          data: this.LineChartData
        }
      ]
    }
  })
}
callGetOrderCountsByStatus(){
  this.sub6=this.adminAnalysisService.getOrderCountsByStatus().subscribe({
    next: (e) => {
      this.DonutChartData=[]
      this.DonutChartLabels=[]
      this.DonutChartData=e.data.values
      this.DonutChartLabels=e.data.labels
      this.DonutChart.series=this.DonutChartData
      this.DonutChart.labels=this.DonutChartLabels
    }
  })
}
//* Sellers
getSellerRegistrationsPerWeek(){
  this.sub7=this.adminAnalysisService.getSellerRegistrationsPerWeek().subscribe({
    next: (e) => {
      this.ColumnChartData=[]
      console.log("getSellerRegistrationsPerWeek")
      console.log(e.data)
      e.data.forEach(p => {
        this.ColumnChartData.push(+p)
      })
      this.ColumnChart.series=[
        {
          name: "#SellersRegisteration",
          data: this.ColumnChartData
        }
      ]
    }
  })
}
getSellerRegistrationMonth(){
  this.sub8=this.adminAnalysisService.getSellerRegistrationMonth().subscribe({
    next: (e) => {
      this.LineChartData=[]
      console.log(e.data)
      e.data.forEach(p => {
        this.LineChartData.push(+p)
      })
      this.LineChart.series=[
        {
          name: "#SellersRegisteration",
          data: this.LineChartData
        }
      ]
    }
  })
}
SellersCountsBystatus(){
  this.sub9=this.adminAnalysisService.SellersCountsBystatus().subscribe({
    next: (e) => {
      this.DonutChartData=[]
      this.DonutChartLabels=[]
      this.DonutChartData=e.data.values
      this.DonutChartLabels=e.data.labels
      this.DonutChart.series=this.DonutChartData
      this.DonutChart.labels=this.DonutChartLabels
    }
  })
}
//* Cards
Cards(){
  this.sub10=this.adminAnalysisService.getNumofProducts().subscribe({
    next: (e) => {
      this.NumofProducts=e.data
    }
  })
  this.sub11=this.adminAnalysisService.getNumofOrders().subscribe({
    next: (e) => {
      this.NumofOrders=e.data
    }
  })
  this.sub12=this.adminAnalysisService.getNumofBranches().subscribe({
    next: (e) => {
      this.NumofBranches=e.data
    }
  })
  this.sub13=this.adminAnalysisService.getTotalSales().subscribe({
    next: (e) => {
      this.TotalSales=e.data
    }
  })
}
ngOnDestroy(): void {
  if(this.sub1){
    this.sub1.unsubscribe()
  }
  if(this.sub2){
    this.sub2.unsubscribe()
  }
  if(this.sub3){
    this.sub3.unsubscribe()
  }
  if(this.sub4){
    this.sub4.unsubscribe()
  }
  if(this.sub5){
    this.sub5.unsubscribe()
  }
  if(this.sub6){
    this.sub6.unsubscribe()
  }
  if(this.sub7){
    this.sub7.unsubscribe()
  }
  if(this.sub8){
    this.sub8.unsubscribe()
  }
  if(this.sub9){
    this.sub9.unsubscribe()
  }
  if(this.sub10){
    this.sub10.unsubscribe()
  }
  if(this.sub11){
    this.sub11.unsubscribe()
  }
  if(this.sub12){
    this.sub12.unsubscribe()
  }
  if(this.sub13){
    this.sub13.unsubscribe()
  }
}


}




import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { ApexAxisChartSeries, ApexNonAxisChartSeries, ApexResponsive, ApexChart, ApexXAxis, ApexDataLabels, ApexTitleSubtitle, ChartComponent, NgApexchartsModule, ApexPlotOptions, ApexYAxis, ApexFill } from 'ng-apexcharts'
import { AnalysisService } from '../_services/analysis.service';

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

export class DashboardComponent implements OnInit {
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
    this.adminAnalysisService.getGenderCount().subscribe({
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
    this.adminAnalysisService.numOfRegistrationOverMonth().subscribe({
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
    this.adminAnalysisService.numOfRegistrationOverDayOfWeeks().subscribe({
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
  this.adminAnalysisService.getOrdersByDayOfWeek().subscribe({
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
  this.adminAnalysisService.getOrdersByMonth().subscribe({
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
  this.adminAnalysisService.getOrderCountsByStatus().subscribe({
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
  this.adminAnalysisService.getSellerRegistrationsPerWeek().subscribe({
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
  this.adminAnalysisService.getSellerRegistrationMonth().subscribe({
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
  this.adminAnalysisService.SellersCountsBystatus().subscribe({
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




}




// export class DashboardComponent implements OnInit {
//   @ViewChild("chart") chart!: ChartComponent;
//   public chartOptions: Partial<ChartOptions>;

//   constructor() {
//     this.chartOptions = {
//       series: [
//         {
//           name: "Sales",
//           data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
//         }
//       ],
//       chart: {
//         height: 350,
//         type: "line",
//         zoom: { enabled: true }
//       },
//       title: {
//         text: "Product Trends by Month"
//       },
//       xaxis: {
//         categories: [
//           "Jan",
//           "Feb",
//           "Mar",
//           "Apr",
//           "May",
//           "Jun",
//           "Jul",
//           "Aug",
//           "Sep"
//         ]
//       }
//     };
//   }

//   ngOnInit(): void {
//     // Initialization logic here
//   }
// }

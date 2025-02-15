import { AfterViewInit, Component,OnInit, ViewChild } from '@angular/core';
import {FormsModule} from '@angular/forms'
import {ApexAxisChartSeries, ApexNonAxisChartSeries,ApexResponsive,ApexChart,ApexXAxis,ApexDataLabels,ApexTitleSubtitle,ChartComponent, NgApexchartsModule,ApexPlotOptions, ApexYAxis,ApexFill} from 'ng-apexcharts'

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
  imports:[
    NgApexchartsModule,
    FormsModule
  ],
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent  {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions1: ChartOptions1;
  public chartOptions2: ChartOptions2;
  public chartOptions3: ChartOptions3;
  constructor() {
    this.chartOptions1 = {
      series: [
        {
          name: "Desktops",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
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
        text: "Product Trends by Month",
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

      this.chartOptions2 = {
        series: [44, 55, 13, 43, 22],
        chart: {
          width: "50%",
          type: "pie"
        },
        labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: "100%"
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      };
      this.chartOptions3 = {
        series: [
          {
            name: "Inflation",
            data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
          }
        ],
        chart: {
          width:"50%",
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
          formatter: function(val) {
            return val + "%";
          },
          offsetY: -20,
          style: {
            fontSize: "12px",
            colors: ["#304758"]
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
            "Sep",
            "Oct",
            "Nov",
            "Dec"
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
            formatter: function(val) {
              return val + "%";
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

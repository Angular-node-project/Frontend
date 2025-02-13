import { Component,OnInit, ViewChild } from '@angular/core';
import {FormsModule} from '@angular/forms'
import {ApexAxisChartSeries,ApexChart,ApexXAxis,ApexDataLabels,ApexTitleSubtitle,ChartComponent, NgApexchartsModule} from 'ng-apexcharts'

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
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
export class DashboardComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Sales",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: { enabled: true }
      },
      title: {
        text: "Product Trends by Month"
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
  }

  ngOnInit(): void {
    // Initialization logic here
  }
}

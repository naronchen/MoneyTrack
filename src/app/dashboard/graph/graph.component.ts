import { Component, ViewChild } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import { SpendingService } from "src/app/services/spending.service";
import { TagService } from "src/app/services/tag-service.service";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  tags: string[] = [];

  constructor(private spendingService: SpendingService, private tagService: TagService) {
    this.chartOptions = {
      series: [],
      chart: {
        width: 440,
        type: "pie"
      },
      labels: [],
      responsive: [
        {
          breakpoint: 400,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  ngOnInit(){
    this.tags = this.tagService.getTags();

    this.spendingService.spendings$.subscribe(data => {
      // console.log(data.filter(item => item.tag == 'transportation'))
      const groupedData = data.reduce((acc, item) => {
        // If the tag already exists in the accumulator, add the current amount to it.
        if (acc[item.tag]) {
          acc[item.tag] += item.amount;
          acc[item.tag] = Math.round(acc[item.tag] * 100) / 100;
        } else {
          // If the tag doesn't exist in the accumulator, initialize it with the current amount.
          acc[item.tag] = item.amount;
        }
        return acc;
      }, {});
  
      console.log(groupedData); // This should give you an object with the tag names as keys and the summed amounts as values.
      this.chartOptions.series = Object.values(groupedData)
      this.chartOptions.labels = Object.keys(groupedData)
    });
  }
}

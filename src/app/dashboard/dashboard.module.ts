import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewSpendingComponent } from './new-spending/new-spending.component';
import { DashboardComponent } from './dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecentSpendingComponent } from './recent-spending/recent-spending.component';
import { SummaryComponent } from './summary/summary.component';
import { GraphComponent } from './graph/graph.component';

// import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { NgApexchartsModule } from 'ng-apexcharts';





@NgModule({
  declarations: [
    DashboardComponent,
    NewSpendingComponent,
    RecentSpendingComponent,
    SummaryComponent,
    GraphComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgApexchartsModule

  ]
})
export class DashboardModule { }

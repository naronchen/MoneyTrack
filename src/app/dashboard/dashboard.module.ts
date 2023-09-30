import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewSpendingComponent } from './new-spending/new-spending.component';
import { DashboardComponent } from './dashboard.component';



@NgModule({
  declarations: [
    DashboardComponent,
    NewSpendingComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DashboardModule { }

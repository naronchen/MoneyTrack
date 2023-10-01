import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewSpendingComponent } from './new-spending/new-spending.component';
import { DashboardComponent } from './dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecentSpendingComponent } from './recent-spending/recent-spending.component';



@NgModule({
  declarations: [
    DashboardComponent,
    NewSpendingComponent,
    RecentSpendingComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }

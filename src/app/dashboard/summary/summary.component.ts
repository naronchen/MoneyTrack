import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { last } from 'rxjs';
import { SpendingService } from 'src/app/services/spending.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {
  weekTotal: number = 0;
  monthTotal: number = 0;
  todayTotal: number = 0;

  monthBudget: number = 900;
  weekBudget: number = 210;

  constructor(private spendingService: SpendingService){}
  
  ngOnInit(){
    this.spendingService.spendings$.subscribe(data => {
      // console.log("summary section: ", data)

      //filter those in this week
      const weekData = data.filter(item => this.isInCurrentWeek(item.date))
      this.weekTotal = this.sumAmounts(weekData);

      const monthData = data.filter(item => this.isInCurrentMonth(item.date))
      this.monthTotal = this.sumAmounts(monthData);
      // console.log(monthData, this.monthTotal)

      const today = new Date().setHours(0,0,0,0);
      const todayData = data.filter(item => this.convertToDate(item.date).setHours(0,0,0,0) === today);
      this.todayTotal = this.sumAmounts(todayData)
      
    })
  }

  sumAmounts = (dataArray: any[]) => {
    return dataArray.reduce((total, item) => total + item.amount, 0);
  }

  isInCurrentWeek = (thisDate: string) => {
    const today = new Date();
    // console.log("today",today)

    const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()+1))
    firstDayOfWeek.setHours(0, 0, 0, 0);
    // console.log("first",firstDayOfWeek)

    const lastDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()+7))
    lastDayOfWeek.setHours(23, 59, 59, 999);
    // console.log("last", lastDayOfWeek)

    const date = this.convertToDate(thisDate);

    return date >= firstDayOfWeek && date <= lastDayOfWeek
  }

  isInCurrentMonth = (thisDate: string) => {
    const today = new Date();
  
    // First day of the current month
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    firstDayOfMonth.setHours(0, 0, 0, 0);
  
    // Last day of the current month (by setting the day to 0 of the next month)
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    lastDayOfMonth.setHours(23, 59, 59, 999);
  
    const date = this.convertToDate(thisDate);
  
    return date >= firstDayOfMonth && date <= lastDayOfMonth;
  }
  
  convertToDate = (thisDate: string): Date => {
    const parts = thisDate.split('-');
    const year = +parts[0];
    const month = +parts[1] - 1;  // JavaScript months are 0-based
    const day = +parts[2];
    
    return new Date(year, month, day);
  }
  
}

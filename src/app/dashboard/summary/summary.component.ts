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
  
  constructor(private spendingService: SpendingService){}
  
  ngOnInit(){
    this.spendingService.spendings$.subscribe(data => {
      console.log("summary section: ", data)
      //filter those in this week
      this.isInCurrentWeek("none");
      const weekData = data.filter(item => this.isInCurrentWeek(item.date))
      console.log(weekData)
    })
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

    const parts = thisDate.split('-');
    const year = +parts[0];
    const month = +parts[1] - 1;
    const day = +parts[2];
    const date = new Date(year, month, day);

    return date >= firstDayOfWeek && date <= lastDayOfWeek
  }
}

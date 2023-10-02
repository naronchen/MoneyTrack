import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';
import { SpendingService } from 'src/app/services/spending.service';

@Component({
  selector: 'app-recent-spending',
  templateUrl: './recent-spending.component.html',
  styleUrls: ['./recent-spending.component.scss']
})
export class RecentSpendingComponent {
  recentSpendings: any[] = [];
  private spendingSubscription?: Subscription;
  // constructor(private db: AngularFirestore, private afAuth: AngularFireAuth){}
  constructor(private spendingService: SpendingService){}
  ngOnInit(){
    // this.afAuth.authState.subscribe(user => {
    //   if (user) {
    //     this.spendingSubscription = this.db.collection('spending', ref => ref.where('uid', '==', user.uid))
    //       .valueChanges()
    //       .subscribe(data => {
    //         console.log(data);
    //         this.recentSpendings = data;
    //       });
    //   }
    // });
    this.spendingService.spendings$.subscribe(data => {
      this.recentSpendings = data.sort((a, b) => 
        b.date.localeCompare(a.date) || b.priorityIndex - a.priorityIndex
      );
    });
  }
}

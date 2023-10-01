import { Component, OnInit, OnDestroy } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { formatDate } from '@angular/common';
import { Subscription } from 'rxjs';  // Import Subscription from RxJS
import { AngularFireAuth } from '@angular/fire/compat/auth';



@Component({
  selector: 'app-new-spending',
  templateUrl: './new-spending.component.html',
  styleUrls: ['./new-spending.component.scss']
})
export class NewSpendingComponent {
  todayDate!: string;
  spendingForm?: FormGroup;
  private uidSubscription?: Subscription;  // Keep track of the subscription
  private authSubscription: Subscription;


  constructor(private fb: FormBuilder, private db: AngularFirestore, private afAuth: AngularFireAuth){

    const todayDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.spendingForm = this.fb.group({
      reason: [''],
      amount: [''],
      tag: [''],
      date: [todayDate]
    })

    this.authSubscription = this.afAuth.authState.subscribe(user => {
      if (user) {
        this.spendingForm?.addControl('uid', this.fb.control(user.uid));
      } else {
        console.log('User is not logged in');
      }
    });

  }

  onSubmit(){

    this.db.collection('spending').add(this.spendingForm?.value).then(() => {
      console.log('Form Value:', this.spendingForm?.value); 
      console.log('Spending Added to Database')
      this.spendingForm?.reset();
    })
  }

}

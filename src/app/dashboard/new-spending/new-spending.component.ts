import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-new-spending',
  templateUrl: './new-spending.component.html',
  styleUrls: ['./new-spending.component.scss']
})
export class NewSpendingComponent {
  todayDate!: string;
  spendingForm?: FormGroup;

  constructor(private fb: FormBuilder, private db: AngularFirestore){
    const todayDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.spendingForm = this.fb.group({
      reason: [''],
      amount: [''],
      tag: [''],
      date: [todayDate] 
    })
  }

  onSubmit(){
    this.db.collection('spending').add(this.spendingForm?.value).then(() => {
      console.log('Spending Added to Database')
      this.spendingForm?.reset();
    })
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { formatDate } from '@angular/common';
import { Subscription } from 'rxjs';  // Import Subscription from RxJS
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { TagService } from 'src/app/services/tag-service.service';



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

  tags: string[] = [];

  constructor(private fb: FormBuilder, private db: AngularFirestore, private afAuth: AngularFireAuth, public tagService: TagService){

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

  ngOnInit(){
    this.tags = this.tagService.getTags();
  }

  onSubmit(){
    const uid = this.spendingForm?.get('uid')?.value;
    const todayDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    const statsRef = this.db.collection('spending').doc('--stats--');
    
    // Fetch the current stats
    statsRef.get().toPromise().then(doc => {
      let count = 1; // Fallback value in case doc doesn't exist
      if (doc?.exists) {
        count = (doc.data() as { count: number }).count + 1;  // Type assertion here
      }
  
      // Initialize a batch
      const batch = this.db.firestore.batch();
      
      // Prepare the new spending doc and include priority index (count)
      const newDocRef = this.db.collection('spending').doc().ref;
      const newDocData = {...this.spendingForm?.value, priorityIndex: count};
      batch.set(newDocRef, newDocData);
  
      // Update stats doc
      const increment = firebase.firestore.FieldValue.increment(1);
      batch.set(statsRef.ref, { count: increment }, { merge: true });
      
      // Commit the batch
      return batch.commit();
    }).then(() => {
      console.log('Spending added and count incremented');
    
      // Reset your form here
      this.spendingForm?.reset();
      this.spendingForm?.patchValue({
        uid: uid,
        date: todayDate,
      });
    }).catch(err => {
      console.log('Error:', err);
    });
  }
  

}

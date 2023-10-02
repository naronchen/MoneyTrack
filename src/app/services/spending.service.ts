import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpendingService {
  private spendingSubject = new BehaviorSubject<any[]>([]);
  public spendings$: Observable<any[]> = this.spendingSubject.asObservable()
  
  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth){
    this.fetchSpendings();
  }

  private fetchSpendings(): void{
    this.afAuth.authState.subscribe(user => {
      if (user){
        this.db.collection('spending', ref => ref.where('uid', '==', user.uid))
                .valueChanges()
                .subscribe(data => {
                  this.spendingSubject.next(data)
                })
      }
    })
  }

}

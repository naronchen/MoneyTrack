import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private authSubscription: Subscription;

  constructor(public afAuth: AngularFireAuth){
    
    this.authSubscription = this.afAuth.authState.subscribe(user => {
      if (user) {
        console.log('User is logged in', user);
        console.log('authState 1', afAuth.authState)
      } else {
        console.log('User is not logged in');
      }
    });
  }

  logOut(){
    this.afAuth.signOut().then(()=>{
      console.log("user just signed out!")
      console.log('authState 2', this.afAuth.authState)

    })
  }
  ngOnDestroy() {
    // Unsubscribe when the component is destroyed
    this.authSubscription.unsubscribe();
  }

}

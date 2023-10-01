import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subscription } from 'rxjs';
// import { UserService } from '../user-service.service';


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
        // this.userService.setUid(user.uid)
        console.log('User is logged in');
      } else {
        console.log('User is not logged in');
      }
    });

  }

  ngOnDestroy() {
    // Unsubscribe when the component is destroyed
    this.authSubscription.unsubscribe();
  }

}

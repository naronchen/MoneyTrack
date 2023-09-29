import { Component, inject} from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private auth: Auth){  }
  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }
  // signInWithGoogle(){
  //   const provider = new GoogleAuthProvider();
  //   this.auth.signInWithPopup

  //   this.afAuth.signInWithPopup(provider).then(
  //     response => {
  //       console.log(response)
  //     }
  //   ).catch(
  //     err => {
  //       console.log(err)
  //     }
  //   )
  // }

}

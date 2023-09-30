import { Directive, HostListener } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Directive({
  selector: '[appLogout]'
})
export class LogoutDirective {

  constructor(private afAuth: AngularFireAuth) { }

  @HostListener('click')
  onClick() {
    this.afAuth.signOut().then(() => {
      console.log("User just signed out!");
    });
  }
}

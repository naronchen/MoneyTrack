import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleSigninDirective } from './user/google-signin.directive';
import { LogoutDirective } from './user/logout.directive';



@NgModule({
  declarations: [
    GoogleSigninDirective,
    LogoutDirective
  ],
  imports: [
    CommonModule,
  ],
  exports: [GoogleSigninDirective,LogoutDirective]  

})
export class SharedModule { }

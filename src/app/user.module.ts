import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user/user-routing.module';
import { LoginComponent } from './user/login/login.component';
import { LogoutDirective } from './user/logout.directive';
import { SharedModule } from './shared.module';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
  ]
})
export class UserModule { }

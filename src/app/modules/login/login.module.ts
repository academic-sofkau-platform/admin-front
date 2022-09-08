import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { CoolSocialLoginButtonsModule } from '@angular-cool/social-login-buttons';

@NgModule({
  imports: [
    CommonModule,
    CoolSocialLoginButtonsModule,
    
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }

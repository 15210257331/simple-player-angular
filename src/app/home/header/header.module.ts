import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header.component';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  declarations: [
    HeaderComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    LoginComponent,
    HeaderComponent
  ],
  entryComponents: [
    LoginComponent,
    
  ]
})
export class HeaderModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared.module';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav.component';


@NgModule({
  declarations: [
    NavComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    NavComponent,
    LoginComponent,
  ],
  entryComponents: [
    LoginComponent
  ]
})
export class NavModule { }

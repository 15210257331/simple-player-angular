import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppCommonModule } from '../../app-common.module';
import { RadioComponent } from './radio.component';


const  route: Routes = [
    {
        path: '',
        component: RadioComponent
    }
];


@NgModule({
  declarations: [
    RadioComponent
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    RouterModule.forChild(route)
  ],
  exports: [
  ]
})
export class RadioModule { }

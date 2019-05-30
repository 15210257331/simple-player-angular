import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { SingerComponent } from '../singer/singer.component';


const route: Routes = [
    {
      path: '',
      component: SingerComponent,
    },
  ];

@NgModule({
  declarations: [
    SingerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(route),
  ],
  exports: [
  ],
})
export class SingerModule { }

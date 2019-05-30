import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { HotComponent } from './hot.component';

const route: Routes = [
    {
      path: '',
      component: HotComponent,
    },
  ];

@NgModule({
  declarations: [
    HotComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(route),
  ],
  exports: [
  ],
})
export class HotModule { }

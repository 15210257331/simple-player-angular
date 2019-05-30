import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { MvComponent } from '../mv/mv.component';

const route: Routes = [
    {
      path: '',
      component: MvComponent,
    },
  ];

@NgModule({
  declarations: [
    MvComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(route),
  ],
  exports: [

  ],
})
export class MvModule { }

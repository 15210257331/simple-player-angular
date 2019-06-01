import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { HotComponent } from './hot.component';
import { HotDetailComponent } from './hot-detail/hot-detail.component';

const route: Routes = [
    {
      path: '',
      component: HotComponent,
    },
    {
      path: 'detail',
      component: HotDetailComponent,
    },
  ];

@NgModule({
  declarations: [
    HotComponent,
    HotDetailComponent,
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

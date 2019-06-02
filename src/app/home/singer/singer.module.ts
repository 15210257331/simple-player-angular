import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { SingerComponent } from '../singer/singer.component';
import { SingerDetailComponent } from './singer-detail/singer-detail.component';


const route: Routes = [
    {
      path: '',
      component: SingerComponent,
    },
    {
      path: 'detail',
      component: SingerDetailComponent,
    },
  ];

@NgModule({
  declarations: [
    SingerComponent,
    SingerDetailComponent
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

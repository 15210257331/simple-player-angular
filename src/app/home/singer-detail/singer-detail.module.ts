import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppCommonModule } from '../../app-common.module';
import { SingerDetailComponent } from './singer-detail.component';

const  route: Routes = [
    {
        path: '',
        component: SingerDetailComponent
    }
];

@NgModule({
  declarations: [
    SingerDetailComponent
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    RouterModule.forChild(route),
  ],
  exports: [
  ]
})
export class SingerDetailModule { }

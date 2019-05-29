import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppCommonModule } from '../../app-common.module';
import { MylikeComponent } from './mylike.component';

const  route: Routes = [
    {
        path: '',
        component: MylikeComponent
    }
];

@NgModule({
  declarations: [
    MylikeComponent
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    RouterModule.forChild(route)
  ],
  exports: [
  ]
})
export class MylikelModule { }

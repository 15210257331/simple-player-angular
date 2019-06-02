import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { LikeComponent } from './like.component';


const route: Routes = [
    {
      path: '',
      component: LikeComponent,
    },
  ];

@NgModule({
  declarations: [
    LikeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(route),
  ],
  exports: [
  ],
})
export class LikeModule { }

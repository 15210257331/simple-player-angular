import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppCommonModule } from '../../app-common.module';
import { MvComponent } from './mv.component';

const  route: Routes = [
    {
        path: '',
        component: MvComponent
    }
];

@NgModule({
  declarations: [
    MvComponent
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    RouterModule.forChild(route)
  ],
  exports: [
  ]
})
export class MvlModule { }

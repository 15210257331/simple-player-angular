import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { RankComponent } from '../rank/rank.component';


const route: Routes = [
    {
      path: '',
      component: RankComponent,
    },
  ];

@NgModule({
  declarations: [
    RankComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(route),
  ],
  exports: [
  ],
})
export class RankModule { }

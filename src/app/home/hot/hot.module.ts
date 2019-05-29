import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { HotComponent } from './hot.component';
import { ControlComponent } from '../control/control.component';
import { PlayerComponent } from '../player/player.component';

const route: Routes = [
    {
      path: '',
      component: HotComponent,
    },
  ];

@NgModule({
  declarations: [
    HotComponent,
    ControlComponent,
    PlayerComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(route),
  ],
  exports: [
    HotComponent // 别的模块要用这个组件必须得导出
  ],
})
export class HotModule { }

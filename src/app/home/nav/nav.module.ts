import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppCommonModule } from '../../app-common.module';
import { NavComponent } from './nav.component';

@NgModule({
  declarations: [
    NavComponent,
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    RouterModule
  ],
  exports: [
    NavComponent // 别的模块要用这个组件必须得导出
  ],
  entryComponents: [
    
  ]
})
export class NavModule { }

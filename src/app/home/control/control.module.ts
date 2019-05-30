import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared.module';
import { ControlComponent } from './control.component';
import { PlayListComponent } from './play-list/play-list.component';
import { PlayDetailComponent } from './play-detail/play-detail.component';


@NgModule({
  declarations: [
    ControlComponent,
    PlayListComponent,
    PlayDetailComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ControlComponent,
    PlayListComponent,
    PlayDetailComponent,
  ],
  entryComponents: [
    PlayListComponent
  ]
})
export class ControlModule { }

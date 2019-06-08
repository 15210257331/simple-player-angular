import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { SongListComponent } from './song-list.component';

const route: Routes = [
    {
      path: '',
      component: SongListComponent,
    },
  ];

@NgModule({
  declarations: [
    SongListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(route),
  ],
  exports: [
  ],
})
export class SongListModule { }

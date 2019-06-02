import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { VideoComponent } from './video.component';
import { VideoDetailComponent } from './video-detail/video-detail.component';

const route: Routes = [
    {
      path: '',
      component: VideoComponent,
    },
    {
      path: 'detail',
      component: VideoDetailComponent,
    },
  ];

@NgModule({
  declarations: [
    VideoComponent,
    VideoDetailComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(route),
  ],
  exports: [
  ],
})
export class VideoModule { }

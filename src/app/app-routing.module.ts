import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchDetailComponent } from './home/header/search-detail/search-detail.component';

const routes: Routes = [
    {
      path: '',
      redirectTo: 'hot',
      pathMatch: 'full'
    },
    {
      path: 'hot',
      loadChildren: './home/hot/hot.module#HotModule',
      canLoad: []
    },
    {
      path: 'singer',
      loadChildren: './home/singer/singer.module#SingerModule',
      canLoad: []
    },
    {
      path: 'video',
      loadChildren: './home/video/video.module#VideoModule',
      canLoad: []
    },
    {
      path: 'like',
      loadChildren: './home/like/like.module#LikeModule',
      canLoad: []
    },
    {
      path: 'search/detail',
      component: SearchDetailComponent,
      canLoad: []
    },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

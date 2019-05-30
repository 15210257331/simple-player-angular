import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
      path: 'rank',
      loadChildren: './home/rank/rank.module#RankModule',
      canLoad: []
    },
    {
      path: 'mv',
      loadChildren: './home/mv/mv.module#MvModule',
      canLoad: []
    },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

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
      path: 'mv',
      loadChildren: './home/mv/mv.module#MvlModule',
      canLoad: []
    },
    {
      path: 'radio',
      loadChildren: './home/radio/radio.module#RadioModule',
      canLoad: []
    },
    {
      path: 'detail',
      loadChildren: './home/detail/detail.module#DetailModule',
      canLoad: []
    },
   
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

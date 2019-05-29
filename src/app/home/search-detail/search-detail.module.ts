import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from '../../app-common.module';
import { SearchDetailComponent } from './search-detail.component';
import { Routes, RouterModule } from '@angular/router';

const  route: Routes = [
    {
        path: '',
        component: SearchDetailComponent
    }
];

@NgModule({
  declarations: [
    SearchDetailComponent,
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    RouterModule.forChild(route),
  ],
  exports: [
    // SearchDetailComponent
  ]
})
export class SearchDetailModule { }

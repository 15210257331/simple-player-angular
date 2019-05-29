import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HallComponent } from './hall.component';
import { ChosenComponent } from './chosen/chosen.component';
import { SingerComponent } from './singer/singer.component';
import { RankComponent } from './rank/rank.component';
import { SortComponent } from './sort/sort.component';
import { AlbumComponent } from './album/album.component';
import { AppCommonModule } from '../../app-common.module';

const route: Routes = [
  {
    path: '',
    component: HallComponent,
  },
];

@NgModule({
  declarations: [
    HallComponent,
    ChosenComponent,
    SingerComponent,
    RankComponent,
    SortComponent,
    AlbumComponent,
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    RouterModule.forChild(route),
  ],
  entryComponents: [
    ChosenComponent,
    SingerComponent,
    RankComponent,
    SortComponent,
    AlbumComponent,
  ]
})
export class HallModule { }

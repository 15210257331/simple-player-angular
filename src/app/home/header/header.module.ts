import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared.module';
import { SearchDetailComponent } from './search-detail/search-detail.component';
import { HeaderComponent } from './header.component';


@NgModule({
  declarations: [
    HeaderComponent,
    SearchDetailComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    HeaderComponent,
    SearchDetailComponent
  ],
  entryComponents: [

  ]
})
export class HeaderModule { }

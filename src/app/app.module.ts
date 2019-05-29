import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UtilsService } from './service/util.service';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { HeaderModule } from './home/header/header.module';
import { PlayerModule } from './home/player/player.module';
import { NavModule } from './home/nav/nav.module';
import { SharedModule } from './shared.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from "@ngrx/effects";
import { reducers, effects } from './store';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    HeaderModule,
    PlayerModule,
    NavModule,
    SharedModule,
    // 注册全局的reducer和effects
    StoreModule.forRoot(reducers), 
    EffectsModule.forRoot(effects),
  ],
  providers: [UtilsService, { provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

import { SharedModule } from './shared.module';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects } from './store';

import { AppComponent } from './app.component';
import { NavComponent } from './home/nav/nav.component';
import { HeaderComponent } from './home/header/header.component';
import { ApiService } from './service/api.service';
import { UserService } from './service/user.service';
import { ControlModule } from './home/control/control.module';
import { UtilsService } from './service/util.service';


registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    // 注册全局的reducer和effects
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    ControlModule
  ],
  providers: [
    UtilsService,
    UserService,
    ApiService,
    { provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }

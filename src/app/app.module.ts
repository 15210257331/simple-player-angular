import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';
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
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { NavComponent } from './home/nav/nav.component';
import { HeaderComponent } from './home/header/header.component';
import { ApiService } from './service/api.service';
import { ControlModule } from './home/control/control.module';
import { environment } from 'src/environments/environment';
import { httpInterceptorProviders } from './service/interceptor';


registerLocaleData(zh);

enableProdMode(); // 解决父组件检查完后 子组件有改变了父组件的属性 而产生的二次见检查报错

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
    ControlModule,
    // 注册全局的reducer和effects
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [
    ApiService,
    { provide: NZ_I18N, useValue: zh_CN }],
    ...httpInterceptorProviders,
   
  bootstrap: [AppComponent]
})
export class AppModule { }

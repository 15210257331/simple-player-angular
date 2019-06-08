import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CounterComponent } from './components/counter/counter.component';
import { SwitchComponent } from './components/switch/switch.component';
import { ProgressComponent } from './components/progress/progress.component';
import { LoadingComponent } from './components/loading/loading.component';
import { PageComponent } from './components/page/page.component';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NumberPipe } from './pipe/number.pipe';
import { ClassifyComponent } from './components/classify/classify.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { BuildingComponent } from './components/building/building.component';
import { TimePipe } from './pipe/time.pipe';
import { EmptyComponent } from './components/empty/empty.component';
import { DebounceDirective } from './directive/debounce.directive';


@NgModule({
  declarations: [
    CounterComponent,
    SwitchComponent,
    ProgressComponent,
    LoadingComponent,
    EmptyComponent,
    PageComponent,
    ClassifyComponent,
    NotfoundComponent,
    BuildingComponent,
    NumberPipe,
    TimePipe,
    DebounceDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgZorroAntdModule
  ],
  providers: [],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgZorroAntdModule,
    CounterComponent,
    SwitchComponent,
    ProgressComponent,
    LoadingComponent,
    EmptyComponent,
    PageComponent,
    ClassifyComponent,
    NotfoundComponent,
    BuildingComponent,
    NumberPipe,
    TimePipe,
    DebounceDirective
  ]
})
export class SharedModule { }

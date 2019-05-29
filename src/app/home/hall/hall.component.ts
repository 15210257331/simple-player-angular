import { Component, OnInit, ViewChild, ComponentRef, ViewContainerRef, ComponentFactoryResolver, ComponentFactory } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { finalize } from 'rxjs/operators';
import { MusicStore, musicListActions } from 'src/app/store/music.store';
import { UtilsService } from 'src/app/service/util.service';
import { ChosenComponent } from './chosen/chosen.component';
import { SingerComponent } from './singer/singer.component';
import { AlbumComponent } from './album/album.component';
import { SortComponent } from './sort/sort.component';
import { RankComponent } from './rank/rank.component';

@Component({
  selector: 'app-hall',
  templateUrl: './hall.component.html',
  styleUrls: ['./hall.component.scss']
})
export class HallComponent implements OnInit {

  componentRef: ComponentRef<any>;

  @ViewChild("hallContainer", { read: ViewContainerRef }) hallContainer: ViewContainerRef;
  
  selectIndex: number = 0;

  componentsMap: any = [
    {
      name: '精选',
      index: 1,
      component: ChosenComponent,
    },
    {
      name: '歌手',
      index: 2,
      component: SingerComponent,
    },
    {
      name: '排行',
      index: 3,
      component: RankComponent,
    },
    {
      name: '分类歌单',
      index: 4,
      component: SortComponent,
    },
    {
      name: '数字专辑',
      index: 5,
      component: AlbumComponent,
    },
  ]

  constructor(
    private apiService: ApiService,
    public musicStore: MusicStore,
    public utilsService: UtilsService,
    private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
    const selectedTab =  localStorage.getItem('selectedTab');
    if(selectedTab) {
      this.createComponent(selectedTab['component']);
      this.selectIndex = selectedTab['index'];
    } else {
      this.createComponent(this.componentsMap[0].component);
      this.selectIndex = this.componentsMap[0].index;
    }
  }
  
  // 动态创建tab组件
  createComponent(component: any) {
    this.hallContainer.clear();
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(component);
    this.componentRef = this.hallContainer.createComponent(factory);
  }

  changeTab(item: any) {
    this.createComponent(item.component);
    this.selectIndex = item.index;
  }
}

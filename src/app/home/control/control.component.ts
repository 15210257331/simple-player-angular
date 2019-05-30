import { Component, Input, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd'
import { PlayListComponent } from './play-list/play-list.component';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

  value: string = 'zhagsan';

  isShowDetail: boolean = false;

  currentMusic: any;

  playList: Array<any> = [];

  showList = false;

  audioRef: any;

  musicMaskRef: any;

  musicLrcRef: any;

  currentIndexInPlayList = 0;

  rate = 0;

  nowPlayLrcIndex;

  constructor(
    private drawerService: NzDrawerService
  ) { }

  ngOnInit() {
  }

  showPlaylist() {
    const drawerRef = this.drawerService.create<PlayListComponent, { value: string }, string>({
      nzTitle: 'Component',
      nzContent: PlayListComponent,
      nzContentParams: {
        value: this.value
      }
    });

    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Component) open');
    });

    drawerRef.afterClose.subscribe(data => {
      console.log(data);
      if (typeof data === 'string') {
        this.value = data;
      }
    });
  }

  showDetail() {
    this.isShowDetail = !this.isShowDetail;
  }

  collectionMusic() {

  }
}

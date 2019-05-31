import { Component, Input, TemplateRef, ViewChild, OnInit, ElementRef, Renderer2, AfterContentInit } from '@angular/core';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd'
import { PlayListComponent } from './play-list/play-list.component';
import { fromEvent } from 'rxjs';
import { UtilsService } from '../../service/util.service';

import { Store, select } from '@ngrx/store';
import { LoadCurrentSong } from '../../store';
import { PlaylistState } from '../../store/reducers/playlist.reducer';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit, AfterContentInit {

  value: string = 'zhagsan';

  isShowDetail: boolean = false;

  currentSong: any;

  playList: Array<any> = [];

  showList = false;

  audioRef: any;

  musicMaskRef: any;

  musicLrcRef: any;

  currentIndexInPlayList = 0;

  rate = 0;

  nowPlayLrcIndex;

  constructor(
    private drawerService: NzDrawerService,
    private el: ElementRef,
    private renderer2: Renderer2,
    public utilsService: UtilsService,
    private store: Store<{PlaylistState:PlaylistState}>
  ) { }

  ngOnInit() {
    // this.store.dispatch(new LoadCurrentSong());
    const playlist$ =  this.store.pipe(select('PlaylistState')).subscribe(res => {
      console.log(res);
      this.currentSong = res.currentSong;
    })
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

  ngAfterContentInit() {
    this.audioRef = this.el.nativeElement.querySelector('.audio');
    const progress$ = fromEvent(this.audioRef, 'timeupdate').subscribe(v => {
      this.rate = this.audioRef.currentTime / this.audioRef.duration;
    });
    const ended$ = fromEvent(this.audioRef, 'ended').subscribe(v => {
      this.next();
    });
  }

  getCurrentIndex() {
    if (this.playList.length > 0) {
      this.playList.map((item, index) => {
        if (item.id === this.currentSong._id) {
          this.currentIndexInPlayList = index;
        }
      });
    }
  }

  change(event) {
    this.rate = event;
    this.audioRef.currentTime = this.audioRef.duration * this.rate;
  }

  togglePlay() {
    if (this.audioRef.paused) {
      this.audioRef.play();
    } else {
      this.audioRef.pause();
    }
  }

  previous() {
    if (this.currentIndexInPlayList <= 0) {
      return;
    }
    this.currentIndexInPlayList -= 1;
    // this.musicStore.dispatch(musicListActions.getCurrentMusic, this.playList[this.currentIndexInPlayList])
    // .subscribe(res => {});
  }

  next() {
    if (this.currentIndexInPlayList >= this.playList.length - 1) {
      return;
    }
    this.currentIndexInPlayList += 1;
    // this.musicStore.dispatch(musicListActions.getCurrentMusic, this.playList[this.currentIndexInPlayList])
    // .subscribe(res => {});
  }

  playMusic(index: number) {
    this.currentIndexInPlayList = index;
    // this.musicStore.dispatch(musicListActions.getCurrentMusic, this.playList[this.currentIndexInPlayList])
    // .subscribe(res => {});
  }

  collectionMusic(_id: string) {

  }

  deleteMusic(index: number) {
    if (this.playList.length === 1) {
        // this.musicStore.clear();
        return;
    }
    if (index === this.currentIndexInPlayList) {
      if (index === this.playList.length - 1) {
        this.playMusic(this.currentIndexInPlayList - 1);
      } else {
        this.playMusic(this.currentIndexInPlayList + 1);
      }
    }
    // this.musicStore.dispatch(musicListActions.deleteCurrentMusic, index)
    // .subscribe(res => {
    //   this.getCurrentIndex();
    // });
  }

  clearPlayList() {
    // this.musicStore.clear();
  }

}

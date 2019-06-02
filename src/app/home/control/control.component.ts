import { Component, Input, TemplateRef, ViewChild, OnInit, ElementRef, Renderer2, AfterContentInit, HostListener } from '@angular/core';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd'
import { PlayListComponent } from './play-list/play-list.component';
import { fromEvent } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { LoadCurrentSong, Appstate, ChangeCurrentSong } from '../../store';
import { PlaylistState } from '../../store/reducers/playlist.reducer';
import { map } from 'rxjs/operators';
import { ToogleShowPlaylist } from '../../store/actions/global.action';
import * as helper from '../../utils'

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit, AfterContentInit {

  showPlaylist: boolean = false;

  showDetail: boolean = false;

  currentSong: any;

  audioRef: any;

  rate = 0;

  playlist: any[] = [];

  currentSongIndexInPlaylist: number = 0; // 当前歌曲在播放列表中的角标

  constructor(
    private drawerService: NzDrawerService,
    private el: ElementRef,
    private renderer2: Renderer2,
    private store: Store<Appstate>
  ) { }

  ngOnInit() {
    const playlist$ = this.store
      .pipe(
        map(data => data.playlistState)
      )
      .subscribe(res => {
        this.currentSong = res.currentSong;
        this.playlist = res.playlist;
      })
    const global$ = this.store
      .pipe(
        map(data => data.globalState)
      )
      .subscribe(res => {
        this.showPlaylist = res.showPlaylist;
      });
  }

  toogleShowPlaylist() {
    this.store.dispatch(new ToogleShowPlaylist(true));
  }

  ngAfterContentInit() {
    this.audioRef = this.el.nativeElement.querySelector('.audio');
    const progress$ = fromEvent(this.audioRef, 'timeupdate').subscribe(v => {
      this.rate = this.audioRef.currentTime / this.audioRef.duration;
    });
    const ended$ = fromEvent(this.audioRef, 'ended').subscribe(v => {
      this.nextSong();
    });
  }

  changeProgressRate(event: any) {
    this.rate = event;
    this.audioRef.currentTime = this.audioRef.duration * this.rate;
  }

  togglePlayState() {
    if (this.audioRef.paused) {
      this.audioRef.play();
    } else {
      this.audioRef.pause();
    }
  }

  preSong() {
    if (this.currentSongIndexInPlaylist <= 0) {
      return;
    }
    this.currentSongIndexInPlaylist -= 1;
    let data = this.playlist[this.currentSongIndexInPlaylist];
    this.store.dispatch(new LoadCurrentSong(data));
  }

  nextSong() {
    if (this.currentSongIndexInPlaylist >= this.playlist.length - 1) {
      return;
    }
    this.currentSongIndexInPlaylist += 1;
    let data = this.playlist[this.currentSongIndexInPlaylist];
    this.store.dispatch(new LoadCurrentSong(data));
  }

  collectionMusic(_id: string) {

  }
}

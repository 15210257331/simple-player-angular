import { Component, OnInit, ElementRef, Renderer2, AfterContentInit } from '@angular/core';
import { MusicStore, musicListActions } from '../../store/music.store';
import { UtilsService } from '../../service/util.service';
import { MusicInfo } from '../../entity';
import { fromEvent } from 'rxjs';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, AfterContentInit {

  currentMusic: MusicInfo;

  playList: Array<any> = [];

  showList = false;

  audioRef: any;

  musicMaskRef: any;

  musicLrcRef: any;

  currentIndexInPlayList = 0;

  rate = 0;

  nowPlayLrcIndex;


  constructor(
    public musicStore: MusicStore,
    public utilsService: UtilsService,
    private el: ElementRef,
    private renderer2: Renderer2) { }

  ngOnInit() {
    const currentMusic$ = this.musicStore.select(MusicStore.currentMusic);
    const playList$ =  this.musicStore.select(MusicStore.playList);
    combineLatest(currentMusic$, playList$).subscribe(data => {
      this.currentMusic = data[0];
      this.playList = data[1];
      this.getCurrentIndex();
    });
  }

  ngAfterContentInit() {
    this.audioRef = this.el.nativeElement.querySelector('.audio');
    this.musicMaskRef = this.el.nativeElement.querySelector('.music-mask');
    this.musicLrcRef = this.el.nativeElement.querySelector('.music-lrc');
    const progress$ = fromEvent(this.audioRef, 'timeupdate').subscribe(v => {
      this.rate = this.audioRef.currentTime / this.audioRef.duration;
      for (let i = 0, l = this.currentMusic.lyrics.length; i < l; i++) {
        if (this.audioRef.currentTime > this.currentMusic.lyrics[i][0]) {
          this.currentMusic.lyrics[i][2] = true;
          this.nowPlayLrcIndex = i;
          const scrollHeight = i > 3 ? (i - 2) * 34 : 0;
          this.renderer2.setStyle(this.musicLrcRef, 'transform', 'translate(0px,-' + scrollHeight + 'px)');
          this.renderer2.setStyle(this.musicLrcRef, 'transition', 'all 1s');
        }
      }
    });
    const ended$ = fromEvent(this.audioRef, 'ended').subscribe(v => {
      this.next();
    });
  }

  getCurrentIndex() {
    if (this.playList.length > 0) {
      this.playList.map((item, index) => {
        if (item.id === this.currentMusic._id) {
          this.currentIndexInPlayList = index;
        }
      });
    }
  }

  showListAndLrc() {
    if (!this.showList) {
      this.showList = true;
      this.renderer2.setStyle(this.musicMaskRef, 'top', '0');
      this.renderer2.setStyle(this.musicMaskRef, 'bottom', '80px');
      this.renderer2.setStyle(this.musicMaskRef, 'padding-top', '60px');
    } else {
      this.showList = false;
      this.renderer2.setStyle(this.musicMaskRef, 'top', '100%');
      this.renderer2.setStyle(this.musicMaskRef, 'bottom', '0');
      this.renderer2.setStyle(this.musicMaskRef, 'padding-top', '0');
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
    this.musicStore.dispatch(musicListActions.getCurrentMusic, this.playList[this.currentIndexInPlayList])
    .subscribe(res => {});
  }

  next() {
    if (this.currentIndexInPlayList >= this.playList.length - 1) {
      return;
    }
    this.currentIndexInPlayList += 1;
    this.musicStore.dispatch(musicListActions.getCurrentMusic, this.playList[this.currentIndexInPlayList])
    .subscribe(res => {});
  }

  playMusic(index: number) {
    this.currentIndexInPlayList = index;
    this.musicStore.dispatch(musicListActions.getCurrentMusic, this.playList[this.currentIndexInPlayList])
    .subscribe(res => {});
  }

  collectionMusic(_id: string) {

  }

  deleteMusic(index: number) {
    if (this.playList.length === 1) {
        this.musicStore.clear();
        return;
    }
    if (index === this.currentIndexInPlayList) {
      if (index === this.playList.length - 1) {
        this.playMusic(this.currentIndexInPlayList - 1);
      } else {
        this.playMusic(this.currentIndexInPlayList + 1);
      }
    }
    this.musicStore.dispatch(musicListActions.deleteCurrentMusic, index)
    .subscribe(res => {
      this.getCurrentIndex();
    });
  }

  clearPlayList() {
    this.musicStore.clear();
  }

}

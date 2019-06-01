import { Component, OnInit, Input, ElementRef, Renderer2, HostListener } from '@angular/core';
import { fromEvent } from 'rxjs';


@Component({
  selector: 'app-play-detail',
  templateUrl: './play-detail.component.html',
  styleUrls: ['./play-detail.component.scss']
})
export class PlayDetailComponent implements OnInit {

  detailElement: any;

  musicLrcRef: any;

  _currentSong: any;

  nowPlayLrcIndex: number;

  @Input()
  set show(value: boolean) {
    if (value !== null) {
      this.setPlaylistClass(value);
    }
  }

  @Input() 
  set currentSong(value: any) {
    if(value) {
      this._currentSong = value;
    }
  }

  @Input() 
  set nowPlayTime(value: any) {
    if(value) {
      this.setSongLyricsClass(value);
    }
  }
  
  constructor(
    private el: ElementRef,
    private renderer2: Renderer2
  ) { }

  ngOnInit() {
    this.detailElement = this.el.nativeElement.querySelector('.song-detail-wrap');
    this.musicLrcRef = this.el.nativeElement.querySelector('.music-lrc');
  }

  setSongLyricsClass(currentTime: any) {
    for (let i = 0, l = this._currentSong.lyrics.length; i < l; i++) {
      if (currentTime > this._currentSong.lyrics[i][0]) {
        this._currentSong.lyrics[i][2] = true;
        this.nowPlayLrcIndex = i;
        const scrollHeight = i > 3 ? (i - 2) * 34 : 0;
        this.renderer2.setStyle(this.musicLrcRef, 'transform', 'translate(0px,-' + scrollHeight + 'px)');
        this.renderer2.setStyle(this.musicLrcRef, 'transition', 'all 1s');
      }
    }
  }

  setPlaylistClass(value: boolean) {
    if(this.detailElement) {
      if (value === true) {
        this.renderer2.setStyle(this.detailElement, 'top', '0');
        this.renderer2.setStyle(this.detailElement, 'bottom', '80px');
      } else {
        this.renderer2.setStyle(this.detailElement, 'top', '100%');
        this.renderer2.setStyle(this.detailElement, 'bottom', '0');
      }
    }
  }
}

import { Component, OnInit, Input, ElementRef, Renderer2, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { Appstate, ClearPlaylist, LoadCurrentSong, DeleteSongFromPlaylist } from '../../../store';
import { ToogleShowPlaylist } from '../../../store/actions/global.action';

@Component({
  selector: 'app-play-list',
  templateUrl: './play-list.component.html',
  styleUrls: ['./play-list.component.scss']
})
export class PlayListComponent implements OnInit {

  playlistElement: any;

  _playlist: any[] = [];

  _index: number = 0;

  @Input() 
  set playlist(value: any[]) {
    if(value) {
      this._playlist = value;
    }
  }

  @Input()
  set show(value: boolean) {
    if (value !== null) {
      this.setPlaylistClass(value);
    }
  }

  @Input()
  set index(value: number) {
    if (value) {
      this._index = value;
    }
  }

  constructor(
    private el: ElementRef,
    private renderer2: Renderer2,
    private store: Store<Appstate>
  ) { }

  ngOnInit() {
    this.playlistElement = this.el.nativeElement.querySelector('.playlist-wrap');
  }

  setPlaylistClass(value: boolean) {
    if(this.playlistElement) {
      if (value === true) {
        this.playlistElement.focus();
        this.renderer2.setStyle(this.playlistElement, 'right', '0');
      } else {
        this.renderer2.setStyle(this.playlistElement, 'right', '-400px');
      }
    }
  }

  closePlaylist() {
    this.store.dispatch(new ToogleShowPlaylist(false));
    this.setPlaylistClass(false);
  }

  clearPlaylist() {
    this.store.dispatch(new ClearPlaylist());
  }

  playSong(item: any) {
    this.store.dispatch(new LoadCurrentSong(item));
  }

  collectionSong() {

  }

  downloadSong() {

  }

  deleteSong(item: any) {
    this.store.dispatch(new DeleteSongFromPlaylist(item));
  }
}

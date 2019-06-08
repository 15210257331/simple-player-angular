import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Appstate, LoadCurrentSong, AddToPlaylist, LikeSong } from '../../../store';

@Component({
  selector: 'app-search-detail',
  templateUrl: './search-detail.component.html',
  styleUrls: ['./search-detail.component.scss']
})
export class SearchDetailComponent implements OnInit {

  keyword: string;

  loadingDone = false;

  listOverview: any;

  loadingMusic = false;

  musicList: any[] = [];

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private store: Store<Appstate>
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(data => {
      if (data['keyword']) {
        this.keyword = data['keyword'];
        this.initData();
      }
    });
  }

  initData() {
    this.apiService.searchMusic(this.keyword)
    .pipe(
      finalize(() => {
        this.loadingDone = true;
      })
    )
    .subscribe(res => {
      if (res['result']['songs']) {
        this.musicList = res['result']['songs'];
      } else {
        this.musicList = [];
      }
    });
  }

  playMusic(data: any) {
    this.store.dispatch(new LoadCurrentSong(data));
  }

  addToPlayList(data: any) {
    this.store.dispatch(new AddToPlaylist(data));
  }

  playAll(event) {
    // event.stopPropagation();
    // this.loadingMusic = true;
    // const songArray = this.musicList.slice(0, 20);
    // this.store.dispatch(new AddToPlaylist(songArray));
  }

  likeSong(data: any) {
    this.store.dispatch(new LikeSong(data));
  }

}

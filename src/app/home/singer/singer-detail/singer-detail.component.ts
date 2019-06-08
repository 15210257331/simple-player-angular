import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Appstate, LoadCurrentSong, AddToPlaylist, LikeSong } from '../../../store';

@Component({
  selector: 'app-singer-detail',
  templateUrl: './singer-detail.component.html',
  styleUrls: ['./singer-detail.component.scss']
})
export class SingerDetailComponent implements OnInit {

  loadingDone = false;

  listOverview: any;

  musicList: any[] = [];

  loadingMusic = false;

  id: string;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private store: Store<Appstate>
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(data => {
      if (data['id']) {
        this.id = data['id'];
        this.initData();
      }
    });
  }

  initData() {
    this.apiService.getSingerDetail(this.id)
    .pipe(
      finalize(() => {
        this.loadingDone = true;
      })
    )
    .subscribe(res => {
      this.musicList = res['hotSongs'];
      this.musicList = this.musicList.map(item => {
        item.dt = String(item.dt).substring(0,3);
        return item;
      });
      this.listOverview = {
        name: res['artist']['name'],
        description: res['artist']['briefDesc'],
        coverImgUrl: res['artist']['picUrl'],
        tags: res['artist']['alias']
      };
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

  lickSong(data: any) {
    this.store.dispatch(new LikeSong(data));
  }
}

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { MusicStore, musicListActions } from '../../store/music.store';
import { UtilsService } from '../../service/util.service';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';

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
    public musicStore: MusicStore,
    public utilsService: UtilsService,
    private activatedRoute: ActivatedRoute
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
    this.musicStore.dispatch(musicListActions.getCurrentMusic, data).subscribe(res => {});
  }

  addToPlayList(data: any) {
    this.musicStore.dispatch(musicListActions.addToPlayList, [data]).subscribe(res => {});
  }

  playAll(event) {
    event.stopPropagation();
    this.loadingMusic = true;
    this.musicStore.dispatch(musicListActions.addToPlayList, this.musicList).subscribe(() => {
      this.musicStore.dispatch(musicListActions.getCurrentMusic, this.musicList[0]).subscribe(() => {
        this.loadingMusic = false;
      });
    });
  }

  collection(id: string) {

  }

}

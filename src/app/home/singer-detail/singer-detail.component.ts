import { Component, OnInit } from '@angular/core';
import { musicListActions, MusicStore } from '../../store/music.store';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from '../../service/util.service';
import { ApiService } from '../../service/api.service';

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
    public musicStore: MusicStore,
    public utilsService: UtilsService,
    private activatedRoute: ActivatedRoute
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
      this.listOverview = {
        name: res['artist']['name'],
        description: res['artist']['briefDesc'],
        coverImgUrl: res['artist']['picUrl'],
        tags: res['artist']['alias']
      };
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

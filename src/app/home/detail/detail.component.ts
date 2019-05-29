import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { MusicStore, musicListActions } from 'src/app/store/music.store';
import { UtilsService } from 'src/app/service/util.service';
import { finalize, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  loadingDone = false;

  loadingMusic = false;

  listOverview: any;

  musicList: any[] = [];

  id: string;

  constructor(
    private apiService: ApiService,
    public musicStore: MusicStore,
    public utilsService: UtilsService,
    private activatedRoute: ActivatedRoute,
    private notification: NzNotificationService,
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
    this.apiService.getChosenListDetail(this.id)
    .pipe(
      finalize(() => {
        this.loadingDone = true;
      })
    )
    .subscribe(res => {
      this.musicList = res['playlist']['tracks'];
      this.listOverview = {
        name: res['playlist']['name'],
        description: res['playlist']['description'],
        coverImgUrl: res['playlist']['coverImgUrl'],
        tags: res['playlist']['tags']
      };
    });
  }

  playMusic(data: any) {
    this.musicStore.dispatch(musicListActions.getCurrentMusic, data)
    .pipe()
    .subscribe(res => {});
  }

  addToPlayList(data: any) {
    this.musicStore.dispatch(musicListActions.addToPlayList, [data]).subscribe(res => {
      this.notification.create('success', 'Notification Title', '添加到播放列表成功');
    });
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

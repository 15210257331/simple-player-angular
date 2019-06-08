import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';
import { finalize } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { LoadCurrentSong, AddToPlaylist, Appstate, LikeSong} from '../../../store';

@Component({
  selector: 'app-hot-detail',
  templateUrl: './hot-detail.component.html',
  styleUrls: ['./hot-detail.component.scss']
})
export class HotDetailComponent implements OnInit {

  loadingDone = false;

  loadingMusic = false;

  listOverview: any;

  musicList: any[] = [];

  id: string;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private notification: NzNotificationService,
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
    this.apiService.getChosenListDetail(this.id)
    .pipe(
      finalize(() => {
        this.loadingDone = true;
      })
    )
    .subscribe(res => {
      this.musicList = res['playlist']['tracks'];
      this.musicList = this.musicList.map(item => {
        item.dt = String(item.dt).substring(0,3);
        return item;
      });
      this.listOverview = {
        name: res['playlist']['name'],
        description: res['playlist']['description'],
        coverImgUrl: res['playlist']['coverImgUrl'],
        tags: res['playlist']['tags']
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

  likeSong(data: any) {
    this.store.dispatch(new LikeSong(data));
  }
}

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Store } from '@ngrx/store';
import { Appstate, LoadCurrentSong } from '../../store';
import { map } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';
import { MessageConstant } from '../../constant';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss']
})
export class LikeComponent implements OnInit {

  likeList: any[] = [];

  constructor(
    private apiService: ApiService,
    private store: Store<Appstate>,
    private message: NzMessageService,
  ) { }

  ngOnInit() {
    const userInfo$ = this.store
    .pipe(
      map(data => data.userState)
    )
    .subscribe(res => {
      if(!res.userInfo) {
        // this.message.success(MessageConstant.pleaseLogin);
      }
      if (res.likeList.length > 0) {
        const ids = res.likeList.join(',');
        this.apiService.getSongDetail(ids).subscribe(res => {
          this.likeList = res['songs'];
        });
      }
    });
  }

  playSong(data: any) {
    this.store.dispatch(new LoadCurrentSong(data));
  }
}

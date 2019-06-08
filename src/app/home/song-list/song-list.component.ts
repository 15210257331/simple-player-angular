import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Appstate, LoadCurrentSong } from '../../store';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent implements OnInit {

  songList: any[] = [];

  id: any;

  constructor(
    private apiService: ApiService,
    private store: Store<Appstate>,
    private message: NzMessageService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(res => {
      this.id = res.id;
      this.apiService.getChosenListDetail(this.id).subscribe(res => {
        this.songList = res.playlist.tracks;
      });
    })
  }

  playSong(data: any) {
    this.store.dispatch(new LoadCurrentSong(data));
  }
}

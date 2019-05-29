import { Component, OnInit } from '@angular/core';
import { MusicStore, musicListActions } from '../../store/music.store';
import { map, finalize } from 'rxjs/operators';
import { UtilsService } from 'src/app/service/util.service';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-mv',
  templateUrl: './mv.component.html',
  styleUrls: ['./mv.component.scss']
})
export class MvComponent implements OnInit {

  mvList: any[] = [];

  loadingDone = false;

  constructor(
    public musicStore: MusicStore,
    public utilsService: UtilsService,
    private apiService: ApiService
    ) { }

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.apiService.getMvList().pipe(
      finalize(() => {
        this.loadingDone = true;
      })
    ).subscribe(res => {
      this.mvList = res['data'];
    });
  }

  detail(id: any) {

  }

}

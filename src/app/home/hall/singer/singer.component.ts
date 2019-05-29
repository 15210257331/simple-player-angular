import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { MusicStore } from '../../../store/music.store';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-singer',
  templateUrl: './singer.component.html',
  styleUrls: ['./singer.component.scss']
})
export class SingerComponent implements OnInit {

  singerList: any[] = [];

  loadingDone = false;

  singerClassifyList: any[] = [];

  singerName: string;

  constructor(
    private apiService: ApiService,
    private musicStore: MusicStore,
    private router: Router
  ) { }

  ngOnInit() {
    this.singerClassifyList = this.apiService.getSingerClassifyList();
    this.getSingerList(this.singerClassifyList[0].code);
    this.singerName = this.singerClassifyList[0].name;
  }

  getSingerList(code: number) {
    this.apiService.getSingerList(code)
    .pipe(
      finalize(() => {
        this.loadingDone = true;
      })
    ).subscribe((res) => {
      this.singerList = res['artists'];
    });
  }

  changeClassify(code: number) {
    this.singerClassifyList.map(item => {
      if (item.code === code) {
        this.singerName = item.name;
      }
    });
    this.getSingerList(code);
  }

  detail(id: string) {
    this.router.navigate(['/singer-detail'], {queryParams: {id: id}});
  }
}

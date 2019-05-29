import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { finalize } from 'rxjs/operators';
import { MusicStore, musicListActions } from '../../../store/music.store';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-chosen',
  templateUrl: './chosen.component.html',
  styleUrls: ['./chosen.component.scss']
})
export class ChosenComponent implements OnInit {

  bannerArray: any[] = [];

  listArray: any[] = [];

  classifyList: any[] = [];

  loadingDone = false;

  constructor(
    private apiService: ApiService,
    private musicStore: MusicStore,
    private router: Router
    ) { }

  ngOnInit() {
    this.getBanner();
    this.getList();
    this.getClassify();
  }

  getClassify() {
    this.apiService.getCatlist().subscribe(res => {
      this.classifyList = res['sub'];
    });
  }

  getBanner() {
    this.apiService.getBanner().subscribe(res => {
      this.bannerArray = res['banners'];
    });
  }

  getList() {
    this.apiService.getChosenList()
    .pipe(
      finalize(() => {
        this.loadingDone = true;
      })
    )
    .subscribe(res => {
      this.listArray = res['result'];
    });
  }

  detail(id: string) {
    this.router.navigate(['/detail'], {queryParams: {id: id}});
  }

  changeClassify(code: number) {

  }
}

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Appstate } from '../../../store';
import { finalize } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.scss']
})
export class VideoDetailComponent implements OnInit {

  mvId: any;

  videoSrc: any = '';

  videoDetail: any = null;

  loadingDone: boolean = true;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private store: Store<Appstate>
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(data => {
      if (data['id']) {
        this.mvId = data['id'];
        this.initData();
      }
    });
  }

  initData() {
    forkJoin(
      this.apiService.getMvDetail(this.mvId),
      this.apiService.getMvUrl(this.mvId),
    )
    .pipe(
      finalize(() => {
        this.loadingDone = true;
      })
    )
    .subscribe(res => {
      this.videoDetail = res[0];
      this.videoSrc = res[1]['data']['url'];
      console.log(this.videoDetail.data);
    });
  }

}

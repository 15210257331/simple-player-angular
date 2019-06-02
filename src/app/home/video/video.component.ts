import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  mvList: any[] = [];

  loadingDone = false;

  mvClassifyList: any[] = [
    {
      code: 1,
      name: '最新MV'
    },
    {
      code: 2,
      name: '推荐MV'
    }
  ];

  constructor(
    private apiService: ApiService,
    private router: Router
    ) { }

  ngOnInit() {
    this.latestMvList();
  }

  latestMvList() {
    this.apiService.getLatestMvList().pipe(
      finalize(() => {
        this.loadingDone = true;
      })
    ).subscribe(res => {
      this.mvList = res['data'];
    });
  }

  reccomendMvList() {
    this.apiService.getReccomendMvList().pipe(
      finalize(() => {
        this.loadingDone = true;
      })
    ).subscribe(res => {
      this.mvList = res['result'];
    });
  }

  changeClassify(code: number) {
    if (code === 1) {
      this.latestMvList();
    } else if (code === 2) {
      this.reccomendMvList();
    }
  }

  detail(id: any) {
    this.router.navigate(['/video/detail'], { queryParams: { id: id } });
  }
}

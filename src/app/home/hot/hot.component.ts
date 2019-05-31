import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-hot',
  templateUrl: './hot.component.html',
  styleUrls: ['./hot.component.scss']
})
export class HotComponent implements OnInit {

  bannerArray: any[] = [];

  listArray: any[] = [];

  classifyList: any[] = [];

  loadingDone = false;

  constructor(
    private apiService: ApiService,
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

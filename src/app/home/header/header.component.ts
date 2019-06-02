import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { LoginComponent } from '../nav/login/login.component';
import { UserInfo } from '../../entity';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  keyword = '';

  userInfo: any = null;

  userInfoDetail: any = null;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private modalService: NzModalService,
    private message: NzMessageService,
    ) { }

  ngOnInit() {
  }

  searchMusic() {
    if (!this.keyword) {
      return;
    }
    this.router.navigate(['/search/detail'], {queryParams: {keyword: this.keyword}});
  }

  searchSuggest() {
    // console.log(121212);
    // if (!this.keyword) {
    //   return;
    // }
    // this.apiService.searchSuggest(this.keyword).subscribe(res => {
    //   console.log(res);
    // });
  }

  back() {
    window.history.back();
  }

  ahead() {
    window.history.forward();
  }

  refresh() {
    window.location.reload();
  }
}

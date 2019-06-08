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

  suggestList: any[] =  [];

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

  searchSuggest(event: any) {
    if (!this.keyword) {
      this.suggestList = [];
      return;
    }
    this.apiService.searchSuggest(this.keyword).subscribe(res => {
      this.suggestList = [].concat(res.result.songs).concat(res.result.albums).concat(res.result.artists);
      console.log(this.suggestList);
    });
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

  selectSuggestion(data: string) {
    this.keyword = data;
    this.searchMusic();
    this.suggestList = [];
  }
}

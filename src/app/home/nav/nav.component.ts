import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzModalService, NzMessageService } from 'ng-zorro-antd';
import { LoginComponent } from './login/login.component';
import { NONE_TYPE } from '@angular/compiler/src/output/output_ast';
import { ApiService } from '../../service/api.service';
import { Store } from '@ngrx/store';
import { Appstate, LoadUserInfo } from '../../store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  userInfo: any = null;

  userSongList: any[] = [];

  userId: number;

  constructor(
    private modalService: NzModalService,
    private apiService: ApiService,
    private message: NzMessageService,
    private store: Store<Appstate>
  ) { }

  ngOnInit() {
    this.getUserLoginStatus();
    const userInfo$ = this.store
      .pipe(
        map(data => data.userState)
      )
      .subscribe(res => {
        this.userInfo = res.userInfo;
        this.userSongList = res.userSongList['playlist'];
      });
  }

  // 获取登录状态拿到userId
  getUserLoginStatus() {
    this.apiService.getLoginStatus().subscribe(res => {
      if (res['code'] === 200) {
        this.userId = res['profile']['userId'];
        this.store.dispatch(new LoadUserInfo(this.userId));
      }
    });
  }

  openLogin(): void {
    const modal = this.modalService.create({
      nzTitle: '登录',
      nzContent: LoginComponent,
      nzClosable: false,
      nzComponentParams: {},
      nzFooter: null,
      nzWidth: 380,
    });
    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    modal.afterClose.subscribe((res) => {
      if (res) {
        this.getUserLoginStatus();
      }
    });
  }
}

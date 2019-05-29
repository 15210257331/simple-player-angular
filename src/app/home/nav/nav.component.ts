import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzModalService, NzMessageService } from 'ng-zorro-antd';
import { LoginComponent } from '../header/login/login.component';
import { NONE_TYPE } from '@angular/compiler/src/output/output_ast';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  haveUserInfo = true;

  songListName = '';

  showSongListEdit = false;

  constructor(
    private modalService: NzModalService,
    private apiService: ApiService,
    private message: NzMessageService,
    ) { }

  ngOnInit() {
    // this.apiService.getLoginStatus().subscribe((res: any) => {
    //   this.userStore.dispatch(userActions.getUserInfo, res.profile.userId).pipe().subscribe(() => {});
    // }, error => {
    //   console.log('未登录');
    // });
  }

  // newSongList() {
  //   this.showSongListEdit = false;
  //   this.userStore.dispatch(userActions.newSongList, this.songListName).subscribe(res => {
  //     this.songListName = '';
  //   });
  // }
}

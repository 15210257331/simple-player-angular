import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { MusicStore } from '../../../store/music.store';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {

  featrueListArray: any[] = [];

  hotClassifyList: any[] = [];

  loadingDone = false;

  constructor(
    private apiService: ApiService,
    private musicStore: MusicStore,
    private router: Router
    ) { }

  ngOnInit() {
    this.getHotClassifyList();
    this.getFeatrueList();
  }

  getHotClassifyList() {
    this.apiService.getHotClassifyList().subscribe(res => {
      this.hotClassifyList = res['tags'];
    });
  }

  getFeatrueList() {
    this.apiService.getChosenList()
    .pipe(
      finalize(() => {
        this.loadingDone = true;
      })
    )
    .subscribe(res => {
      this.featrueListArray = res['result'];
    });
  }

  detail(id: string) {
    this.router.navigate(['/detail'], {queryParams: {id: id}});
  }

  changeClassify(code: number) {
    console.log(code);
  }

}

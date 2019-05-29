import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { MusicStore } from '../../store/music.store';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent implements OnInit {

  radioClassifyList: any[] = [];

  radioList: any[] = [];

  radioClassifyName: string;

  loadingDone = false;

  constructor(
    private apiService: ApiService,
    private musicStore: MusicStore,
    private router: Router
  ) { }

  ngOnInit() {
   this.getRadioClassifyList();
  }

  getRadioClassifyList() {
    this.apiService.getRadioClassifyList().subscribe(res => {
      this.radioClassifyList = res['categories'];
      this.radioClassifyList.map(item => {
        Object.assign(item, {code: item.id});
      });
      this.getRaioList(this.radioClassifyList[0].code);
      this.radioClassifyName = this.radioClassifyList[0].name;
    });
  }

  getRaioList(id: any) {
    this.apiService.getRaioList(id).subscribe(res => {
      this.radioList = res['djRadios'];
    });
  }

  changeClassify(id: any) {
    this.radioClassifyList.map(item => {
      if (item.id === id) {
        this.radioClassifyName = item.name;
      }
    });
    this.getRaioList(id);
  }

  detail(id: any) {

  }
}

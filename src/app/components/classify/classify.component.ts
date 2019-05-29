import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../service/api.service';
interface ClassifyInfo {
  name: string;
  code?: number;
}
@Component({
  selector: 'app-classify',
  templateUrl: './classify.component.html',
  styleUrls: ['./classify.component.scss']
})
export class ClassifyComponent implements OnInit {

  hideCatlist: Array<ClassifyInfo> = [];

  showCatist: Array<ClassifyInfo> = [];

  showBtn = true;

  @Input()
  set data(value: Array<ClassifyInfo>) {
    const allCatlist = value;
    this.showCatist = this.splitCatlist(allCatlist, 11)[0];
    this.hideCatlist = this.splitCatlist(allCatlist, 11)[1];
  }

  @Input() curIndex = 0;

  @Output() changeClassify: EventEmitter<number> = new EventEmitter<number>();

  constructor(private apiService: ApiService) { }

  ngOnInit() {

  }

  showAllCatlist() {
    this.showCatist = this.showCatist.concat(this.hideCatlist);
    this.showBtn = false;
  }

  splitCatlist(list: any[], number: number) {
    const arr1 = [];
    const arr2 = [];
    list.map((item, index) => {
      if (index < number) {
        arr1.push(item);
      } else {
        arr2.push(item);
      }
    });
    return [arr1, arr2];
  }

  hide() {
    this.showCatist.splice(11, this.showCatist.length - 11);
    this.showBtn = true;
  }

  change(code: number, index: number) {
    this.curIndex = index;
    this.changeClassify.emit(code);
  }
}

import { Component, OnInit, Input, HostBinding, ContentChild } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  // @HostBinding('class.loading') loadingClassName = true;

  _loadingDone = false;

  _tip: string;

  @Input()
  set loadingDone(value: boolean) {
    this._loadingDone = value;
  }

  @Input()
  set tip(value: string) {
    if (value) {
      this._tip = value;
    }
  }

  constructor() { }

  ngOnInit() {
  }

}

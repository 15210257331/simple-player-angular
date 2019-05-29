import { Component, OnInit, Input, EventEmitter, HostListener, ElementRef, Output, OnDestroy, forwardRef } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';


@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit, OnDestroy {

  _rate = 0;

  _total = 0;

  _type = 'horizonta';

  classNameMap: any;

  public isDown = false;

  public disX; // 记录鼠标点击事件的位置 X

  public disY; // 记录鼠标点击事件的位置 Y

  public totalOffsetX = 0; // x轴的初始偏移量

  public totalOffsetY = 0; // y轴的初始偏移量

  scrollNode: any;

  parentNode: any;

  filledNode: any;

  private _ngUnsubscribe$ = new Subject();

  @Output() changeRate: EventEmitter<number> = new EventEmitter<number>();


  @Input()
  set rate (value: number) {
    if (value <= 100 && value >= 0) {
      this._rate = value;
      setTimeout(() => {
        this._updateRate();
      }, 0);
    }
  }

  @Input()
  set type (value: string) {
    if (value) {
      this._type = value;
    }
  }
  constructor(public el: ElementRef) { }

  ngOnInit() {
    this._init();
  }

  private _init() {
    this.scrollNode = this.el.nativeElement.querySelector('.progress-ball');
    this.parentNode = this.el.nativeElement.querySelector('.progress-wrap');
    this.filledNode = this.el.nativeElement.querySelector('.progerss-filled');
    fromEvent(this.scrollNode, 'mousedown')
    .pipe(takeUntil(this._ngUnsubscribe$))
    .subscribe((event: any) => {
      this.isDown = true;
      this.disX = event.clientX;
      this.disY = event.clientY;
    });
    fromEvent(document, 'mousemove')
    .pipe(takeUntil(this._ngUnsubscribe$))
    .subscribe((event: any) => {
      if (this.isDown) {
        if ((this.totalOffsetX + event.clientX - this.disX) > (this.parentNode.offsetWidth)) {
          this.scrollNode.style.left = (this.parentNode.offsetWidth - this.scrollNode.offsetWidth / 2) + 'px';
          this.filledNode.style.width = this.parentNode.offsetWidth + 'px';
          return;
        }
        if ((this.totalOffsetX + event.clientX - this.disX) < 0) {
          this.scrollNode.style.left = 0 - this.scrollNode.offsetWidth / 2 + 'px';
          this.filledNode.style.width = '0px';
          return;
        }
        this.scrollNode.style.left = this.totalOffsetX + event.clientX - this.disX - (this.scrollNode.offsetWidth / 2) + 'px';
        this.filledNode.style.width = this.totalOffsetX + event.clientX - this.disX + 'px';
      }
    });
    fromEvent(document, 'mouseup').pipe(takeUntil(this._ngUnsubscribe$))
    .subscribe((event: any) => {
      if (this.isDown) {
        this.totalOffsetX = this.totalOffsetX +  event.clientX - this.disX;
        if (this.totalOffsetX > this.parentNode.offsetWidth) {
            this.totalOffsetX = this.parentNode.offsetWidth;
        }
        if (this.totalOffsetX < 0) {
            this.totalOffsetX = 0;
        }
        this.isDown = false;
        this.changeRate.emit(this.totalOffsetX / this.parentNode.offsetWidth);
      }
    });
    fromEvent(this.parentNode, 'click').pipe(takeUntil(this._ngUnsubscribe$))
    .subscribe((event: any) => {
      this.totalOffsetX = event.clientX - this.parentNode.offsetLeft;
      this.scrollNode.style.left = (event.clientX - this.parentNode.offsetLeft - (this.scrollNode.offsetWidth / 2)) + 'px';
      this.filledNode.style.width = (event.clientX - this.parentNode.offsetLeft) + 'px';
      this.changeRate.emit(this.totalOffsetX / this.parentNode.offsetWidth);
    });
  }

  _updateRate() {
    this.totalOffsetX = this.parentNode.offsetWidth * this._rate;
    this.scrollNode.style.left = this.totalOffsetX - (this.scrollNode.offsetWidth / 2) + 'px';
    this.filledNode.style.width = this.totalOffsetX + 'px';
  }

  ngOnDestroy() {
    this._ngUnsubscribe$.next();
    this._ngUnsubscribe$.complete();
  }
}

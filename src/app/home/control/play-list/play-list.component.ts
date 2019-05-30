import { Component, OnInit, Input, ElementRef, Renderer2 } from '@angular/core';
import { UtilsService } from '../../../service/util.service';

@Component({
  selector: 'app-play-list',
  templateUrl: './play-list.component.html',
  styleUrls: ['./play-list.component.scss']
})
export class PlayListComponent implements OnInit {

  @Input()
  set show(value: boolean) {
    if (value !== null) {
      this.setPlaylistClass(value);
    }
  }

  constructor(
    public utilsService: UtilsService,
    private el: ElementRef,
    private renderer2: Renderer2
  ) { }

  ngOnInit() {

  }

  setPlaylistClass(value: boolean) {
    if (value === true) {
      this.renderer2.setStyle(this.el.nativeElement, 'top', '0');
      this.renderer2.setStyle(this.el.nativeElement, 'bottom', '80px');
      this.renderer2.setStyle(this.el.nativeElement, 'padding-top', '60px');
    } else {
      this.renderer2.setStyle(this.el.nativeElement, 'top', '100%');
      this.renderer2.setStyle(this.el.nativeElement, 'bottom', '0');
      this.renderer2.setStyle(this.el.nativeElement, 'padding-top', '0');
    }
  }

}

import { Component, OnInit, Input, ElementRef, Renderer2 } from '@angular/core';
import { UtilsService } from '../../../service/util.service';


@Component({
  selector: 'app-play-detail',
  templateUrl: './play-detail.component.html',
  styleUrls: ['./play-detail.component.scss']
})
export class PlayDetailComponent implements OnInit {

  @Input()
  set show(value: boolean) {
    if (value !== null) {
      this.setPlaylistClass(value);
    }
  }

  @Input() currentSong: any;

  detailElement: any;

  constructor(
    public utilsService: UtilsService,
    private el: ElementRef,
    private renderer2: Renderer2
  ) { }

  ngOnInit() {
    this.detailElement = this.el.nativeElement.querySelector('.song-detail');
  }

  setPlaylistClass(value: boolean) {
    if(this.detailElement) {
      if (value === true) {
        this.renderer2.setStyle(this.detailElement, 'top', '0');
        this.renderer2.setStyle(this.detailElement, 'bottom', '80px');
      } else {
        this.renderer2.setStyle(this.detailElement, 'top', '100%');
        this.renderer2.setStyle(this.detailElement, 'bottom', '0');
      }
    }
  }

}

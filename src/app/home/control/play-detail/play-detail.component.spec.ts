import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayDetailComponent } from './play-detail.component';

describe('PlayDetailComponent', () => {
  let component: PlayDetailComponent;
  let fixture: ComponentFixture<PlayDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

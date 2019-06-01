import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotDetailComponent } from './hot-detail.component';

describe('HotDetailComponent', () => {
  let component: HotDetailComponent;
  let fixture: ComponentFixture<HotDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

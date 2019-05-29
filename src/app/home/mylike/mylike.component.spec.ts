import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MylikeComponent } from './mylike.component';

describe('MylikeComponent', () => {
  let component: MylikeComponent;
  let fixture: ComponentFixture<MylikeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MylikeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MylikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

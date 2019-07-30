import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnDateComponent } from './return-date.component';

describe('ReturnDateComponent', () => {
  let component: ReturnDateComponent;
  let fixture: ComponentFixture<ReturnDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

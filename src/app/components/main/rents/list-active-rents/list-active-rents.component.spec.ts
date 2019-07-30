import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListActiveRentsComponent } from './list-active-rents.component';

describe('ListActiveRentsComponent', () => {
  let component: ListActiveRentsComponent;
  let fixture: ComponentFixture<ListActiveRentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListActiveRentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListActiveRentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

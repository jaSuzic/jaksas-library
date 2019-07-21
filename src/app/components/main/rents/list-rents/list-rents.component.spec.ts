import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRentsComponent } from './list-rents.component';

describe('ListRentsComponent', () => {
  let component: ListRentsComponent;
  let fixture: ComponentFixture<ListRentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

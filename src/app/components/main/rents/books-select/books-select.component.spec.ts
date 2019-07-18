import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksSelectComponent } from './books-select.component';

describe('BooksSelectComponent', () => {
  let component: BooksSelectComponent;
  let fixture: ComponentFixture<BooksSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersSelectComponent } from './members-select.component';

describe('MembersSelectComponent', () => {
  let component: MembersSelectComponent;
  let fixture: ComponentFixture<MembersSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembersSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

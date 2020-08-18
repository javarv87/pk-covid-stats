import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfectionsHistoryComponent } from './infections-history.component';

describe('InfectionsHistoryComponent', () => {
  let component: InfectionsHistoryComponent;
  let fixture: ComponentFixture<InfectionsHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfectionsHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfectionsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

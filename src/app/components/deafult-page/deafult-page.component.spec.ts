import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeafultPageComponent } from './deafult-page.component';

describe('DeafultPageComponent', () => {
  let component: DeafultPageComponent;
  let fixture: ComponentFixture<DeafultPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeafultPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeafultPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

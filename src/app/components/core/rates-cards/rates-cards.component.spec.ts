import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatesCardsComponent } from './rates-cards.component';

describe('RatesCardsComponent', () => {
  let component: RatesCardsComponent;
  let fixture: ComponentFixture<RatesCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatesCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatesCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

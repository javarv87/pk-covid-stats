import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pk-rates-cards',
  templateUrl: './rates-cards.component.html',
  styleUrls: ['./rates-cards.component.sass']
})
export class RatesCardsComponent implements OnInit {

  @Input('rates') set rates(rates: any) {
    if (rates)
      this._rates = this.getRates(rates);
  };
  _rates: any[];

  constructor() { }

  ngOnInit(): void {
  }

  getRates(rates: any) {
    return [
      {
        title: 'Recovery Rate',
        class: 'recoveries',
        rate: rates.recoveryRate
      },
      {
        title: 'Death Rate',
        class: 'deaths',
        rate: rates.deathRate
      },
      {
        title: 'Critical Rate',
        class: 'critical',
        rate: rates.criticalRate
      },
      {
        title: 'Non-Critical Rate',
        class: 'infections',
        rate: 1 - rates.criticalRate
      },
    ]
  }

}

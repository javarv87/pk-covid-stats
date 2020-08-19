import { Component, OnInit, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'pk-stats-cards',
  templateUrl: './stats-cards.component.html',
  styleUrls: ['./stats-cards.component.sass']
})
export class StatsCardsComponent implements OnInit {
  @HostBinding() class = 'row mt-3';
  @Input('stats') stats: any[];

  constructor() { }

  ngOnInit(): void {
  }
}

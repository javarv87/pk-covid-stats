import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'pk-global-stats-cards',
  templateUrl: './global-stats-cards.component.html',
  styleUrls: ['./global-stats-cards.component.sass']
})
export class GlobalStatsCardsComponent implements OnInit {
  @HostBinding() class = 'row mt-3';
  constructor() { }

  ngOnInit(): void {
  }

}

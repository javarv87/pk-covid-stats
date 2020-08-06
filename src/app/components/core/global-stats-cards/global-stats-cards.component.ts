import { Component, OnInit, HostBinding } from '@angular/core';
import { StatisticsService } from '@pk-services/statistics/statistics.service';
import { Statistics } from '@pk-models/statistics.model';

@Component({
  selector: 'pk-global-stats-cards',
  templateUrl: './global-stats-cards.component.html',
  styleUrls: ['./global-stats-cards.component.sass']
})
export class GlobalStatsCardsComponent implements OnInit {
  @HostBinding() class = 'row mt-3';
  stats: Statistics;

  constructor(private statsService: StatisticsService) { }

  ngOnInit(): void {
    this.onDataLoad();
  }

  onDataLoad() {
    this.statsService.getStatistics().subscribe(stats => this.stats = stats);
  }

}

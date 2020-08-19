import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StatisticsService } from '@pk-services/statistics/statistics.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrls: ['./country-page.component.sass']
})
export class CountryPageComponent implements OnInit, OnDestroy {

  stats: any[];
  rates: any;
  countryName: string;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private statistics: StatisticsService
  ) { }

  ngOnInit(): void {
    this.countryName = this.route.snapshot.params.country;
    this.subscription = this.statistics.getCountryStatistics(this.countryName)
      .subscribe(stats => {
        this.stats = stats
        this.rates = {
          deathRate: stats[1].rate,
          recoveryRate: stats[2].rate,
          criticalRate: stats[3].rate
        }
      });
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }
  
}

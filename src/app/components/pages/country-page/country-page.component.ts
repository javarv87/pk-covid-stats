import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '@pk-services/main/main.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrls: ['./country-page.component.sass']
})
export class CountryPageComponent implements OnInit, OnDestroy {

  countryName: string;
  subscription: Subscription;
  countryTimeline: any;

  constructor(
    private route: ActivatedRoute,
    private mainService: MainService
  ) { }

  ngOnInit(): void {
    this.countryName = this.route.snapshot.params.country;
    this.subscription = this.mainService.getTimelineDataByCountry(this.countryName)
      .subscribe(timelineData => this.countryTimeline = timelineData);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

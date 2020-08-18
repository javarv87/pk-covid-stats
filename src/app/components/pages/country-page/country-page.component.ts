import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrls: ['./country-page.component.sass']
})
export class CountryPageComponent implements OnInit {

  countryName: string;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.countryName = this.route.snapshot.params.country;
  }

}

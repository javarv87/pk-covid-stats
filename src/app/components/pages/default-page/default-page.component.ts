import { Component, OnInit, NgZone, AfterViewInit, OnDestroy } from '@angular/core';
import { MainService } from 'src/app/services/main/main.service';
import { Subscription } from 'rxjs';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

@Component({
  selector: 'pk-default-page',
  templateUrl: './default-page.component.html',
  styleUrls: ['./default-page.component.sass']
})
export class DefaultPageComponent implements OnInit, AfterViewInit, OnDestroy {

  private payChart: am4charts.PieChart;
  sub: Subscription[] = [];
  tempArray: any[] = [];

  constructor(
  	private zone: NgZone,
    private mainService: MainService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.loadInfectedPayChart();
    });
  }

  loadInfectedPayChart() {
    this.sub.push(this.mainService.getAllCountriesStats().subscribe(data => {
      this.tempArray = data;
      console.log(this.tempArray);
      let auxPayChart = am4core.create("payChart", am4charts.PieChart);
      let others = this.tempArray.slice(10, this.tempArray.length);

      this.sortem(this.tempArray, "cases");
      this.tempArray = this.tempArray.reverse();

      auxPayChart.data = this.tempArray.slice(0,10);
      auxPayChart.data.push({
        country: 'Other',
        cases: this.addCases("cases",others)
      });

      let paySeries = auxPayChart.series.push(new am4charts.PieSeries());
      paySeries.dataFields.value = "cases";
      paySeries.dataFields.category = "country";

      this.payChart = auxPayChart;
    }));
  }

  addCases(category, paramArr) {
    let result = 0;
    for (var i = 0 ; i<paramArr.length ; i+=1) {
      console.log(result);
      result += paramArr[i][category];
    }
    console.log(result);
    return result;
  }

  sortem(info, sortParam) {
    try {
      const forSort = sortParam;
      info.sort((a, b) => {
        if (a[forSort] < b[forSort]) {
          return -1;
        } else if (a[forSort] > b[forSort]) {
          return 1;
        }
        return 0;
      })
    } catch (e) {
      console.error("ERROR while sorting", e);
      return info;
    }
    return info;
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.payChart) {
        this.payChart.dispose();
      }
    });
    this.sub.forEach(s => s.unsubscribe());
  }

}

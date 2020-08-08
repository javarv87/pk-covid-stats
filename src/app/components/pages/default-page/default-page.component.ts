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
  sub: Subscription;

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
    let tempArr;
    this.sub = this.mainService.getAllCountriesStats().subscribe(data => tempArr);
    let auxPayChart = am4core.create("payChart", am4charts.PieChart);
    let others = tempArr.slice(10,tempArr.length)

    this.sortem(tempArr, "cases");
    tempArr = tempArr.reverse();

    auxPayChart.data = tempArr.slice(0,10);
    auxPayChart.data.push({
      country: 'Other',
      cases: this.addCases("cases",others)
    });

    /*auxPayChart.data = [{
      "country": "Lithuania",
      "cases": 501.9
    }, {
      "country": "Czech Republic",
      "cases": 301.9
    }, {
      "country": "Ireland",
      "cases": 201.1
    }, {
      "country": "Germany",
      "cases": 165.8
    }, {
      "country": "Australia",
      "cases": 139.9
    }, {
      "country": "Austria",
      "cases": 128.3
    }, {
      "country": "UK",
      "cases": 99
    }, {
      "country": "Belgium",
      "cases": 60
    }, {
      "country": "The Netherlands",
      "cases": 50
    }];*/

    let paySeries = auxPayChart.series.push(new am4charts.PieSeries());
    paySeries.dataFields.value = "cases";
    paySeries.dataFields.category = "country";

    this.payChart = auxPayChart;
  }

  addCases(category, paramArr) {
    let result = 0;
    for (var i = 0 ; i<paramArr.length ; i+=1) {
      result += paramArr[i][category];
    }
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
  }

}

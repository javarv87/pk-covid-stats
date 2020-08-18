import { Component, OnInit, NgZone, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

import { MainService } from '@pk-services/main/main.service';
import { CountryService } from '@pk-services/country/country.service';

@Component({
  selector: 'pk-default-page',
  templateUrl: './default-page.component.html',
  styleUrls: ['./default-page.component.sass']
})
export class DefaultPageComponent implements OnInit, AfterViewInit, OnDestroy {

  private payChart: am4charts.PieChart;
  sub: Subscription[] = [];
  tempArray: any[] = []; //Array for payChart

  countries:any=[];
  sortType = "todayCases";
  filterPost = '';
  radarChart: am4charts.RadarChart;
  totalCritical:any;
  activeCases:any;
  totalDeaths:any;
  finishedCases:any;
  totalRecoveries:any;
  countryCodes: any = {};

  constructor(
    private zone: NgZone,
    private mainService: MainService,
    private countryService: CountryService
  ) { }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.loadInfectedPayChart();
    });
  }

  async ngOnInit() {
    this.countryCodes = this.countryService.countryCodes;
    this.mainService.getAll("todayCases").subscribe(data => {
      this.countries = data;
      this.totalCritical = this.orderData('critical');
      this.activeCases = this.orderData('active');
      this.totalDeaths = this.orderData('deaths');
      this.totalRecoveries = this.orderData('recovered');
      this.finishedCases = this.totalDeaths + this.totalRecoveries;
      this.createRadarChart();
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



  orderData(type) {
    var total = 0
    for (var i = 0, _len = this.countries.length; i < _len; i++) {
      total += this.countries[i][type]
    }
    return total
  }
  sortCountries(key) {
    this.mainService.getAll(key).subscribe((data: {}) => {
      this.countries = data;
    });
  }

  createRadarChart() {
    let chart = am4core.create("radarChart", am4charts.RadarChart);
    chart.data = [{
      "category": "Critical",
      "value": this.totalCritical / this.activeCases * 100,
      "full": 100
    }, {
      "category": "Deaths",
      "value": this.totalDeaths / this.finishedCases * 100,
      "full": 100
    }, {
      "category": "Recovered",
      "value": this.totalRecoveries / this.finishedCases * 100,
      "full": 100
    }, {
      "category": "Active",
      "value": 100-(this.totalCritical / this.activeCases * 100),
      "full": 100
    }];

    chart.startAngle = -90;
    chart.endAngle = 180;
    chart.innerRadius = am4core.percent(20);
    chart.numberFormatter.numberFormat = "#.#'%'";
    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis<am4charts.AxisRendererRadial>());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.grid.template.strokeOpacity = 0;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.adapter.add("fill", function (fill, target) {
      if(target.dataItem.index==0){
        return am4core.color("#f9c851");
      }
      if(target.dataItem.index==1){
        return am4core.color("#ff5b5b");
      }
      if(target.dataItem.index==2){
        return am4core.color("#10c469");
      }
      return am4core.color("#21AFDD");
    });
    categoryAxis.renderer.minGridDistance = 10;

    let valueAxis = chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>());
    valueAxis.renderer.grid.template.strokeOpacity = 0;
    valueAxis.min = 0;
    valueAxis.max = 100;
    valueAxis.strictMinMax = true;
    valueAxis.renderer.labels.template.fill = am4core.color("#adb5bd");

    let series1 = chart.series.push(new am4charts.RadarColumnSeries());
    series1.dataFields.valueX = "full";
    series1.dataFields.categoryY = "category";
    series1.clustered = false;
    series1.columns.template.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground");
    series1.columns.template.fillOpacity = 0.08;
    series1.columns.template["cornerRadiusTopLeft"] = 20;
    series1.columns.template.strokeWidth = 0;
    series1.columns.template.radarColumn.cornerRadius = 20;

    let series2 = chart.series.push(new am4charts.RadarColumnSeries());
    series2.dataFields.valueX = "value";
    series2.dataFields.categoryY = "category";
    series2.clustered = false;
    series2.columns.template.strokeWidth = 0;
    series2.columns.template.tooltipText = "{category}: [bold]{value}[/]";
    series2.columns.template.radarColumn.cornerRadius = 20;

    series2.columns.template.adapter.add("fill", function (fill, target) {
      if(target.dataItem.index==0){
        return am4core.color("#f9c851");
      }
      if(target.dataItem.index==1){
        return am4core.color("#ff5b5b");
      }
      if(target.dataItem.index==2){
        return am4core.color("#10c469");
      }
      return am4core.color("#21AFDD");
    });

    chart.cursor = new am4charts.RadarCursor();
    chart.cursor.fill = am4core.color("#282e38");
    chart.tooltip.label.fill = am4core.color("#282e38");
    this.radarChart = chart;
  }
}

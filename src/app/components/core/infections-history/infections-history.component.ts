import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

@Component({
  selector: 'pk-infections-history',
  templateUrl: './infections-history.component.html',
  styleUrls: ['./infections-history.component.sass']
})
export class InfectionsHistoryComponent implements OnInit, OnDestroy {

  @Input('history') data: any[];
  private lineChart: am4charts.XYChart;

  constructor() { }

  ngOnInit(): void {
    this.lineChart = this.loadLineChart(this.data);
  }

  ngOnDestroy(): void {
    if (this.lineChart) {
      this.lineChart.dispose();
    }
  }

  loadLineChart(data: any[]): am4charts.XYChart {
    let chart = am4core.create('lineChart', am4charts.XYChart);
    chart.numberFormatter.numberFormat = "#a";
    chart.numberFormatter.bigNumberPrefixes = [
      { number: 1e+3, suffix: 'K' },
      { number: 1e+6, suffix: 'M' },
      { number: 1e+9, suffix: 'B' }
    ];

    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;
    dateAxis.renderer.labels.template.fill = am4core.color('#adb5bd');
    
    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.labels.template.fill = am4core.color('#adb5bd');

    chart = this.createLineSeries(chart, '#21AFDD', 'cases');
    chart = this.createLineSeries(chart, '#10c469', 'recovered');
    chart = this.createLineSeries(chart, '#ff5b5b', 'deaths');

    chart.data = data;
    chart.legend = new am4charts.Legend();
    chart.legend.labels.template.fill = am4core.color('#adb5bd');
    chart.cursor = new am4charts.XYCursor();

    return chart;
  }

  createLineSeries(chart: am4charts.XYChart, color: string, type: string): am4charts.XYChart {
    const name = type.charAt(0).toUpperCase() + type.slice(1);
    const series = chart.series.push(new am4charts.LineSeries());

    series.dataFields.dateX = 'date';
    series.dataFields.valueY = type;

    series.fill = am4core.color(color);
    series.strokeWidth = 2;
    series.minBulletDistance = 10;
    series.tooltipText = '{valueY} ' + name;
    series.tooltip.pointerOrientation = 'vertical';

    series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.fillOpacity = 0.5;

    series.stroke = am4core.color(color);
    series.legendSettings.labelText = name;
    series.tooltip.autoTextColor = false;
    series.tooltip.label.fill = am4core.color('#282e38');

    return chart
  }

}

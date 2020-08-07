import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../services/main/main.service';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

@Component({
  selector: 'pk-default-page',
  templateUrl: './default-page.component.html',
  styleUrls: ['./default-page.component.sass']
})
export class DefaultPageComponent implements OnInit {

  myPayChart = am4core.create("payChart", am4charts.PieChart);

  constructor(
  	//private mainService: MainService
  ) { }

  ngOnInit(): void {
  }

  loadPayChart() {
  
  }

}

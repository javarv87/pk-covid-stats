import { OnInit, Input } from '@angular/core';
import { Component, NgZone } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Country } from 'src/app/models/country';
import { MainService } from 'src/app/services/main/main.service';
import { Observable, Subscription } from 'rxjs';
import { MapService } from '@pk-services/map/map.service';
import { MapData } from 'src/app/models/map-data';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'pk-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnInit {

  private chart: am4maps.MapChart;
  private eventsSubscription: Subscription;

  @Input() display:string;
  @Input() events: Observable<void>;

  mapData: MapData[];

  constructor(private zone: NgZone, private mainService: MainService, private mapService:MapService) { }

  ngOnInit(): void {

    this.getMapInfo();

    this.eventsSubscription = this.events.subscribe(() => {
      this.getMapInfo();
      this.loadMap();
    });
  }

  //Se carga el mapa por primera vez con "cases por default";
  ngAfterViewInit() {
    this.loadMap();
  }

  getMapInfo(){
    this.mapService.getMapData(this.display).subscribe((res:MapData[]) => {
      this.mapData = res;
    });
  }

  loadMap(){
  //Tuve que poner un setTimeout para esperar a que se termine de cargar el Observable y que la variable this.mapData tenga el arreglo correcto
  setTimeout(() => {
  this.zone.runOutsideAngular(() => {
    let chart = am4core.create("chartdiv", am4maps.MapChart);

    // Set map definition
    chart.geodata = am4geodata_worldLow;

    // Set projection
    chart.projection = new am4maps.projections.Miller();

    // Create map polygon series
    let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.exclude = ["AQ"];
    polygonSeries.useGeodata = true;
    polygonSeries.nonScalingStroke = true;
    polygonSeries.strokeWidth = 0.5;
    polygonSeries.calculateVisualCenter = true;

    let imageSeries = chart.series.push(new am4maps.MapImageSeries());
    imageSeries.data =this.mapData;
    imageSeries.dataFields.value = "value";

    let imageTemplate = imageSeries.mapImages.template;
    imageTemplate.nonScaling = true

    let circle = imageTemplate.createChild(am4core.Circle);
    circle.fillOpacity = 0.7;
    circle.propertyFields.fill = "color";
    circle.tooltipText = "{name}: [bold]{value}[/]";


    imageSeries.heatRules.push({
      "target": circle,
      "property": "radius",
      "min": 4,
      "max": 30,
      "dataField": "value"
    })


    //Aqui hay dos excepciones, pero no supe arreglarlas porque esto es parte del codigo pegado directamente de AMCHARTS
    imageTemplate.adapter.add("latitude", function(latitude, target) {
      let polygon = polygonSeries.getPolygonById(target.dataItem.dataContext.id);
      if(polygon){
        return polygon.visualLatitude;
       }
       return latitude;
    })

    imageTemplate.adapter.add("longitude", function(longitude, target) {
      let polygon = polygonSeries.getPolygonById(target.dataItem.dataContext.id);
      if(polygon){
        return polygon.visualLongitude;
       }
       return longitude;
    })

    this.chart = chart;
  });
}, 500);
}


  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

}

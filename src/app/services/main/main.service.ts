import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from "../../models/country";
import { TimelineData } from "../../models/timeline-data";
import { GlobalTimelineData } from "../../models/global-timeline-data";

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http:HttpClient) { }

  //Returns global deaths, recovered,cases,
  getMainStats():Observable<any>{
    return this.http.get<any>("http://api.coronastatistics.live/all");
  }

  getAllCountriesStats():Observable<Country[]>{
    return this.http.get<Country[]>("http://api.coronastatistics.live/countries");
  }

  getStatsByCountry(country:string):Observable<Country>{
    return this.http.get<Country>(`http://api.coronastatistics.live/countries/${country}`);
  }

  //This returns all the countries and data for dates, anything involving TimelineData is for the AmCharts
  getAllCountriesTimelineData():Observable<TimelineData[]>{
    return this.http.get<TimelineData[]>("http://api.coronastatistics.live/timeline")
  }

  //Returns data for the amcharts but specific to a country
  getTimelineDataByCountry(country:string):Observable<TimelineData>{
    return this.http.get<TimelineData>(`http://api.coronastatistics.live/timeline/${country}`);
  }

  //Global Data for AmCharts
  getGlobalTimelineData():Observable<GlobalTimelineData>{
    return this.http.get<GlobalTimelineData>('http://api.coronastatistics.live/timeline/global');
  }

  //Get data from Affected Nations
  getAll(type):Observable<Country>{
    return this.http.get<Country>(`http://api.coronastatistics.live/countries?sort=${type}`);
  }

}

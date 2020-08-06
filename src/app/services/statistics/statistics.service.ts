import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Statistics } from '@pk-models/statistics.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private apiUrl = 'http://api.coronastatistics.live';

  constructor(private http: HttpClient) { }

  getStatistics(): Observable<Statistics> {
    return this.http.get<any[]>(`${this.apiUrl}/countries`)
      .pipe(
        map(countries => {
          console.log(countries);
          const stats = countries.reduce((acc: any, current: any) => {
            return {
              cases: acc.cases + current.cases,
              deaths: acc.deaths + current.deaths,
              recovered: acc.recovered + current.recovered,
              todayCases: acc.todayCases + current.todayCases,
              todayDeaths: acc.todayDeaths + current.todayDeaths,
              critical: acc.critical + current.critical,
              criticalPerMillion: acc.criticalPerMillion + current.criticalPerOneMillion
            }
          }, { 
            cases: 0, deaths: 0, recovered: 0,
            todayCases: 0, todayDeaths: 0, critical: 0, criticalPerMillion: 0 
          });
          console.log(stats);
  
          const { cases, deaths, recovered } = stats;
          const total = deaths + recovered;
          const activeCases = cases - (deaths + recovered);
  
          return {
            deathRate: deaths / total,
            recoveryRate: recovered / total,
            criticalRate: stats.critical / activeCases,
            activeCases,
            ...stats
          };
        })
      );
  }

}

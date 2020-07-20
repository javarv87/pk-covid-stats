import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Country } from '../models/country.model';
import { throwError, Observable } from 'rxjs';
import { Timeline } from '../models/timeline.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl: string = 'https://api.coronastatistics.live';

  constructor(
    private http: HttpClient
  ) { }

  getAll(field?: string): Observable<Country[]> {
    const requestUrl = `${this.apiUrl}/countries?sort=${field}`;
    return this.http.get<Country[]>(requestUrl).pipe(
      catchError(this.handleError)
    );
  }

  getCountry(country: string): Observable<Country> {
    const requestUrl = `${this.apiUrl}/countries/${country}`;
    return this.http.get<Country>(requestUrl).pipe(
      catchError(this.handleError)
    );
  }

  getTimeline(): Observable<Timeline[]> {
    const requestUrl = `${this.apiUrl}/timeline`;
    return this.http.get<Timeline[]>(requestUrl).pipe(
      catchError(this.handleError)
    );
  }

  getCountryTimeline(country: string): Observable<Timeline> {
    const requestUrl = `${this.apiUrl}/timeline/${country}`;
    return this.http.get(requestUrl).pipe(
      catchError(this.handleError),
      map((data: any) => ({
        country: data.name,
        timeline: data.data.timeline
      }))
    );
  }
  
  getGlobalTimeline(): Observable<Timeline[]> {
    const requestUrl = `${this.apiUrl}/timeline/global`;
    return this.http.get(requestUrl).pipe(
      catchError(this.handleError),
      map(data => {
        const timeline: Timeline[] = [];
        for (const dateKey in data) {
          timeline.push({
            date: dateKey,
            ...data[dateKey]
          })
        }
        return timeline;
      })
    );
  }

  handleError(error: HttpErrorResponse) {
    const errorMsg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    return throwError(errorMsg);
  }

}
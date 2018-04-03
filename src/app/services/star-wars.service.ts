import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const starWarsApiBaseUrl = 'https://swapi.co/api/';

@Injectable()
export class StarWarsService {

  constructor(private httpClient: HttpClient) { }

  getFilms(title: string = null): Observable<any> {
    let url = `${starWarsApiBaseUrl}films`;

    if (title && title !== '') {
      url = `${starWarsApiBaseUrl}films?search=${title}`;
    }

    return this.httpClient.get(url, httpOptions);
  }

  getFilmById(filmId: number): Observable<any> {
    const url = `${starWarsApiBaseUrl}films/${filmId}`;

    return this.httpClient.get(url, httpOptions);
  }

}

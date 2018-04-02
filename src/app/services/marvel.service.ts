import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { FormGroup } from '@angular/forms';

const publicMarvelKey = '4d12fb8f4d6eb5cf924b5cfe9ce5e315';
const marvelApiBaseUrl = 'https://gateway.marvel.com:443/v1/public/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  params: new HttpParams().append('apikey', publicMarvelKey)
};

@Injectable()
export class MarvelService {

  constructor(private httpClient: HttpClient) { }

  getComics(offset: number = 0, filters: any = null): Observable<any> {
    const url = `${marvelApiBaseUrl}comics?&offset=${offset}`;

    httpOptions.params = new HttpParams().append('apikey', publicMarvelKey);

    if (filters) {
      // tslint:disable-next-line:forin
      for (const key in filters) {
        if (!filters[key] || filters[key] === '') {
          continue;
        }
        httpOptions.params = httpOptions.params.append(key, filters[key]);
      }
    }

    return this.httpClient.get(url, httpOptions);
  }

}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlShortenerService {

  constructor(
    private http: HttpClient
  ) { }

  shorten(url: string, token: string): Observable<{url: string}> {
    return this.http.post<{url: string}>('https://us-central1-swiss-dev-fd89f.cloudfunctions.net/api/url/shorten/', {
      url, token
    });
  }

}

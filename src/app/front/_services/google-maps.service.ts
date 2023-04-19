import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { isPlatformBrowser } from '@angular/common';
import {catchError, map} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  key: string =  environment.GOOGLE_MAPS;
  loaded = false;
  httpClient: HttpClient;

  constructor(
    httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any
    ) {

    this.httpClient = httpClient;

  }

  loadMap(): Observable<boolean> {

    if (isPlatformBrowser(this.platformId)) {
      if (!this.loaded) {
        return this.httpClient.jsonp(`https://maps.googleapis.com/maps/api/js?key=${this.key}`, 'callback')
        .pipe(
          map(() => {
            this.loaded = true;
            return true;
          }),
          catchError((error) => {
            console.log(error);
            return of(false);
            }),
        );
      } else {
        return of(true);
      }
    } else {
      return of(false);
    }

  }
}

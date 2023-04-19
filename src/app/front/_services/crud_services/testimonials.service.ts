import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Inject, Injectable, Optional} from '@angular/core';
import {environment} from 'src/environments/environment';

const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json'
});

@Injectable({
    providedIn: 'root'
})

export class TestimonialsService {
  apiUrl: string = environment.apiUrl;

  constructor(
    protected http: HttpClient,
    @Optional() @Inject('APP_BACKEND') private APP_BACKEND: any,
  ) {
    if (APP_BACKEND !== null) {
      this.apiUrl = APP_BACKEND;
    }
  }

  getTestimonials(filters) {
      const params = new HttpParams()
          .set('keyword', (filters.keyword) ? filters.keyword : '')
          .set('source', (filters.source) ? filters.source : 0)
          .set('limit', (filters.limit) ? filters.limit : 10)
          .set('skip', (filters.skip) ? filters.skip : 0);

      return this.http.get(this.apiUrl + 'api/v1/testimonials/findObjects', {params, headers});
  }

}

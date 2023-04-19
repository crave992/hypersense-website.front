import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Inject, Injectable, Optional} from '@angular/core';
import { environment } from '../../../../environments/environment';

const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json'
});

@Injectable({
    providedIn: 'root'
})

export class ProjectsService {
  apiUrl: string = environment.apiUrl;

    constructor(
      protected http: HttpClient,
      @Optional() @Inject('APP_BACKEND') private APP_BACKEND: any,
    ) {

      if (APP_BACKEND !== null) {
        this.apiUrl = APP_BACKEND;
      }
    }

    getProjectById(id, loader = false) {

        const params = new HttpParams()
            .set('id', `${id}`)
            .set('production', (environment.production) ? "1" : "2");

        return this.http.get(this.apiUrl + 'api/v1/portfolios/getPortfolio', {params, headers});
    }

    getProjects(filters, loader = false) {

        const params = new HttpParams()
            .set('keyword', (filters.keyword) ? filters.keyword : '')
            .set('technology', (filters.technology) ? filters.technology : '')
            .set('startTime', (filters.startTime) ? filters.startTime : '')
            .set('caseStudy', (filters.caseStudy) ? filters.caseStudy : 0)
            .set('endTime', (filters.endTime) ? filters.endTime : '')
            .set('limit', (filters.limit) ? filters.limit : 10)
            .set('loader', (loader) ? '1' : '0')
            .set('homepage', (filters.homepage) ? filters.homepage : 0)
            .set('software', (filters.software) ? filters.software : 0)
            .set('node', (filters.node) ? filters.node : 0)
            .set('skip', (filters.skip) ? filters.skip : 0)
            .set('production', (environment.production) ? "1" : "2");

        return this.http.get(this.apiUrl + 'api/v1/portfolios/findPortfolios', {params, headers});
    }

    getRelated(id, randomTechnology, limit = 3, loader = false) {

        const params = new HttpParams()
            .set('ID', `${id}`)
            .set('technology', `${randomTechnology}`)
            .set('production', (environment.production) ? "1" : "2")
            .set('limit', `${limit}`);

        return this.http.get(this.apiUrl + 'api/v1/portfolios/findRelated', {params, headers});
    }

}

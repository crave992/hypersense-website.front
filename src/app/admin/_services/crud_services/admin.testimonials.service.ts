import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';

const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json'
});

@Injectable({
    providedIn: 'root'
})

export class AdminTestimonialsService {

    constructor(private http: HttpClient) {

    }

    adminFindItems(filters) {
        const params = new HttpParams()
            .set('keyword', (filters.keyword) ? filters.keyword : '')
            .set('source', (filters.source) ? filters.source : 0)
            .set('limit', (filters.limit) ? filters.limit : 10)
            .set('skip', (filters.skip) ? filters.skip : 0);

        return this.http.get(environment.apiUrl + 'api/v1/testimonials/findObjects', {params, headers}).pipe(
            map((res: any) => res)
        );
    }


    saveItem(data) {
        return this.http.post(environment.apiUrl + 'api/v1/testimonials/saveObject', data, {headers}).pipe(
            map((res: any) => res)
        );
    }


    adminGetItem(id) {
        const params = new HttpParams()
            .set('id', id);

        return this.http.get(environment.apiUrl + 'api/v1/testimonials/getObject', {params, headers}).pipe(
            map((res: any) => res)
        );
    }

    removeItem(id) {
        const params = new HttpParams()
            .set('id', id);

        return this.http.post(environment.apiUrl + 'api/v1/testimonials/deleteObject?id=' + id, {params, headers}).pipe(
            map((res: any) => res)
        );
    }


}

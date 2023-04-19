import {HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {map} from 'rxjs/operators';
import {AdminGenericService} from '../helpers/admin.generic.service';


const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json'
});

@Injectable({
    providedIn: 'root'
})

export class AdminProjectsService extends AdminGenericService {

    adminFindItems(base, filters) {
        const params = new HttpParams()
            .set('keyword', (filters.keyword) ? filters.keyword : '')
            .set('source', (filters.source) ? filters.source : 0)
            .set('limit', (filters.limit) ? filters.limit : 10)
            .set('skip', (filters.skip) ? filters.skip : 0);

        return this.http.get(environment.apiUrl + 'api/v1/' + base + '/adminFindPortfolios', {params, headers}).pipe(
            map((res: any) => res)
        );
    }


    adminChangeOrder(base, data) {
        return this.http.post(environment.apiUrl + 'api/v1/' + base + '/adminChangeOrder', data, {headers}).pipe(
            map((res: any) => res)
        );
    }

    saveItem(base, data) {
        return this.http.post(environment.apiUrl + 'api/v1/' + base + '/adminSavePortfolio', data, {headers}).pipe(
            map((res: any) => res)
        );
    }


    adminGetItem(base, id) {
        const params = new HttpParams()
            .set('id', id);

        return this.http.get(environment.apiUrl + 'api/v1/' + base + '/adminGetPortfolio', {params, headers}).pipe(
            map((res: any) => res)
        );
    }

    removeItem(base, id) {

        return this.http.get(environment.apiUrl + 'api/v1/' + base + '/adminRemovePortfolio?id=' + id, {
            headers
        }).pipe(
            map((res: any) => res)
        );
    }


}

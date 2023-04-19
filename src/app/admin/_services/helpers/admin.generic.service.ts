import {HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {map} from 'rxjs/operators';
import {AdminBaseService} from './admin.base.service';

const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json'
});

@Injectable({
    providedIn: 'root'
})

export class AdminGenericService extends AdminBaseService {

    adminFindItems(base, filters) {
        const params = new HttpParams()
            .set('keyword', (filters.keyword) ? filters.keyword : '')
            .set('source', (filters.source) ? filters.source : 0)
            .set('limit', (filters.limit) ? filters.limit : 10)
            .set('skip', (filters.skip) ? filters.skip : 0);

        return this.http.get(environment.apiUrl + 'api/v1/' + base + '/findObjects', {params, headers}).pipe(
            map((res: any) => res)
        );
    }

    saveItem(base, data) {
        return this.http.post(environment.apiUrl + 'api/v1/' + base + '/saveObject', data, {headers}).pipe(
            map((res: any) => res)
        );
    }

    saveItemWithImage(base, data) {
        return this.http.post(environment.apiUrl + 'api/v1/' + base + '/saveObjectWithImage',
            data).pipe(
            map((res: any) => res)
        );
    }

    adminGetItem(base, id) {
        const params = new HttpParams()
            .set('id', id);

        return this.http.get(environment.apiUrl + 'api/v1/' + base + '/getObject', {params, headers}).pipe(
            map((res: any) => res)
        );
    }

    removeItem(base, id) {
        const params = new HttpParams()
            .set('id', id);

        return this.http.post(environment.apiUrl + 'api/v1/' + base + '/deleteObject?id=' + id, {params, headers}).pipe(
            map((res: any) => res)
        );
    }


}

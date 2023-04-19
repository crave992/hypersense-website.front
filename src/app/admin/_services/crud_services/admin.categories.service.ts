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

export class AdminCategoriesService extends AdminGenericService {
    base = 'postCategories';


    adminFindItems( filters = null) {
        const params = new HttpParams()
            .set('keyword', (filters && filters.keyword) ? filters.keyword : '')
            .set('source', (filters && filters.source) ? filters.source : 0)
            .set('limit', (filters && filters.limit) ? filters.limit : 10)
            .set('skip', (filters && filters.skip) ? filters.skip : 0);

        return this.http.get(environment.apiUrl + 'api/v1/' + this.base + '/getCategories', {params, headers}).pipe(
            map((res: any) => res)
        );
    }


    saveItem(base, data) {
        return this.http.post(environment.apiUrl + 'api/v1/' + base + '/adminSaveBlog', data, {headers}).pipe(
            map((res: any) => res)
        );
    }


    adminGetItem(base, id) {
        const params = new HttpParams()
            .set('id', id);

        return this.http.get(environment.apiUrl + 'api/v1/' + base + '/adminGetBlog', {params, headers}).pipe(
            map((res: any) => res)
        );
    }

    removeItem(base, id) {

        return this.http.get(environment.apiUrl + 'api/v1/' + base + '/adminRemoveBlog?id=' + id, {
            headers
        }).pipe(
            map((res: any) => res)
        );
    }


}

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {AdminGenericService} from '../helpers/admin.generic.service';
import {environment} from '../../../../environments/environment';



const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json'
});

@Injectable({
    providedIn: 'root'
})


export class AdminClientusersService  extends  AdminGenericService {

    adminFindItems(base, filters) {
        const params = new HttpParams()
            .set('keyword', (filters.keyword) ? filters.keyword : '')
            .set('source', (filters.source) ? filters.source : 0)
            .set('limit', (filters.limit) ? filters.limit : 10)
            .set('skip', (filters.skip) ? filters.skip : 0);

        return this.http.get(environment.apiUrl + 'api/v1/' + base + '/findUsers', {params, headers}).pipe(
            map((res: any) => res)
        );
    }

}

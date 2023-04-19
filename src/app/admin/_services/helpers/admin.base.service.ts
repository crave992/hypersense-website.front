import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';


@Injectable({
    providedIn: 'root'
})

export abstract class AdminBaseService {
    constructor(public http: HttpClient) {
    }
}

import {Injectable} from '@angular/core';
import {BehaviorSubject, ReplaySubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ScrollServiceService {
    scroll = new ReplaySubject<any>();

    constructor() {
    }
}

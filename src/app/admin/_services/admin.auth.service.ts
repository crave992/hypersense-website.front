import {Injectable, EventEmitter, Output} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {UserModel} from '../_models/user.model';
import {Observable} from 'rxjs';

import {Inject, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

const headers = new HttpHeaders({
    'Content-Type': 'application/json'
});

@Injectable({
    providedIn: 'root'
})

export class AdminAuthService {
    @Output() getLoggedStatus: EventEmitter<boolean> = new EventEmitter();
    private isAuthenticated: boolean;

    constructor(
        private http: HttpClient,
        @Inject(PLATFORM_ID) private readonly platformId: any
    ) {

    }

    public static getToken(request, platformId): string {
        if (isPlatformBrowser(platformId)) {
            if (localStorage.getItem('token')) {
                return JSON.parse(localStorage.getItem('token'));
            }
        } else {
            return '';
        }
    }

    public authenticated(): boolean {
        if (isPlatformBrowser(this.platformId)) {
            if (localStorage.getItem('token') && localStorage.getItem('currentUser')) {
                return this.isAuthenticated = true;
            }
        } else {
            return this.isAuthenticated = false;
        }

    }

    public getLoggedUser(): UserModel {
        if (this.authenticated() && isPlatformBrowser(this.platformId)) {
            return JSON.parse(localStorage.getItem('currentUser'));
        } else {
            return null;
        }
    }

    register(data) {
        return this.http.post(environment.apiUrl + 'api/v1/clientusers/register', data).pipe(map((res: any) => {
            if (res.response && isPlatformBrowser(this.platformId)) {
                localStorage.setItem('currentUser', JSON.stringify(res.response));
            }
            return res;
        }));
    }


    login(data): Observable<boolean> {
        return this.http.post(environment.apiUrl + 'api/v1/clientusers/clientLogin', data).pipe(map((res: any) => {
            if (res.response && res.response.id && isPlatformBrowser(this.platformId)) {
                localStorage.setItem('currentUser', JSON.stringify(res.response.user));
                localStorage.setItem('token', JSON.stringify(res.response.id));
                localStorage.setItem('ttl', JSON.stringify(res.response.ttl));
                this.getLoggedStatus.emit(true);
            } else {
                this.getLoggedStatus.emit(false);
            }
            return res;
        }));
    }

    logout() {
        this.http.post(environment.apiUrl + 'api/v1/clientusers/clientLogout', {});
        if (isPlatformBrowser(this.platformId)) {
            localStorage.clear();
        }
        location.reload(true);
        this.getLoggedStatus.emit(false);
        return;
    }

    checkToken(checkToken) {
        checkToken = {token: checkToken};
        return this.http.post(environment.apiUrl + 'api/v1/clientusers/checkToken', checkToken).pipe(map(res => res));
    }

    recoverPassword(data) {
        return this.http.post(environment.apiUrl + 'api/v1/clientusers/clientResetPassword', data, {headers}).pipe(map((res: any) => res));
    }

    resetPassword(password, token) {
        const params = new HttpParams().set('access_token', token);
        return this.http.post(environment.apiUrl + 'api/v1/clientusers/resetPasswordMobile', {
            password,
            token
        }, {params, headers})
            .pipe(map((res: any) => res));
    }


    /**
     * ADMIN SECTION -----------------------------------------
     */

    apiSettings() {
        this.http.get(environment.apiUrl + 'api/v1/clientusers/apiSettings', {headers})
            .toPromise().then((res: any) => {
            if (res.response && res.response.fileStorage && isPlatformBrowser(this.platformId)) {
                localStorage.setItem('fileStorage', JSON.stringify(res.response.fileStorage));

            }
        });
    }

    adminLogin(data): Observable<boolean> {
        return this.http.post(environment.apiUrl + 'api/v1/clientusers/adminLogin', data).pipe(map((res: any) => {
            if (res.response && res.response.id && isPlatformBrowser(this.platformId)) {
                localStorage.setItem('currentUser', JSON.stringify(res.response.user));
                localStorage.setItem('token', JSON.stringify(res.response.id));
                localStorage.setItem('ttl', JSON.stringify(res.response.ttl));
                this.apiSettings();
            }
            return res;
        }));
    }

    adminAuthenticated(): boolean {
        if (isPlatformBrowser(this.platformId)) {
            return localStorage.getItem('currentUser') && JSON.parse(localStorage.getItem('currentUser')).role === 'admin';
        } else {
            return false;
        }

    }

}

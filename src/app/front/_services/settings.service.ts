import { environment } from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';


const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json'
});

@Injectable()
export class SettingsService {

    constructor(
        protected http: HttpClient,
        @Inject(PLATFORM_ID) private platformId: any
    ) {
    }

    public checkIsBrowser() {
        return isPlatformBrowser(this.platformId);
    }


    public appSettings() {
        return new Promise<object>((resolve, reject) => {
            // this.getAppSettings().then(
            //     (res) => {
            //         if (!res) {
            //             return resolve(null);
            //         } else {
            //             return resolve(JSON.parse(res));
            //         }
            //     }
            // );
        });
    }

    public getFileStorageUrl() {
        return new Promise<string>((resolve, reject) => resolve(environment.cdn));
    }

    public getAwsBucket() {
        return new Promise<string>((resolve, reject) => {
            // this.getAppSettings().then(
            //     (res) => {
            //         if (!res) {
            //             return resolve(null);
            //         } else {
            //             const jsonRes = JSON.parse(res);
            //             if (jsonRes.fileStorage && jsonRes.fileStorage.bucket) {
            //                 return resolve(jsonRes.fileStorage.bucket);
            //             } else {
            //                 return resolve(null);
            //             }
            //         }
            //     }
            // );
        });
    }


    //
    // getAppSettings() {
    //     return new Promise<string>((resolve, reject) => {
    //         if (this.checkIsBrowser() && localStorage.getItem('appSettings')) {
    //             return resolve(localStorage.getItem('appSettings'));
    //         }
    //         this.http.get(environment.apiUrl + 'api/v1/clientusers/apiSettings', {headers})
    //             .toPromise().then(
    //             (res: any) => {
    //                 if (res.response) {
    //                     if (this.checkIsBrowser()) {
    //                         localStorage.setItem('appSettings', JSON.stringify(res.response));
    //                     }
    //                     return resolve(JSON.stringify(res.response));
    //                 } else {
    //                     return resolve(null);
    //                 }
    //             }
    //         );
    //
    //     });
    // }


}

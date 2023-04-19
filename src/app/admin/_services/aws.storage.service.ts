import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json'
});

@Injectable({providedIn: 'root'})
export class AwsStorageService {
    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private http: HttpClient) {
    }

    getSignedUrl(bucket, type, key) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        if (localStorage.getItem('fileStorage')) {

            const params = new HttpParams()
                .set('bucket', bucket)
                .set('type', type)
                .set('key', key);


            return this.http.get(environment.apiUrl + 'api/v1/awsStorages/testGenerateSignedPutURL', {
                params
            }).pipe(
                map((res: any) => res)
            );
        }
    }

    getCustomSignedUrl(type, key, prefix) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        if (localStorage.getItem('fileStorage')) {

            const params = new HttpParams()
                .set('type', type)
                .set('key', key);


            return this.http.get(environment.apiUrl + 'api/v1/' + prefix + '/generateTempSignedPutURL', {
                params
            }).pipe(
                map((res: any) => res)
            );
        }
    }

    uploadFileAWSS3(fileuploadurl, file) {
        return new Promise<any>((resolve, reject) => {
            const httpOptions = {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': file.type,
                    Accept: 'application/json, text/plain, */*'
                }
            };
            this.http.put(fileuploadurl, file, httpOptions).toPromise()
                .then(
                    res =>  // Success
                         resolve(res)
                    ,
                    msg =>  // Error
                         reject(msg)

                );
        });
    }

    uploadFileAWSS3Quill(fileuploadurl, file) {
        return new Promise<any>((resolve => {
            const httpOptions = {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': file.type,
                    Accept: 'application/json, text/plain, */*'
                }
            };

            this.http.put(fileuploadurl, file, httpOptions).toPromise()
                .then(
                    res =>  // Success
                         resolve(res)
                    ,
                    msg =>  // Error
                         resolve(msg)

                );
        }));
    }


    getAwsLinkAndUpload(key, file: File, prefix) {
        return new Promise<string>((resolve, reject) => {
            // get signed url
            this.getCustomSignedUrl(file.type, key, prefix).subscribe(
                (data: any) => {
                    if (data.response) {
                        if (data.response.exists) {
                            resolve(key);
                        } else {
                            this.uploadFileAWSS3(data.response.url, file).then(
                                response => {
                                    resolve(key);
                                }).catch(err => {
                                reject(err);
                            });
                        }
                    } else {
                        reject('Error');
                    }
                },
                (err) => {
                    reject(err);
                }
            );
        });


    }

}

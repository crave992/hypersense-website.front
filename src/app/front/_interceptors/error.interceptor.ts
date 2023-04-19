import {Observable, throwError, EMPTY} from 'rxjs';
import {tap, catchError} from 'rxjs/operators';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {
    HttpClient,
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import {isPlatformBrowser} from '@angular/common';
import {Router} from '@angular/router';
import {ToastService} from '../shared/core/toasts/toast.service';
import {environment} from '../../../environments/environment';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private http: HttpClient,
        private toastr: ToastService,
        private router: Router
    ) {
    }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (request) {
            if (!isPlatformBrowser(this.platformId)) {
                // for server request
                return next.handle(request);
            }

            return next.handle(request)
                .pipe(
                    tap(resp => {
                        // @ts-ignore
                        if (resp.body) {
                            // @ts-ignore
                            const data = resp.body;
                            // @ts-ignore
                            if (data && data.error_code && parseInt(data.error_code.code, 0) > 0) {
                                // @ts-ignore
                                let errorMessage = data.error_code.message;
                                // @ts-ignore
                                if (data.error_details) {
                                    // @ts-ignore
                                    errorMessage = data.error_details.message;
                                }
                                this.toastr.error(errorMessage);
                                return throwError(errorMessage);
                            } else {
                                return data;
                            }
                        }
                        return resp;
                    }),
                    catchError((error: HttpErrorResponse) => {
                        let errorMessage = '';
                        if (isPlatformBrowser(this.platformId) && error.error instanceof ErrorEvent) {
                            // client-side error
                            errorMessage = `Error: ${error.error.message}`;
                        } else {
                            // server-side error
                            errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
                        }

                        if (error.status === 402) {
                            // convention for expired_token
                            return throwError(error);
                        } else if (error.status === 401) {
                            // logged out
                            errorMessage = 'Authorization required';
                            this.toastr.error(errorMessage);
                            this.logout();
                            //this.router.navigate(['/']);
                        } else if (error.error && error.error.error) {
                            this.toastr.error(error.error.error.message || errorMessage);
                        } else {
                            this.toastr.error(errorMessage);
                        }

                        return throwError(errorMessage);
                    })
                );
        }


    }


    logout() {
        if (isPlatformBrowser(this.platformId)) {
            this.http.post(environment.apiUrl + 'api/v1/clientusers/clientLogout', {});
            localStorage.clear();
        }
        location.reload(true);
        return;
    }
}


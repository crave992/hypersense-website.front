import {Injectable, Optional} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../../app/_services/auth.service';

import {Inject, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser, isPlatformServer} from '@angular/common';

import {REQUEST} from '@nguniversal/express-engine/tokens';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(@Optional() @Inject(REQUEST) protected request: any,
                @Inject(PLATFORM_ID) private platformId: any,
                public auth: AuthService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let serverReq: HttpRequest<any> = request;
        if (request) {
            if (isPlatformBrowser(this.platformId) &&
                AuthService.getToken(request, this.platformId)
            ) {
                if (request.url.indexOf('.s3.') == -1) {
                    Object.assign(request, {
                        params: request.params.append('access_token', AuthService.getToken(request, this.platformId)),
                        setHeaders: {
                            Authorization: AuthService.getToken(request, this.platformId)
                        }
                    });
                }
            }
            serverReq = request.clone(request);
        }

        return next.handle(serverReq);
    }
}

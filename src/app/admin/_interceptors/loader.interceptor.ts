import {Observable, throwError} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {NgxSpinnerService} from 'ngx-spinner';
import {Renderer2, RendererFactory2} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    private renderer: Renderer2;

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        public rendererFactory: RendererFactory2,
        private spinner: NgxSpinnerService,
    ) {
        this.renderer = rendererFactory.createRenderer('body', null);
    }

    show() {
        // this.spinner.show();
        // this.renderer.addClass(document.body, 'overflow-hidden');
    }

    hide() {
        // this.spinner.hide();
        // this.renderer.removeClass(document.body, 'overflow-hidden');

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (isPlatformBrowser(this.platformId)) {

            if (request.params.get('loader') !== '0') {
                this.show();
            }

            return next.handle(request).pipe(
              finalize(() => this.hide())
            );

        } else {
            return next.handle(request);
        }

    }

}

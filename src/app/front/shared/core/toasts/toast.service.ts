import {Inject, Injectable, PLATFORM_ID, TemplateRef} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    toasts: any[] = [];

    constructor(
        @Inject(PLATFORM_ID) private platformId: any
    ) { }

    show(textOrTpl: string | TemplateRef<any>, options: any = {}): void {
        if (isPlatformBrowser(this.platformId)) {
            this.toasts.push({textOrTpl, ...options});
        }
    }

    success(message: string, title: string = ''): void {
        this.show(message, {
            classname: 'success',
            delay: 2000,
            autohide: true,
            headertext: title,
        });
    }

    warning(message: string, title: string = ''): void {
        this.show(message, {
            classname: 'warning',
            delay: 2000,
            autohide: true,
            headertext: title
        });
    }

    error(message: string, title: string = ''): void {

        this.show(message, {
            classname: 'errorMsg',
            delay: 7000,
            autohide: true,
            headertext: title,
        });
    }

    remove(toast): void {
        this.toasts = this.toasts.filter(t => t !== toast);
    }
}

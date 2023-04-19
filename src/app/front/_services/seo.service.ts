import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import {Inject, PLATFORM_ID, Injectable} from '@angular/core';
import {Title, Meta} from '@angular/platform-browser';
import {filter} from 'rxjs/operators';
import {DOCUMENT} from '@angular/common';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class SeoService {
    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        @Inject(DOCUMENT) private dom,
        private router: Router,
        private route: ActivatedRoute,
        private titleService: Title,
        private meta: Meta
    ) {
    }
    private readonly frontUrl = environment.frontUrl;

    // private static async checkSeoData(seoData): Promise<void> {
    //     if (!seoData) {
    //         // throw new Error('The page title is not set.');
    //     }
    // }

    public set() {
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe( () => {
                this.onRouteChange();
            });
    }

    private onRouteChange(): void {
        this.route.children.forEach((route: ActivatedRoute) => {
            let activeRoute: ActivatedRoute = route;
            while (activeRoute.firstChild) {
                activeRoute = activeRoute.firstChild;
            }
            const seoData = activeRoute.snapshot.data;
            if (seoData && seoData.pageTitle) {
                this.getSeoMetadataOptions(seoData).then();
            }

        });

    }

    private async getSeoMetadataOptions(seoData): Promise<void> {
        // await SeoService.checkSeoData(seoData);
        const pageTitle = await this.getMetaTitle(seoData);
        const pageDescription = await this.getMetaDescription(seoData);
        const pageImage = await this.getMetaImage(seoData);
        const pageRobots = await this.getMetaRobots(seoData);

        await this.setCanonicalUrl();
        await this.setMetaTitle(pageTitle);
        await this.setMetaDescription(pageDescription);
        await this.setMetaImage(pageImage);
        await this.setMetaRobots(pageRobots);
    }

    getMetaTitle(data: {pageTitle: string | undefined}): string | null {
        return data.pageTitle;
    }

    async setMetaTitle(pageTitle: string): Promise<void> {
        await this.checkMetaTitle(pageTitle);
        await this.titleService.setTitle(pageTitle);
        await this.meta.updateTag({name: 'twitter:title', content: pageTitle});
        await this.meta.updateTag({property: 'og:title', content: pageTitle});
    }

    checkMetaTitle(title: string): boolean {
        if (!title) {
            // throw new Error('The page title is not set.');
        }
        return true;
    }

    getMetaDescription(data: {pageDescription: string}): string | null {
        return data.pageDescription;
    }

    setMetaDescription(pageDescription: string): void {
        this.meta.updateTag({name: 'description', content: pageDescription});
        this.meta.updateTag({name: 'twitter:description', content: pageDescription});
        this.meta.updateTag({property: 'og:description', content: pageDescription});
    }

    getMetaImage(data: {pageImage: string | undefined}): string {
        return (typeof data.pageImage !== 'undefined') ? this.frontUrl + '/' + data.pageImage : null;
    }

    setMetaImage(metaImage: string): void {
        this.meta.updateTag({name: 'image', content: metaImage});
        this.meta.updateTag({name: 'twitter:image', content: metaImage});
        this.meta.updateTag({property: 'og:image', content: metaImage});
    }

    setMetaRobots(metaRobots: string): void {
        this.meta.updateTag({name: 'robots', content: metaRobots});
    }

    getMetaRobots(data: {pageRobots: string | undefined}): string {
        return (typeof data.pageRobots !== 'undefined') ? data.pageRobots : 'INDEX FOLLOW';
    }

    setCanonicalUrl(): void {
        const url = this.frontUrl + ((this.router.url === '/') ? '' : this.router.url) ;
        this.meta.updateTag({property: 'og:url', content: url});
        this.setCanonicalURL(url);
    }

    private setCanonicalURL(url: string): void {
        const link: HTMLLinkElement = this.dom.querySelectorAll('link[rel="canonical"]');
        if (link &&  link[0]) {
            link[0].setAttribute('href', url);
        }
    }


}


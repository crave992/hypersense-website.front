import {Component, ElementRef, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID, Renderer2, ViewChild} from '@angular/core';
import {ProjectsService} from '../../_services/crud_services/projects.service';
import {Meta, Title} from '@angular/platform-browser';
import {isPlatformBrowser} from '@angular/common';
import {ActivatedRoute, NavigationEnd, Router, Scroll} from '@angular/router';
import {SettingsService} from '../../_services/settings.service';
import {ProjectModel} from '../../_models/project.model';
import {filter, takeUntil, map} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {SeoService} from '../../_services/seo.service';
import {Subject} from 'rxjs';
import {RelatedProjectsService} from '../../_services/related-projects.service';
import {ProjectService} from '../../_services/project.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html'
})
export class PageComponent implements OnInit, OnDestroy {
  slug: string;
  href: string; // for SEO share link
  fileStorageUrl: string = environment.cdn;
  imageAbsoluteUrl: string;
  project: ProjectModel;
  projectRelated: ProjectModel[];
  relatedProjectLoading = true;
  popstate = false;
  positionToScroll: any;
  destroySubject$: Subject<void> = new Subject();

  @ViewChild('content') elementView: ElementRef;
  contentHeight: number;

  // @HostListener('window:scroll', ['$event'])
  // doSomething(event) {
  //   // console.debug("Scroll Event", document.body.scrollTop);
  //   // see András Szepesházi's comment below
  //   console.debug("Scroll Event", window.pageYOffset );
  // }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectsService: ProjectsService,
    private settingsService: SettingsService,
    private title: Title,
    private meta: Meta,
    public seoService: SeoService,
    public relatedProjectsService: RelatedProjectsService,
    public projectService: ProjectService,
    @Inject(PLATFORM_ID) private platformId: any,
    private renderer: Renderer2
  ) {

    this.router.events
        .pipe(takeUntil(this.destroySubject$))
        .subscribe(event => {
          if (event instanceof Scroll) {
            this.positionToScroll = event.position;
            if (this.positionToScroll ) {
              this.slug = this.route.snapshot.paramMap.get('slug');
              this.scrollOnBack();
            }
          }
        });

    this.router.events
        .pipe(takeUntil(this.destroySubject$))
        .pipe(
            filter(e => e instanceof NavigationEnd),
            map(() => this.router.getCurrentNavigation().extras.state)
        )
        .subscribe( (value: any) => {

          this.href = environment.frontUrl + this.router.url;
          this.popstate = this.router.getCurrentNavigation().trigger === "popstate";
          this.project = null;
          this.projectRelated = [];
          this.slug = this.route.snapshot.paramMap.get('slug');

          if (value && value.project) {
            this.project = new ProjectModel().deserialize(value.project);
            if (!this.projectService.project) {
              this.projectService.project = {};
            }
            this.projectService.project[this.slug] = this.project;
            this.setImage(this.project.imageURL);
            this.getRelated();
            this.setSeoTags();
          } else {
            if (this.popstate
            && this.projectService.project
            && this.projectService.project[this.slug]
            ) {
              this.project = this.projectService.project[this.slug]
              this.scrollOnBack();
              this.setImage(this.project.imageURL);
              this.getRelated();
              this.setSeoTags();
            } else {
              this.getProject();
            }
          }
        });

  }

  getProjectHeight() {
    this.contentHeight = this.elementView.nativeElement.offsetHeight;
    if (!this.projectService.project) {
      this.projectService.project = {};
    }
    if (this.projectService.project[this.slug]) {
      this.projectService.project[this.slug].contentHeight = this.contentHeight;
    }

    // console.error("START getProjectHeight");
    // console.error("element height",this.elementView.nativeElement.offsetHeight);
    // console.error("slug", this.slug);
    // console.error("contentHeight", this.projectService.project[this.slug].contentHeight);
    // console.error("END getProjectHeight");

  }

  ngOnInit() {

  }

  scrollOnBack() {
    if (isPlatformBrowser(this.platformId)) {

      const height = this.projectService.project[this.slug].contentHeight;

      // console.warn("START scrollOnBack");
      // console.warn("element height", height);
      // console.warn("slug", this.slug);
      // console.warn("positionToScroll", this.positionToScroll);
      // console.warn("contentHeight", this.projectService.project[this.slug].contentHeight);
      // console.warn("END scrollOnBack");
      //
      // console.error("this.positionToScroll", this.positionToScroll);
      // console.error("this.projectService.project[this.slug].contentHeight", this.projectService.project[this.slug].contentHeight); // undefined

      if (this.positionToScroll
          && this.projectService.project[this.slug].contentHeight
      ) {

        // console.log("scroll to if");
        setTimeout(() => {
          if (this.elementView) {
            this.renderer.setStyle(this.elementView.nativeElement, "height", `${height}px`);
          }
          window.scrollTo({
            top: this.positionToScroll[1]
          })

          if (this.elementView) {
            this.renderer.removeStyle(this.elementView.nativeElement, "height");
          }

        }, 100);
      }
    }
  }

  setImage(src: string): void {
    if (src.indexOf('http') !== 0) {
      this.imageAbsoluteUrl = this.fileStorageUrl + '/' + src;
    } else {
      this.imageAbsoluteUrl = src;
    }
  }

  getRelated(): void {

    setTimeout( () => {
      if (!this.project || !this.project.id) {
        return;
      }

      this.slug = this.route.snapshot.paramMap.get('slug');
      if (
          this.popstate
          && this.relatedProjectsService.projectRelated
          && this.relatedProjectsService.projectRelated[this.slug]
          && this.relatedProjectsService.projectRelated[this.slug].length > 0
      ) {
        this.projectRelated = this.relatedProjectsService.projectRelated[this.slug];
      } else {
        const randomTechnology = this.project.technologiesList[Math.floor(Math.random() * this.project.technologiesList.length)];

        this.projectsService.getRelated(this.project.id, randomTechnology, 3)
            .pipe(takeUntil(this.destroySubject$))
            .subscribe( (data: any) => {
              if (data.response) {
                data.response.map(
                    (project: ProjectModel) => {
                      this.projectRelated.push(new ProjectModel().deserialize(project));
                    }
                );
                if (!this.relatedProjectsService.projectRelated) {
                  this.relatedProjectsService.projectRelated = {};
                }
                this.relatedProjectsService.projectRelated[this.slug] = this.projectRelated;
              }
              this.relatedProjectLoading = false;
            });
      }
    }, 0)

  }

  async setSeoTags() {
    const title = this.project.seoMetatitle;
    const description = this.project.seoDescription;
    const seoImage = environment.frontUrl + '/' + this.project.seoImageURL;

    await this.seoService.setMetaTitle(title);
    this.seoService.setMetaDescription(description);
    this.seoService.setMetaImage(seoImage);
    this.seoService.setCanonicalUrl();
  }

  encodeURI(uri) {
    return encodeURI(uri);
  }

  ngOnDestroy(): void {
    this.destroySubject$.next();
    this.destroySubject$.unsubscribe();
  }

  private getProject(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');

    this.projectsService.getProjectById(this.slug, true)
        .pipe(takeUntil(this.destroySubject$))
        .subscribe( (data: any) => {
          if (data.response) {
            this.project = new ProjectModel().deserialize(data.response);
            if (!this.projectService.project) {
              this.projectService.project = {};
            }
            this.projectService.project[this.slug] = this.project;
            this.setImage(this.project.imageURL);
            this.getRelated();
            this.setSeoTags();
          } else {
            if (isPlatformBrowser(this.platformId)) {
              this.router.navigate(['/portfolio']).catch();
            }
          }
        });
  }

}

import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {ProjectModel} from '../../_models/project.model';
import {Subject} from 'rxjs';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ProjectsService} from '../../_services/crud_services/projects.service';
import {SettingsService} from '../../_services/settings.service';
import {Meta, Title} from '@angular/platform-browser';
import {SeoService} from '../../_services/seo.service';
import {filter, map, takeUntil} from 'rxjs/operators';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-lbs-manager',
  templateUrl: './lbs-manager.component.html'
})
export class LbsManagerComponent implements OnInit {
  section1 = true;
  section2 = false;
  section3 = false;
  imageSection = 1;

  href: string;
  fileStorageUrl: string = environment.cdn;
  imageAbsoluteUrl: string;
  slug: string = 'LBS-Manager-transport-flutter-mobile-app';
  project: ProjectModel;
  projectRelated: ProjectModel[];
  relatedProjectLoading = true;
  destroySubject$: Subject<void> = new Subject();

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private projectsService: ProjectsService,
      private settingsService: SettingsService,
      private title: Title,
      private meta: Meta,
      public seoService: SeoService,
      @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.router.events
        .pipe(takeUntil(this.destroySubject$))
        .pipe(
            filter(e => e instanceof NavigationEnd),
            map(() => this.router.getCurrentNavigation().extras.state)
        )
        .subscribe( (value: any) => {
          this.href = environment.frontUrl + this.router.url;

          this.project = null;
          this.projectRelated = [];
          if (value && value.project) {
            this.project = new ProjectModel().deserialize(value.project);
            this.setImage(this.project.imageURL);
            this.getRelated();
            this.setSeoTags();
          } else {
            this.getProject();
          }
        });
  }

  ngOnInit(): void {
  }

  toggleSection1(): void {
    this.section1 = !this.section1;
    this.section2 = false;
    this.section3 = false;
    this.imageSection = 1;
  }
  toggleSection2(): void {
    this.section1 = false;
    this.section2 = !this.section2;
    this.section3 = false;
    this.imageSection = 2;
  }
  toggleSection3(): void {
    this.section1 = false;
    this.section2 = false;
    this.section3 = !this.section3;
    this.imageSection = 3;
  }
  scrollToElement($element): void {
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  private getProject(): void {
    this.projectsService.getProjectById(this.slug, true)
        .pipe(takeUntil(this.destroySubject$))
        .subscribe( (data: any) => {
          if (data.response) {
            this.project = new ProjectModel().deserialize(data.response);
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

  private getRelated(): void {
    if (!this.project || !this.project.id) {
      return;
    }

    // const randomTechnology = this.project.technologiesList[Math.floor(Math.random() * this.project.technologiesList.length)];
    const randomTechnology = 'Flutter';

    this.projectsService.getRelated(this.project.id, randomTechnology, 3)
        .pipe(takeUntil(this.destroySubject$))
        .subscribe( (data: any) => {
          if (data.response) {
            data.response.map(
                (project: ProjectModel) => {
                  this.projectRelated.push(new ProjectModel().deserialize(project));
                }
            );
          }
          this.relatedProjectLoading = false;
        });

  }

  private setSeoTags() {
    const title = this.project.seoMetatitle;
    const description = this.project.seoDescription;
    const seoImage = environment.frontUrl + '/' + this.project.seoImageURL;

    this.seoService.setMetaTitle(title);
    this.seoService.setMetaDescription(description);
    this.seoService.setMetaImage(seoImage);
    this.seoService.setCanonicalUrl();
  }


  private setImage(src: string): void {
    if (src.indexOf('http') !== 0) {
      this.imageAbsoluteUrl = this.fileStorageUrl + '/' + src;
    } else {
      this.imageAbsoluteUrl = src;
    }
  }

  ngOnDestroy(): void {
    this.destroySubject$.next();
    this.destroySubject$.unsubscribe();
  }

}

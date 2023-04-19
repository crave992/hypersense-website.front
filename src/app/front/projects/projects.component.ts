import {Component, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {ProjectsService} from '../_services/crud_services/projects.service';
import {ToastService} from '../shared/core/toasts/toast.service';
import {SettingsService} from '../_services/settings.service';
import {ProjectModel} from '../_models/project.model';
import {filter, takeUntil, map} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {NavigationEnd, Router, Scroll} from '@angular/router';
import {ProjectsListService, SearchFilter} from '../_services/projects-list.service';
import {isPlatformBrowser, ViewportScroller} from '@angular/common';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  readMore = false;
  fileStorageUrl;
  projects: ProjectModel[] = [];
  destroySubject$: Subject<void> = new Subject();
  numberOfLoadingCards = 4;
  bgClass = 'bg-white';
  loadMoreItems = true;

  loadProjects = false;
  projectsLoading = true;
  searchTimeout: any;
  public innerWidth: number;
  positionToScroll: any;
  changePosition = true;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  constructor(
    private projectsService: ProjectsService,
    private settingsService: SettingsService,
    protected toastr: ToastService,
    private router: Router,
    public projectsListService: ProjectsListService,
    @Inject(PLATFORM_ID) private readonly platformId: any,
    public viewportScroller: ViewportScroller
  ) {

    this.router.events
        .pipe(takeUntil(this.destroySubject$))
        .subscribe(event => {
          if (event instanceof Scroll) {
            this.positionToScroll = event.position;
            if (this.positionToScroll ) {
              this.scrollOnBack();
            }
          }
        });



    if (isPlatformBrowser(this.platformId)) {
      this.innerWidth = window.innerWidth;
    }

    if (this.innerWidth >= 1910) { this.numberOfLoadingCards = 4; }
    if (this.innerWidth >= 1432 && this.innerWidth < 1910) { this.numberOfLoadingCards = 3; }
    if (this.innerWidth >= 1401 && this.innerWidth < 1431) { this.numberOfLoadingCards = 2; }
    if (this.innerWidth >= 1131 && this.innerWidth < 1401) { this.numberOfLoadingCards = 3; }
    if (this.innerWidth >= 754 && this.innerWidth <= 1130) { this.numberOfLoadingCards = 2; }
    if (this.innerWidth < 754) { this.numberOfLoadingCards = 1; }

    this.settingsService.getFileStorageUrl()
      .then(res => {
        this.fileStorageUrl = res;
      });

    this.router.events
      .pipe(takeUntil(this.destroySubject$))
      .pipe(
        filter(e => e instanceof NavigationEnd),
        map(() => this.router.getCurrentNavigation().extras.state)
      )
      .subscribe( (value: any) => {

        this.setProjectsOnStart();
        if (value && value.technology && this.router.getCurrentNavigation().trigger !== "popstate") {
          this.projectsListService.filterProjects = new SearchFilter();
          this.projectsListService.filterProjects.technology = value.technology;
          this.projectsListService.filterMobileTitle = value.technology;
          this.getPosts();
          this.hideProjectIfFilterIsActive();
        }
      });

  }

  ngOnInit(): void {

  }

  setProjectsOnStart() {
    if (this.projectsListService.projectList.length > 0) {
      this.projects = this.projectsListService.projectList;
    } else {
      this.getPosts();
    }

    if (this.router.getCurrentNavigation().trigger === "imperative") {
      this.projectsListService.filterProjects = new SearchFilter();
      this.projectsListService.hideProjectSection = false;
      this.getPosts();
    }
  }

  scrollOnBack() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.positionToScroll && this.changePosition) {
        this.changePosition = false;
        setTimeout(() => {
          window.scrollTo({
            top: this.positionToScroll[1]
          })
        }, 0);
      }
    }
  }

  loadMore() {
    if (this.projects && this.projects.length > 0 && this.loadMoreItems === true) {
      this.loadMoreItems = true;
      this.projectsListService.filterProjects.skip += this.projectsListService.filterProjects.limit;
      this.projectsListService.filterProjects.endTime = this.projects[this.projects.length - 1].publishedAt;
      this.getPosts(false, true);
    }
  }

  hideProjectIfFilterIsActive(): void {
    this.projectsListService.hideProjectSection = !!(this.projectsListService.filterProjects.technology);
  }

  applyFilter(value: {name: string; value: string; numberOfLoadingCards?: number}): void {
    this.loadMoreItems = true;
    if (value.numberOfLoadingCards) {
      this.numberOfLoadingCards = value.numberOfLoadingCards;
    }
    this.projects = null;
    this.projectsListService.filterProjects = new SearchFilter();
    this.projectsListService.filterProjects.technology = value.value;
    this.projectsListService.filterMobileTitle = value.name;
    this.hideProjectIfFilterIsActive();
    this.getPosts();
  }

  getPosts(loader = false, append = false) {
    this.projectsLoading = true;
    this.projectsService.getProjects(this.projectsListService.filterProjects, loader)
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((data: any) => {

        if (data.response) {
          if (!append)
          {
            this.projects = [];
          }

          this.readMore = data.response.length >= this.projectsListService.filterProjects.limit;
          data.response.map(
            (post: ProjectModel) => {
              this.projects.push(new ProjectModel().deserialize(post));
            }
          );
          this.projectsListService.projectList = this.projects;
          this.loadMoreItems = (data.response.length > 0);
          this.scrollOnBack();

        } else {
          this.loadMoreItems = false;
          this.router.navigate(['/portfolio']);
          this.toastr.error(data.error_code.message);
        }
        this.projectsLoading = false;
      });
  }

  ngOnDestroy() {
    if (this.searchTimeout) { clearTimeout(this.searchTimeout); }
    this.destroySubject$.next();
    this.destroySubject$.unsubscribe();
  }

}

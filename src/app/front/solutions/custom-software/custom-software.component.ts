import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProjectModel} from '../../_models/project.model';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {ProjectsService} from '../../_services/crud_services/projects.service';
import {ToastService} from '../../shared/core/toasts/toast.service';
import {takeUntil} from 'rxjs/operators';

class SearchFilter {
  keyword?: string;
  caseStudy?: number;
  startTime?: number;
  endTime?: number;
  homepage?: number;
  category?: number;
  software: number | null;
  node: number | null;
  limit?: number;
  skip?: number;
}

@Component({
  selector: 'app-custom-software',
  templateUrl: './custom-software.component.html',
  styleUrls: ['../../homepage/homepage.component.scss', './custom-software.component.scss']
})
export class CustomSoftwareComponent implements OnInit, OnDestroy {

  portfolioProjects: ProjectModel[] = [];
  filterProjects: SearchFilter = {
    keyword: null,
    caseStudy: null,
    startTime: null,
    software: 1,
    node: null,
    endTime: null,
    limit: 3,
    skip: 0
  };


  heroHtml = '<div class="headerText"><h1>Take care of business with ' +
    ' <span class="txt-blue">enterprise software solutions</span></h1></div>' +
    ' <p>Whether your organization is large or small, we’ll build the perfect software solution to fit your needs.</p> ' +
    ' <a class="contactLink pointer" id="contactCta" href="/contact">' +
    ' Get in touch <img alt="arrow right svg" src="./assets/images/front/home/r-arrow.svg"/></a>';

  destroySubject$: Subject<void> = new Subject();

  listTopPriorities = [
    {
      name: 'Enterprise Resource Planning',
      src: 'assets/images/front/svg/erp.svg'
    },
    {
      name: 'Business Intelligence & Analytics ',
      src: 'assets/images/front/svg/bi_analytics.svg'
    },
    {
      name: 'Content Management System',
      src: 'assets/images/front/svg/cms.svg'
    },
    {
      name: 'E-commerce and M-commerce',
      src: 'assets/images/front/svg/ecommerce.svg'
    },
    {
      name: 'Image & Video Processing',
      src: 'assets/images/front/svg/video_processing.svg'
    },
    {
      name: 'Automotive',
      src: 'assets/images/front/svg/automotive.svg'
    },
    {
      name: 'Security Instructions',
      src: 'assets/images/front/svg/security.svg'
    }
  ];

  constructor(
    private router: Router,
    private projectsService: ProjectsService,
    protected toastr: ToastService
  ) {
    this.getPosts();
  }

  ngOnInit() {

  }

  getPosts(loader = false, append = false) {
    this.projectsService.getProjects(this.filterProjects, loader)
      .pipe(takeUntil(this.destroySubject$))
      .subscribe( (data: any) => {
        if (data.response) {

          if (!append) {
            this.portfolioProjects = [];
          }

          data.response.map(
            (post: ProjectModel) => {
              this.portfolioProjects.push(new ProjectModel().deserialize(post));
            }
          );

        } else {
          this.toastr.error(data.error_code.message);
        }
      });
  }


  ngOnDestroy() {
    this.destroySubject$.next();
    this.destroySubject$.unsubscribe();
  }

}

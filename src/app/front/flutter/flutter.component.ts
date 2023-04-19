import { Component, OnInit } from '@angular/core';
import {ProjectModel} from '../_models/project.model';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ProjectsService} from '../_services/crud_services/projects.service';
import {ToastService} from '../shared/core/toasts/toast.service';
import {Router} from '@angular/router';

class SearchFilter {
  endTime: number;
  keyword: string;
  technology: string = 'Flutter';
  startTime: number;
  limit = 4;
  skip = 0;
}

@Component({
  selector: 'app-flutter',
  templateUrl: './flutter.component.html',
  styleUrls: ['./flutter.component.scss']
})
export class FlutterComponent implements OnInit {
  projects: ProjectModel[] = [];
  projectsLoading = true;
  readMore = false;
  numberOfLoadingCards = 4;
  filterProjects: SearchFilter = new SearchFilter();
  destroySubject$: Subject<void> = new Subject();

  constructor(
      private projectsService: ProjectsService,
      protected toastr: ToastService,
      private router: Router
  ) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(loader = false, append = false) {
    this.projectsLoading = true;
    this.projectsService.getProjects(this.filterProjects, loader)
        .pipe(takeUntil(this.destroySubject$))
        .subscribe((data: any) => {
          if (data.response) {

            if (!append) {
              this.projects = [];
            }

            this.readMore = data.response.length >= this.filterProjects.limit;

            data.response.map(
                (post: ProjectModel) => {
                  this.projects.push(new ProjectModel().deserialize(post));
                }
            );
          } else {
            this.router.navigate(['/portfolio']);
            this.toastr.error(data.error_code.message);
          }
          this.projectsLoading = false;
        });
  }

  scrollToElement($element): void {
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  ngOnDestroy(): void {
    this.destroySubject$.next();
    this.destroySubject$.unsubscribe();
  }

}

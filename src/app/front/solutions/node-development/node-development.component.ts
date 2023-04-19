import {Component, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {ProjectModel} from '../../_models/project.model';
import {ProjectsService} from '../../_services/crud_services/projects.service';

import {ToastService} from '../../shared/core/toasts/toast.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-node-development',
  templateUrl: './node-development.component.html',
  styleUrls: ['../../homepage/homepage.component.scss', './node-development.component.scss']
})
export class NodeDevelopmentComponent implements OnInit, OnDestroy {
  heroHtml = '<div class="headerText"><h1>Innovate with ' +
    ' <span class="txt-blue">Node.js solutions</span></h1></div>' +
    ' <p>Node.js is the gold standard in web runtime environments: secure, lightweight and scalable.</p> ' +
    ' <a class="contactLink pointer" id="contactCta" href="/contact">' +
    ' Get in touch <img alt="arrow right svg" src="./assets/images/front/home/r-arrow.svg"/></a>';

  nodeSolutions = [
    {
      title: 'Unified front-end and back-end codebase',
      description: 'Node.js is full-stack Javascript that runs seamlessly on both the client and server side. ' +
        'This means that it only requires one type of developer to implement, saving you time and money.',
      image: 'assets/images/front/nodeDev/img1.png',
      srcSets: 'assets/images/front/nodeDev/img1.png 1x, ' +
        'assets/images/front/nodeDev/img1@2x.png 2x, ' +
        'assets/images/front/nodeDev/img1@3x.png 3x'
    },
    {
      title: 'Lightning-fast speed',
      description: 'Node.js is powered by Google’s V8 engine, which compiles JavaScript in native code. This makes everything ' +
        'faster — in fact, Node.js helped Netflix reduce its main system startup time by 70%.',
      image: 'assets/images/front/nodeDev/img2.png',
      srcSets: 'assets/images/front/nodeDev/img2.png 1x, ' +
        'assets/images/front/nodeDev/img2@2x.png 2x, ' +
        'assets/images/front/nodeDev/img2@3x.png 3x'
    },
    {
      title: 'Easy monitoring and debugging',
      description: 'Unlike other solutions, Node.js allows you to inspect and change programs without needing to restart.',
      image: 'assets/images/front/nodeDev/img3.png',
      srcSets: 'assets/images/front/nodeDev/img3.png 1x, ' +
        'assets/images/front/nodeDev/img3@2x.png 2x, ' +
        'assets/images/front/nodeDev/img3@3x.png 3x'
    }
  ];

  marketProvenTehnologies = [
    {
      image: 'assets/images/front/technologyStack/nodejs.svg'
    }, {
      image: 'assets/images/front/technologyStack/loopback.svg'
    }, {
      image: 'assets/images/front/technologyStack/angular.svg'
    }, {
      image: 'assets/images/front/technologyStack/express.svg'
    }, {
      image: 'assets/images/front/technologyStack/amp.svg'
    }, {
      image: 'assets/images/front/technologyStack/nginx.svg'
    }, {
      image: 'assets/images/front/technologyStack/aws.svg'
    }, {
      image: 'assets/images/front/technologyStack/sql.svg'
    }, {
      image: 'assets/images/front/technologyStack/elastic.svg'
    },
    {
      image: 'assets/images/front/technologyStack/mongo.svg'
    },
    {
      image: 'assets/images/front/technologyStack/redis.svg'
    }, {
      image: 'assets/images/front/technologyStack/stripe.svg'
    }, {
      image: 'assets/images/front/technologyStack/avs_rds.svg'
    },
    {
      image: 'assets/images/front/technologyStack/aws_dyn.svg'
    },
    {
      image: 'assets/images/front/technologyStack/bootstrap.svg'
    },
  ];


  testimonialItem = [{
    id: 26,
    updatedAt: 1580821183.118,
    createdAt: 1580821183.118,
    sourceURL: 'https://clutch.co/profile/hypersense-software#review-25564',
    source: 'clutch',
    name: 'Vicent Petrescu',
    src: '',
    location: 'Chicago, USA',
    title: 'CEO',
    company: 'truCrowd, INC',
    description: 'The team is trustworthy and reliable. HyperSense contributes fully to their projects, ' +
        'making suggestions and being proactive. They spent extra time to train others on the platform ' +
        'and doing research at no extra cost.',
    rank: 5
  }];

  portfolioProjects: ProjectModel[] = [];
  filterProjects: any = {
    keyword: null,
    startTime: null,
    endTime: null,
    homepage: null,
    software: null,
    node: 1,
    limit: 3,
    skip: 0
  };
  destroySubject$: Subject<void> = new Subject();

  constructor(
    private projectsService: ProjectsService,
    private toastr: ToastService,
  ) { }

  ngOnInit(): void {
    this.getPosts();
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

import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['../homepage/homepage.component.scss', './services.component.scss']
})
export class ServicesComponent implements OnInit, AfterViewInit, OnDestroy {

  destroySubject$: Subject<void> = new Subject();

  heroHtml = '<div class="headerText"><h1>We handle the technology so you can <span class="txt-blue">focus on your business.</span></h1></div>';
  listTehnologiesBadges = [
    {name: 'iOS', src: 'assets/images/front/svg/ios.svg', url: '/portfolio', state:{ technology: 'iOS' }},
    {name: 'Android', src: 'assets/images/front/svg/android.svg' , url: '/portfolio', state:{ technology: 'Android' }},
    {name: 'Flutter', src: 'assets/images/front/svg/flutter-icon.svg', url: '/portfolio', state:{ technology: 'Flutter' }},
    {name: 'Web', src: 'assets/images/front/svg/web.svg' , url: '/portfolio', state:{ technology: 'Angular' }},
    {name: 'Cloud', src: 'assets/images/front/svg/cloud.svg' , url: '/portfolio', state:{ technology: 'Node.js' }},
    {name: 'Wearables', src: 'assets/images/front/svg/wearables.svg' , url: '/portfolio', state:{ technology: 'Wearables' }},
    {name: 'IoT', src: 'assets/images/front/svg/iot.svg' , url: '/portfolio', state: null},

  ];

  softwareForAll = [
    {
      title: 'Web Development',
      content: 'We build lean, scalable websites and web applications for both start-ups and established ' +
        'businesses. We work with Node.js, Loopback, Angular, and more.',
      mainImage: 'assets/images/front/services_page/1/main.jpg',
      mainImageSrcSet: 'assets/images/front/services_page/1/main.jpg 1x, ' +
        'assets/images/front/services_page/1/main@2x.jpg 2x, ' +
        'assets/images/front/services_page/1/main@3x.jpg 3x',
      mainImageSmallSrcSet: 'assets/images/front/services_page/1/main_small.jpg 1x, ' +
        'assets/images/front/services_page/1/main_small@2x.jpg 2x, ' +
        'assets/images/front/services_page/1/main_small@3x.jpg 3x',
      id: 'web',
      techsFirstRow: [
        {
          icon: 'assets/images/front/services_page/1/1.svg',
          text: 'Node.js Web Development',
          link: '/node-development',
          class: 'custom-w-18'
        },
        {
          icon: 'assets/images/front/services_page/1/3.svg',
          text: 'Cloud Computing & SaaS Applications',
          link: null,
          class: 'custom-w-18'
        },
        {
          icon: 'assets/images/front/services_page/1/5.svg',
          text: 'Custom Websites',
          link: null,
          class: 'custom-w-18'
        }
      ],
      techsSecondRow: [
        {
          icon: 'assets/images/front/services_page/1/2.svg',
          text: 'Distributed Web Applications',
          link: null,
          class: 'custom-w-18'
        },
        {
          icon: 'assets/images/front/services_page/1/4.svg',
          text: 'Custom Enterprise Software Solutions',
          link: '/enterprise-custom-software-development',
          class: 'custom-w-18'
        },
        {
          icon: 'assets/images/front/services_page/1/6.svg',
          text: 'E-Commerce & Marketplaces',
          link: null,
          class: 'custom-w-18'
        }
      ]
    },
    {
      title: 'Native Mobile Apps',
      content: 'We develop native apps that take better advantage of iOS and Android, helping you attract more users and generate increased revenue. ' +
        'Our team builds native apps with state-of-the-art programming languages like Swift and Kotlin.',
      mainImage: 'assets/images/front/services_page/2/main.jpg',
      mainImageSrcSet: 'assets/images/front/services_page/2/main.jpg 1x, ' +
        'assets/images/front/services_page/2/main@2x.jpg 2x, ' +
        'assets/images/front/services_page/2/main@3x.jpg 3x',
      mainImageSmallSrcSet: 'assets/images/front/services_page/2/main_small.jpg 1x, ' +
        'assets/images/front/services_page/2/main_small@2x.jpg 2x, ' +
        'assets/images/front/services_page/2/main_small@3x.jpg 3x',
      id: 'native',
      techsFirstRow: [
        {
          icon: 'assets/images/front/services_page/2/1.svg',
          text: 'Solutions for iOS & Android',
          link: '/native-mobile-app-development',
          class: 'custom-w-17'
        },
        {
          icon: 'assets/images/front/services_page/2/3.svg',
          text: 'Image & Video Processing Apps',
          link: null,
          class: 'custom-w-18'
        },
        {
          icon: 'assets/images/front/services_page/2/5.svg',
          text: 'Location Tracking Apps',
          link: '/enterprise-custom-software-development',
          class: 'custom-w-18'
        }
      ],
      techsSecondRow: [
        {
          icon: 'assets/images/front/services_page/2/2.svg',
          text: 'FinTech & Business Apps',
          link: null,
          class: 'custom-w-18'
        },
        {
          icon: 'assets/images/front/services_page/2/4.svg',
          text: 'Dating Apps',
          link: null,
          class: 'custom-w-13'
        }
      ]
    },
    {
      title: 'UI & UX Design',
      content: 'We design elegant user experiences for mobile apps and websites, delighting your visitors — and converting them into customers. ',
      mainImage: 'assets/images/front/services_page/3/main.jpg',
      mainImageSrcSet: 'assets/images/front/services_page/3/main.jpg 1x, ' +
        'assets/images/front/services_page/3/main@2x.jpg 2x, ' +
        'assets/images/front/services_page/3/main@3x.jpg 3x',
      mainImageSmallSrcSet: 'assets/images/front/services_page/3/main_small.jpg 1x, ' +
        'assets/images/front/services_page/3/main_small@2x.jpg 2x, ' +
        'assets/images/front/services_page/3/main_small@3x.jpg 3x',
      id: 'uiux',
      techsFirstRow: [
        {
          icon: 'assets/images/front/services_page/3/1.svg',
          text: 'Market Research & Analysis',
          link: null,
          class: 'custom-w-13'
        },
        {
          icon: 'assets/images/front/services_page/3/3.svg',
          text: 'Information Architecture',
          link: null,
          class: 'custom-w-13'
        },
        {
          icon: 'assets/images/front/services_page/3/5.svg',
          text: 'Wireframing',
          link: null,
          class: ''
        }
      ],
      techsSecondRow: [
        {
          icon: 'assets/images/front/services_page/3/2.svg',
          text: 'Prototyping',
          link: null,
          class: ''
        },
        {
          icon: 'assets/images/front/services_page/3/4.svg',
          text: 'User Interface Design',
          link: null,
          class: ''
        },
        {
          icon: 'assets/images/front/services_page/3/6.svg',
          text: 'Animations & Microinteractions',
          link: null,
          class: 'custom-w-13'
        },
      ]
    },

    {
      title: 'DevOps',
      content: 'We construct DevOps systems that allow your business ' +
        'to deliver applications and services flawlessly and at high velocity.',
      mainImage: 'assets/images/front/services_page/4/main.jpg',
      mainImageSrcSet: 'assets/images/front/services_page/4/main.jpg 1x, ' +
        'assets/images/front/services_page/4/main@2x.jpg 2x, ' +
        'assets/images/front/services_page/4/main@3x.jpg 3x',
      id: 'devops',
      techsFirstRow: [
        {
          icon: 'assets/images/front/services_page/4/1.svg',
          text: 'Deployment Pipelines & Streamlined Flows',
          link: null,
          class: 'custom-w-24'
        },
        {
          icon: 'assets/images/front/services_page/4/3.svg',
          text: 'Scalable & Adaptive System Design',
          link: null,
          class: 'custom-w-18'
        },
        {
          icon: 'assets/images/front/services_page/4/5.svg',
          text: 'Automated Error Recovery',
          link: null,
          class: 'custom-w-21'
        }
      ],
      techsSecondRow: [
        {
          icon: 'assets/images/front/services_page/4/2.svg',
          text: ' Automated Error Recovery',
          link: null,
          class: 'custom-w-22'
        },
        {
          icon: 'assets/images/front/services_page/4/4.svg',
          text: 'Amazon Web Services Solutions & Integrations',
          link: null,
          class: ''
        }
      ]
    },
    {
      title: 'Big Data, BI and Automation',
      content: 'We engineer lightning-fast, insights-driven BI apps to help your business make smarter decisions with confidence.',
      mainImage: 'assets/images/front/services_page/5/main.jpg',
      mainImageSrcSet: 'assets/images/front/services_page/5/main.jpg 1x, ' +
        'assets/images/front/services_page/5/main@2x.jpg 2x, ' +
        'assets/images/front/services_page/5/main@3x.jpg 3x',
      mainImageSmallSrcSet: 'assets/images/front/services_page/5/main_small.jpg 1x, ' +
        'assets/images/front/services_page/5/main_small@2x.jpg 2x, ' +
        'assets/images/front/services_page/5/main_small@3x.jpg 3x',
      id: 'bigdata',
      techsFirstRow: [
        {
          icon: 'assets/images/front/services_page/5/1.svg',
          text: 'ETL Pipelines',
          link: null,
          class: ''
        },
        {
          icon: 'assets/images/front/services_page/5/3.svg',
          text: 'Custom Analytics',
          link: null,
          class: ''
        },
        {
          icon: 'assets/images/front/services_page/5/5.svg',
          text: 'Data Warehouses & Cold Storage',
          link: null,
          class: 'custom-w-17'
        }
      ],
      techsSecondRow: [
        {
          icon: 'assets/images/front/services_page/5/2.svg',
          text: 'Data Visualization',
          link: null,
          class: ''
        },
        {
          icon: 'assets/images/front/services_page/5/4.svg',
          text: 'Business Intelligence',
          link: null,
          class: 'custom-w-17'
        },
      ]
    },
    {
      title: 'Quality Assurance',
      content: 'We employ a dedicated in-house QA team to ensure your app or ' +
        'website launch goes smoothly and that any issues are rapidly resolved.',
      mainImage: 'assets/images/front/services_page/6/main.jpg',
      mainImageSrcSet: 'assets/images/front/services_page/6/main.jpg 1x, ' +
        'assets/images/front/services_page/6/main@2x.jpg 2x, ' +
        'assets/images/front/services_page/6/main@3x.jpg 3x',
      mainImageSmallSrcSet: 'assets/images/front/services_page/6/main_small.jpg 1x, ' +
        'assets/images/front/services_page/6/main_small@2x.jpg 2x, ' +
        'assets/images/front/services_page/6/main_small@3x.jpg 3x',
      id: 'qa',
      techsFirstRow: [
        {
          icon: 'assets/images/front/services_page/6/1.svg',
          text: 'Defects & Test Cases Management',
          link: null,
          class: 'custom-w-15'
        },
        {
          icon: 'assets/images/front/services_page/6/3.svg',
          text: 'Performance & Stress Testing',
          link: null,
          class: 'custom-w-13'
        },
        {
          icon: 'assets/images/front/services_page/6/5.svg',
          text: 'Migration Testing',
          link: null,
          class: 'custom-w-19'
        },
      ],
      techsSecondRow: [
        {
          icon: 'assets/images/front/services_page/6/2.svg',
          text: 'User Documentation Testing',
          link: null,
          class: 'custom-w-16'
        },
        {
          icon: 'assets/images/front/services_page/6/4.svg',
          text: 'PCI DSS Compliance & Security Testing',
          link: null,
          class: ''
        },
        {
          icon: 'assets/images/front/services_page/6/6.svg',
          text: 'Third-Party Compliance',
          link: null,
          class: ''
        },
      ]
    }
  ];

  solutionsForOurPartners = [
    {
      icon: 'assets/images/front/services_page/reliable_icon.svg',
      title: 'Reliable',
      description: 'Our QA team closely reviews your software for even the smallest business logic issues or general codebase flaws.'
    },
    {
      icon: 'assets/images/front/services_page/secure_icon.svg',
      title: 'Secure',
      description: 'We employ hardened encryption protocols to keep your software secure from hackers and other malicious actors.'
    },
    {
      icon: 'assets/images/front/services_page/maintainable_icon.svg',
      title: 'Maintainable',
      description: 'We design with maintainability and scalability in mind, using multi-tiered architecture that allows for rapid code changes as needed.'
    },
  ];
  scrollTo: boolean|string = false;

  constructor(
    private router: Router
  ) {
    this.scrollToElement();
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.scroll();
  }

  scrollToElement(): void {
    this.router.events
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(s => {
        if (s instanceof NavigationEnd) {
          const tree = this.router.parseUrl(this.router.url);
          if (tree.fragment) {
            this.scrollTo = tree.fragment;
          }
        }
      });
  }

  scroll() {
    if (this.scrollTo) {
      const element = document.querySelector('#' + this.scrollTo);
      if (element) { element.scrollIntoView(true); }
    }
  }

  ngOnDestroy() {
    this.destroySubject$.next();
    this.destroySubject$.unsubscribe();
  }
}

import {Component, ElementRef, Inject, Input, OnDestroy, OnInit, PLATFORM_ID, Renderer2, ViewChild} from '@angular/core';
import {fromEvent, Subject} from 'rxjs';
import {isPlatformBrowser} from '@angular/common';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-front-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy, OnDestroy {
  @Input() blog: boolean;
  @Input() fullWidth = false;
  @Input() contact: boolean;
  @Input() project: boolean;
  @ViewChild('stickyMenu', {static: false}) menuElement: ElementRef;

  href = null;
  sticky = false;
  menuPosition = 1;
  isMenuCollapsed = true;

  destroySubject$: Subject<void> = new Subject();

  appMenu = [
    {
      id: 'projectsM',
      name: 'Projects',
      link: '/portfolio',
      suboptions: []
    },
    {
      id: 'aboutM',
      name: 'ABOUT US', link: '/about',
      suboptions: []
    },
    {
      id: 'technologiesM',
      name: 'Solutions', link: '',
      suboptions: [
        {
          name: 'Node.js Development',
          link: '/node-development',
          icon: 'assets/images/front/softwareForAll/icons/node.svg'
        },
        {
          name: 'Flutter Development',
          link: '/flutter-mobile-app-development',
          icon: 'assets/images/front/softwareForAll/icons/flutter-menu-icon.svg'
        },
        {
          name: 'Native iOS and Android',
          link: '/native-mobile-app-development',
          icon: 'assets/images/front/softwareForAll/icons/mobile.svg'
        },
        {
          name: 'Custom Enterprise Software',
          link: '/enterprise-custom-software-development',
          icon: 'assets/images/front/softwareForAll/icons/enterprise.svg'
        },
      ]
    },
    {
      id: 'servicesM',
      name: 'Services',
      link: '/services',
      suboptions: []
    },
    {
      id: 'blogM',
      name: 'Blog',
      link: '/blog',
      suboptions: []
    },
    {
      id: 'contactM',
      name: 'Contact',
      link: '/contact',
      suboptions: []
    }
  ];

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    if (isPlatformBrowser(this.platformId)) {
      fromEvent(window, 'scroll')
        .pipe(takeUntil(this.destroySubject$))
        .subscribe((event) => this.handleScroll());
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.renderer.removeClass(document.body, 'overflow-hidden');
    }
  }


  handleScroll() {
    const windowScroll = window.pageYOffset;
    if (!this.blog) {
      this.sticky = (windowScroll > this.menuPosition);
    }
  }

  collapse() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this.collapseChangeBody();
  }

  collapseChangeBody() {
    if (this.isMenuCollapsed) {
      this.renderer.removeClass(document.body, 'overflow-hidden');
    } else {
      this.renderer.addClass(document.body, 'overflow-hidden');
    }
  }

  ngOnDestroy() {
    this.destroySubject$.next();
    this.destroySubject$.unsubscribe();
  }
}

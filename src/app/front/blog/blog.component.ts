import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {PostModel} from '../_models/post.model';
import {PostsService} from '../_services/crud_services/posts.service';
import {ToastService} from '../shared/core/toasts/toast.service';
import {SettingsService} from '../_services/settings.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {isPlatformBrowser} from '@angular/common';
import {Router, Scroll} from '@angular/router';
import {BlogListService, SearchFilter} from '../_services/blog-list.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit, OnDestroy {
  searchTimeout: any;
  destroySubject$: Subject<void> = new Subject();
  fileStorageUrl: string;

  changePosition = true;
  public innerWidth: number;
  numberOfLoadingCards = 3;
  positionToScroll: any;

  constructor(
    public postService: PostsService,
    protected toastr: ToastService,
    protected settingsService: SettingsService,
    private router: Router,
    @Inject(PLATFORM_ID) private readonly platformId: any,
    public blogListService: BlogListService
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

    if (this.innerWidth >= 1910) { this.numberOfLoadingCards = 3; }
    if (this.innerWidth >= 1432 && this.innerWidth < 1910) { this.numberOfLoadingCards = 3; }
    if (this.innerWidth >= 1401 && this.innerWidth < 1431) { this.numberOfLoadingCards = 2; }
    if (this.innerWidth >= 1131 && this.innerWidth < 1401) { this.numberOfLoadingCards = 3; }
    if (this.innerWidth >= 754 && this.innerWidth <= 1130) { this.numberOfLoadingCards = 2; }
    if (this.innerWidth < 754) { this.numberOfLoadingCards = 1; }

    this.settingsService.getFileStorageUrl().then((fileStorage) => {
      this.fileStorageUrl = fileStorage;
    });

    this.setProjectsOnStart();

  }

  ngOnInit() {

  }


  setProjectsOnStart() {
    if (this.blogListService.blogList.length > 0) {
      this.blogListService.blogPostsLoading = false;
      this.blogListService.blogPosts = this.blogListService.blogList;
    } else {
      this.getPosts();
    }

    if (this.router.getCurrentNavigation().trigger === "imperative") {
      this.blogListService.filterPosts = new SearchFilter();
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

  getPostsForCategory(categoryID, categoryName) {

    this.blogListService.blogPosts = null;
    this.blogListService.filterPosts.category = categoryID;
    this.blogListService.filterPosts.keyword = null;
    this.blogListService.filterPosts.skip = 0;
    if (!categoryID) {
      this.blogListService.blogSubTitle = 'What\'s new';
    } else {
      this.blogListService.blogSubTitle = categoryName.replace(/\b\w/g, (l) => l.toUpperCase());
    }

    this.getPosts(true, false);
  }


  getPosts(loader = false, append = false) {
    this.blogListService.blogPostsLoading = loader;
    this.postService.getPosts(this.blogListService.filterPosts)
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((data: any) => {
        this.blogListService.blogPostsLoading = false;
        if (data.response) {
          this.blogListService.blogPostsLoadingMore = false;
          if (!append) {
            this.blogListService.blogPosts = [];
          }

          this.blogListService.readMore = data.response.length >= this.blogListService.filterPosts.limit;

          data.response.map(
            (post: PostModel) => {
              this.blogListService.blogPosts.push(new PostModel().deserialize(post));
            }
          );

          this.blogListService.blogList = this.blogListService.blogPosts;

        } else {
          this.toastr.error(data.error_code.message);
        }
      });
  }

  search() {
    if (this.blogListService.filterPosts.keyword.length > 3) {
      this.blogListService.searchKeyword = true;
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }
      this.searchTimeout = setTimeout(() => {
        this.searchPosts();
      }, 1000);
    }

    if (this.blogListService.filterPosts.keyword.length === 0 && this.blogListService.searchKeyword) {
      this.blogListService.searchKeyword = false;
      this.blogListService.filterPosts.keyword = null;
      this.searchPosts();
    }
  }

  searchPosts() {
    this.blogListService.filterPosts.category = null;
    this.blogListService.filterPosts.skip = 0;
    this.blogListService.blogPostsLoading = true;
    this.blogListService.blogSubTitle = 'What\'s new';

    this.getPosts(true, false);
  }

  loadMore() {
    if (
        this.blogListService.blogPosts
        && this.blogListService.blogPosts.length > 0
        && this.blogListService.blogPostsLoadingMore === false
        && this.blogListService.readMore
    ) {
      // this.blogListService.filterPosts.endTime = this.blogListService.blogPosts[this.blogListService.blogPosts.length - 1].publishedAt;
      this.blogListService.filterPosts.skip += this.blogListService.filterPosts.limit;
      this.blogListService.blogPostsLoadingMore = true;
      this.getPosts(false, true);
    }
  }

  ngOnDestroy() {
    if (this.searchTimeout) { clearTimeout(this.searchTimeout); }
    this.destroySubject$.next();
    this.destroySubject$.unsubscribe();
  }

}

import {Component, ElementRef, Inject, OnChanges, OnDestroy, OnInit, PLATFORM_ID, Renderer2, SimpleChanges, ViewChild} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {ToastService} from '../../shared/core/toasts/toast.service';
import {Subject} from 'rxjs';
import {PostsService} from '../../_services/crud_services/posts.service';
import {ActivatedRoute, NavigationEnd, Router, Scroll} from '@angular/router';
import {SettingsService} from '../../_services/settings.service';
import {PostModel} from '../../_models/post.model';
import {filter, takeUntil, map} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {SeoService} from '../../_services/seo.service';
import {BlogService} from '../../_services/blog.service';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {
  blogPost;
  relatedPosts: PostModel[] = [];
  slug: string;
  href: string;
  fileStorageUrl: string = environment.cdn;
  contentHeight: number;
  destroySubject$: Subject<void> = new Subject();
  positionToScroll: any;
  @ViewChild('content') elementView: ElementRef;

  constructor(
    public postService: PostsService,
    protected toastr: ToastService,
    private route: ActivatedRoute,
    private router: Router,
    protected settingsService: SettingsService,
    private title: Title,
    private meta: Meta,
    private seoService: SeoService,
    public blogService: BlogService,
    @Inject(PLATFORM_ID) private platformId: any,
    private renderer: Renderer2
  ) {


      this.router.events
          .pipe(takeUntil(this.destroySubject$))
          .subscribe( (event: any) => {

            if (event instanceof Scroll) {
              this.positionToScroll = event.position;
              if (this.positionToScroll ) {
                this.slug = this.route.snapshot.paramMap.get('slug');
                this.scrollOnBack();
              }
            }

            if (event instanceof NavigationEnd) {
              let value = this.router.getCurrentNavigation().extras.state;

              this.blogPost = null;
              this.relatedPosts = [];
              this.slug = this.route.snapshot.paramMap.get('slug');
              if (
                this.blogService.relatedPosts
                && this.blogService.relatedPosts[this.slug]
              ) {
                this.relatedPosts = this.blogService.relatedPosts[this.slug];
              }

              this.slug = null;
              this.href = environment.frontUrl + this.router.url;
              if (value && value.post) {
                this.slug = value.post.slug;
                this.blogService.blogPost[this.slug] = value.post;
                this.blogPost = new PostModel().deserialize(value.post);
                this.relatedPostsLoad();
                this.setSeoTags();
              } else {
                this.loadContent();
              }
            }


          });
  }

  ngOnInit() {
  }

  loadContent(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');

    if (this.blogService.blogPost && this.blogService.blogPost[this.slug]) {
      this.blogPost = this.blogService.blogPost[this.slug];
      this.relatedPostsLoad();
      this.setSeoTags();
    } else {
      this.postService.getPostBySlug(this.slug)
        .pipe(takeUntil(this.destroySubject$))
        .subscribe((data: any) => {
          if (data.response) {
            data.response.map(
              (post: PostModel) => {
                this.blogService.blogPost[this.slug] = post;
                this.blogPost = new PostModel().deserialize(post);
                this.relatedPostsLoad();
                this.setSeoTags();
              }
            );

          } else {
            this.toastr.error(data.error_code.message);
            this.router.navigate(['/blog']).catch();
          }
        });
    }

  }


  async setSeoTags() {
    const title = this.blogPost.seoMetatitle;
    const description = this.blogPost.seoDescription;
    const seoImage =  environment.frontUrl + '/' + this.blogPost.seoImageURL;

    await this.seoService.setMetaTitle(title);
    this.seoService.setMetaDescription(description);
    this.seoService.setMetaImage(seoImage);
    this.seoService.setCanonicalUrl();

  }

  relatedPostsLoad() {


    if (
      this.blogService.relatedPosts
      && this.blogService.relatedPosts[this.slug]
    ) {
      this.relatedPosts = this.blogService.relatedPosts[this.slug];
    } else {

      this.postService.getRelatedPosts(this.blogPost.id, 3)
        .pipe(takeUntil(this.destroySubject$))
        .subscribe((data: any) => {
          if (data.response) {
            this.slug = this.route.snapshot.paramMap.get('slug');
            this.blogService.relatedPosts[this.slug] = data.response;
            data.response.map(
              (post: PostModel) => {
                this.slug = this.route.snapshot.paramMap.get('slug');
                this.relatedPosts.push(new PostModel().deserialize(post));
              }
            );
          } else {
            this.toastr.error(data.error_code.message);
            this.router.navigate(['/blog']).catch();
          }
        });
    }
  }

  getPostHeight() {
      this.contentHeight = this.elementView.nativeElement.offsetHeight;
      if (!this.blogPost) {
          this.blogPost = {};
      }
      if (this.blogService.blogPost[this.slug]) {
          this.blogService.blogPost[this.slug].contentHeight = this.contentHeight;
      }


  }

  scrollOnBack() {
    if (isPlatformBrowser(this.platformId)) {

      this.slug = this.route.snapshot.paramMap.get('slug');


      const height = this.blogService.blogPost[this.slug].contentHeight


      if (this.positionToScroll
        && this.blogService.blogPost[this.slug].contentHeight
      ) {
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

  encodeURI(uri) {
    return encodeURI(uri);
  }
  ngOnDestroy() {
    this.destroySubject$.next();
    this.destroySubject$.unsubscribe();
  }

}

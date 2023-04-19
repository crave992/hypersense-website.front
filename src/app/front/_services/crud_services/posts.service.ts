import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Inject, Injectable, Optional} from '@angular/core';
import { environment } from '../../../../environments/environment';

const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json'
});

@Injectable({
    providedIn: 'root'
})

export class PostsService  {
  apiUrl: string = environment.apiUrl;

  constructor(
    protected http: HttpClient,
    @Optional() @Inject('APP_BACKEND') private APP_BACKEND: any,
  ) {
    if (APP_BACKEND !== null) {
      this.apiUrl = APP_BACKEND;
    }
  }

  getPosts(filters) {
      const params = new HttpParams()
        .set('keyword', (filters.keyword) ? filters.keyword : '')
        .set('startTime', (filters.startTime) ? filters.startTime : '')
        .set('endTime', (filters.endTime) ? filters.endTime : '')
        .set('category', (filters.category) ? filters.category : '')
        .set('status', (filters.status) ? filters.status : '')
        .set('limit', (filters.limit) ? filters.limit : 10)
        .set('skip', (filters.skip) ? filters.skip : 0);

      return this.http.get(this.apiUrl + 'api/v1/blogs/findPosts', {params, headers});
  }

  getPostBySlug(slugID) {
    const params = new HttpParams()
      .set('slug', slugID);

    return this.http.get(this.apiUrl + 'api/v1/blogs/getPostBySlug', {params, headers});
  }

  getRelatedPosts(postID, limit) {
    const params = new HttpParams()
      .set('postID', postID)
      .set('limit', limit);

    return this.http.get(this.apiUrl + 'api/v1/blogs/findRelatedPosts', {params, headers});
  }

  getCategories() {
      return this.http.get(this.apiUrl + 'api/v1/postCategories/getCategories', {headers});
  }

}

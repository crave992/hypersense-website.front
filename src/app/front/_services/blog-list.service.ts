import { Injectable } from '@angular/core';
import {PostModel} from '../_models/post.model';
import {PostCategoryModel} from '../_models/postCategory.model';

export class SearchFilter {
  keyword: string;
  caseStudy: number;
  startTime: number;
  endTime: number;
  homepage: number;
  category: number | null = null;
  limit = 12;
  skip = 0;
}

@Injectable({
  providedIn: 'root'
})
export class BlogListService {
  public blogList:PostModel[] =[];
  filterPosts: SearchFilter = new SearchFilter();
  blogPostsLoadingMore = false;
  readMore = false;
  blogPostsLoading = true;
  blogSubTitle = 'What\'s new';
  blogPosts: PostModel[] = [];
  categories: PostCategoryModel[] = [];
  categoryList: any;
  searchKeyword = false;

  constructor(

  ) {
    const categoryList: PostCategoryModel[] = [
      {
        id:1,
        title: 'Tips & Tricks',
        updatedAt: 1579503690,
        createdAt: 1579503690
      },
      {
        id:2,
        title: 'business cases',
        updatedAt:1579503690,
        createdAt:1579503690
      },
      {
        id:3,
        title:'concepts',
        updatedAt:1579503690,
        createdAt:1579503690
      },
      {
        id:4,
        title:'devops',
        updatedAt:1579503690,
        createdAt:1579503690
      },
      {
        id:5,
        title:'news',
        updatedAt:1579503690,
        createdAt:1579503690
      },
      {
        id:6,
        title:'q&a',
        updatedAt:1579503690,
        createdAt:1579503690
      }
    ];
    this.categories.push({id: null, title: 'What\'s new'});

    categoryList.map( (category: PostCategoryModel ) => {
      this.categories.push(category);
    });
  }
}

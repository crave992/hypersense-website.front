import { Injectable } from '@angular/core';
import {PostModel} from '../_models/post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  relatedPosts: any = {};
  blogPost: any = {};
  constructor() { }
}

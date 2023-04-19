import { Injectable } from '@angular/core';
import {ProjectModel} from '../_models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  project: any;
  constructor() { }
}

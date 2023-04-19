import { Injectable } from '@angular/core';
import {ProjectModel} from '../_models/project.model';

export class SearchFilter {
  endTime: number;
  keyword: string;
  technology: string = null;
  startTime: number;
  limit = 12;
  skip = 0;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsListService {
  public projectList:ProjectModel[] =[];
  public hideProjectSection = false;
  filterProjects: SearchFilter = new SearchFilter();
  optionsTechnologies = [
    {name: 'ALL PROJECTS', value: null},
    {name: 'Flutter', value: 'Flutter', numberOfLoadingCards: 3},
    {name: 'Android', value: 'Android'},
    {name: 'iOS', value: 'iOS'},
    {name: 'Angular', value: 'Angular'},
    {name: 'Node.js', value: 'Node.js'},
    {name: 'WordPress', value: 'WordPress', numberOfLoadingCards: 1},
    {name: 'Wearables', value: 'Wearables', numberOfLoadingCards: 1},
    {name: 'PHP', value: 'PHP', numberOfLoadingCards: 2}
  ];
  filterMobileTitle: string = this.optionsTechnologies[0].name;

  constructor() { }

}

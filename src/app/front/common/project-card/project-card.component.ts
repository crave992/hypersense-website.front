import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProjectModel} from '../../_models/project.model';
import {SettingsService} from '../../_services/settings.service';

@Component({
    selector: 'app-project-card',
    templateUrl: './project-card.component.html',
    styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {
    @Input() item: ProjectModel;
    @Input() fileStorageUrl: string;
    @Output() projectClick: EventEmitter<any> = new EventEmitter();

    imageAbsoluteUrl;

    constructor(private settingsService: SettingsService) {

    }

    ngOnInit() {

        this.settingsService.getFileStorageUrl().then((fileStorage) => {
            this.fileStorageUrl = fileStorage;
            this.getImage(this.item.imageURL);
        });

    }

    clickProject() {
        this.projectClick.emit();
    }

    getImage(src) {
        if (src.indexOf('http') !== 0) {
            this.imageAbsoluteUrl = this.fileStorageUrl + '/' + src;
        } else {
            this.imageAbsoluteUrl = src;
        }
        return this.imageAbsoluteUrl;
    }
}

import {Component, OnInit, Input, Inject, PLATFORM_ID, AfterViewInit} from '@angular/core';
import {TestimonialsService} from '../../_services/crud_services/testimonials.service';
import {Filter} from '../../_models/filter.interface';
import {SettingsService} from '../../_services/settings.service';

@Component({
    selector: 'app-testimonials-home',
    templateUrl: './testimonials-home.component.html',
    styleUrls: ['./testimonials-home.component.scss']
})
export class TestimonialsHomeComponent implements OnInit, AfterViewInit {
    @Input() type: string;
    @Input() item;

    @Input() limit = 3;

    listTestimonials = [];
    filter: Filter = {limit: this.limit};
    base: string;
    fileStorageUrl: string;

    constructor(
        protected settingsService: SettingsService,
        protected service: TestimonialsService,
        @Inject(PLATFORM_ID) private platformId: any
    ) {
        this.base = 'testimonials';
    }

    ngOnInit(): void {

        this.settingsService.getFileStorageUrl().then((fileStorage) => {
            this.fileStorageUrl = fileStorage;
            if (this.item) {
                this.listTestimonials = this.item;
            } else {
                this.service.getTestimonials(this.filter)
                  .subscribe((res: any) => {
                        if (res.error_code && res.error_code.code === '0') {
                            this.listTestimonials = res.response;
                        }
                    },
                    () => {

                    });
            }

        });

        if (typeof this.type === 'undefined') {
            this.type = null;
        }


    }

    ngAfterViewInit(): void {
    }

}

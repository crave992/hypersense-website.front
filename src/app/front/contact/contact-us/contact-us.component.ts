import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { GoogleMapsService } from '../../_services/google-maps.service';

@Component({
    selector: 'app-contact-us',
    templateUrl: './contact-us.component.html',
    styleUrls: ['../../homepage/homepage.component.scss', './contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
    zoom = 16;
    center: google.maps.LatLngLiteral = {lat: 44.4334063, lng: 26.127024};
    mapOptions: google.maps.MapOptions = {
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        zoomControl: false,
    };

    markerOptions: google.maps.MarkerOptions = {
        draggable: false,
        icon: '/assets/images/front/contact/location_icon.svg'
    };
    markerPositions: google.maps.LatLngLiteral[] = [];
    files: File[] = [];
    destroySubject$: Subject<void> = new Subject();

    apiLoaded: Observable<boolean>;
    constructor(
        private googleMapService: GoogleMapsService
    ) {

    }

    ngOnInit(): void {

        this.apiLoaded = this.googleMapService.loadMap();

    }

}

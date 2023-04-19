import {Component, OnInit, Input} from '@angular/core';
import {SettingsService} from '../../_services/settings.service';

@Component({
    selector: 'app-build-solutions',
    templateUrl: './build-solutions.component.html',
    styleUrls: ['./build-solutions.component.scss']
})
export class BuildSolutionsComponent implements OnInit {
    @Input() title = 'We craft innovative solutions';
    @Input() titleDescription: string;
    @Input() bgClass = 'bg-white';
    @Input() hideTop = false;
    @Input() projects: any[];
    @Input() showFooter = true;

    items: any[];
    data = [
        {
            image: 'assets/images/front/projects_banners/img-tinka-lg.jpg',
            imageSrcSet: 'assets/images/front/projects_banners/img-tinka-lg.jpg 1x,' +
                'assets/images/front/projects_banners/img-tinka-lg@2x.jpg 2x,' +
                'assets/images/front/projects_banners/img-tinka-lg@3x.jpg 3x',
            imageMobileSrcSet: 'assets/images/front/projects_banners/img-tinka-sm.jpg 1x,' +
                'assets/images/front/projects_banners/img-tinka-sm@2x.jpg 2x,' +
                'assets/images/front/projects_banners/img-tinka-sm@3x.jpg 3x',
            alt: 'Hero Image Tinka',
            title: 'Flutter development <span class="secondTitle">for Tinka<span>',
            link: '/projects/tinka-fintech-flutter-mobile-app',
            linkText: 'VIEW PROJECT',
            content: 'With the help of Flutter we shipped a Fintech app for the dutch market. ' +
                'Tinka allows users to quickly purchase using spread payments for multiple merchants. ' +
                'At the counter payments are also possible through the barcode generation functionality.\n'
        },
        {
            image: 'src/assets/images/front/projects_banners/img-sara-lg.jpg',
            imageSrcSet: 'assets/images/front/projects_banners/img-sara-lg.jpg 1x,' +
              'assets/images/front/projects_banners/img-sara-lg@2x.jpg 2x,' +
              'assets/images/front/projects_banners/img-sara-lg@3x.jpg 3x',
            imageMobileSrcSet: 'assets/images/front/projects_banners/img-sara-sm.jpg 1x,' +
              'assets/images/front/projects_banners/img-sara-sm@2x.jpg 2x,' +
              'assets/images/front/projects_banners/img-sara-sm@3x.jpg 3x',
            alt: 'Hero Image Sara',
            title: 'Responsive Web Design <span class="secondTitle">for SaraEvents<span>',
            link: '/projects/sara-event-angular-animated-website',
            linkText: 'VIEW PROJECT',
            content: 'We used Angular.js to develop a visually engaging, ' +
              'heavily-animated presentation website for an events company. The site is lightweight, ' +
              'hosted with no-server-required infrastructure, and received the ' +
              'unusually high score of 95 on a recent Google PageSpeed test.'
        },
        {
            image: 'assets/images/front/projects_banners/img-daydate-lg.jpg',
            imageSrcSet: 'assets/images/front/projects_banners/img-daydate-lg.jpg 1x,' +
              'assets/images/front/projects_banners/img-daydate-lg@2x.jpg 2x,' +
              'assets/images/front/projects_banners/img-daydate-lg@3x.jpg 3x',
            imageMobileSrcSet: 'assets/images/front/projects_banners/img-daydate-sm.jpg 1x,' +
              'assets/images/front/projects_banners/img-daydate-sm@2x.jpg 2x,' +
              'assets/images/front/projects_banners/img-daydate-sm@3x.jpg 3x',
            alt: 'Hero Image DayDate',
            title: 'iOS Apps <span class="secondTitle">for DayDate<span>',
            link: '/projects/daydate-online-dating-native-mobile-app',
            linkText: 'VIEW PROJECT',
            content: 'DayDate is a French social networking and dating service. ' +
              'In line with the focus of the app, we worked to create a friendly and appealing user experience. ' +
              'We developed DayDate in SWIFT with the latest native technologies. The backend was developed in Node.js.'
        },
        {
            image: 'assets/images/front/projects_banners/img-lbs-lg.jpg',
            imageSrcSet: 'assets/images/front/projects_banners/img-lbs-lg.jpg 1x,' +
              'assets/images/front/projects_banners/img-lbs-lg@2x.jpg 2x,' +
              'assets/images/front/projects_banners/img-lbs-lg@3x.jpg 3x',
            imageMobileSrcSet: 'assets/images/front/projects_banners/img-lbs-sm.jpg 1x,' +
              'assets/images/front/projects_banners/img-lbs-sm@2x.jpg 2x,' +
              'assets/images/front/projects_banners/img-lbs-sm@3x.jpg 3x',
            alt: 'Hero Image LBS',
            title: 'Location-Based Solutions <span class="secondTitle">for EdgeSuite<span>',
            link: '/projects/ios_and_android_background_location_tracking',
            linkText: 'VIEW PROJECT',
            content: 'We built EdgeSuite, a native iOS and Android app that offers businesses superior GPS tracking. ' +
                'EdgeSuite uses state-of-the-art background tracing techniques to maintain a ' +
                'delicate balance between battery consumption, accuracy, and reliability.'
        }
    ];

    fileStorageUrl: string;
    constructor(
      private settingsService: SettingsService,
    ) {

    }

    ngOnInit() {

        if (!this.projects) {
            this.items = this.data;
        } else {
            this.items = this.projects;
        }

        this.settingsService.getFileStorageUrl().then((fileStorage) => {
            this.fileStorageUrl = fileStorage;
        });


    }


}

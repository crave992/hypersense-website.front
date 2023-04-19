import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-native-mobile-software',
  templateUrl: './native-mobile-software.component.html',
  styleUrls: ['../../homepage/homepage.component.scss', './native-mobile-software.component.scss']
})
export class NativeMobileSoftwareComponent implements OnInit {
  techStackTitle = '<h2>' +
    'Native mobile applications powered by powerful backends' +
    ' </h2>' +
    '<h4>Great native mobile apps require solid, secure and performant backends. We’re developing the backends using the latest,' +
    ' enterprise-ready Node.js frameworks, like IBM backed Loopback.</h4>';

  appTilesTitle = '<h2><small>Apps</small>' +
    ' Developing from MVPs and complex native mobile apps for all business sectors' +
    '</h2>';

  endToEndTitle = '<h2>' +
    '<small>Why HyperSense?</small>' +
    '  End-to-end native mobile app development company' +
    '</h2>' +
    '<h4>We deliver native mobile applications from scratch, letting you focus on your business</h4>';

  listTehnologiesBadges = [
    {name: 'iOS', src: 'assets/images/front/svg/ios.svg' , url: '/portfolio', state:{ technology: 'iOS' }},
    {name: 'Android', src: 'assets/images/front/svg/android.svg' , url: '/portfolio', state:{ technology: 'Android' }},
    {name: 'Flutter', src: 'assets/images/front/svg/flutter-icon.svg', url: '/portfolio', state:{ technology: 'Flutter' }},
    {name: 'Wearables', src: 'assets/images/front/svg/wearables.svg' , url: '/portfolio', state:{ technology: 'Wearables' }}
  ];


  nativeMobile = [
    {
      title: 'Better user experience',
      subtitle: 'No more clunky, hard-to-navigate mobile websites. Native apps provide a better ' +
        'UX that leads users to spend more in your app and exhibit increased loyalty.',
      image: 'assets/images/front/native-mobile/cosmo.png',
      imageSrcSet: 'assets/images/front/native-mobile/cosmo.png 1x, ' +
        'assets/images/front/native-mobile/cosmo@2x.png 2x, ' +
        'assets/images/front/native-mobile/cosmo@3x.png 3x',
      class: false,
      className: ''
    },
    {
      title: 'More functionality',
      subtitle: 'Only native mobile apps can fully access critical device features like location services.',
      image: 'assets/images/front/native-mobile/pc.png',
      imageSrcSet: 'assets/images/front/native-mobile/pc.png 1x, ' +
        'assets/images/front/native-mobile/pc@2x.png 2x, ' +
        'assets/images/front/native-mobile/pc@3x.png 3x',
      class: false,
      className: ''
    },
    {
      title: 'Additional security',
      subtitle: 'Only native mobile apps can employ the sophisticated security systems built into iOS and Android.',
      image: 'assets/images/front/native-mobile/Heli.png',
      imageSrcSet: 'assets/images/front/native-mobile/Heli.png 1x, ' +
        'assets/images/front/native-mobile/Heli@2x.png 2x, ' +
        'assets/images/front/native-mobile/Heli@3x.png 3x',
      class: false,
      className: ''
    },
    {
      title: 'Faster speed',
      subtitle: 'Native apps exploit device operating systems to run faster than slow-loading mobile sites.',
      image: 'assets/images/front/native-mobile/building.png',
      imageSrcSet: 'assets/images/front/native-mobile/building.png 1x, ' +
        'assets/images/front/native-mobile/building@2x.png 2x, ' +
        'assets/images/front/native-mobile/building@3x.png 3x',
      class: false,
      className: ''
    },
    {
      title: 'Low-maintenance',
      subtitle: 'Native apps don’t require as much upkeep. That means less maintenance work on your end.',
      image: 'assets/images/front/native-mobile/eol.png',
      imageSrcSet: 'assets/images/front/native-mobile/eol.png 1x, ' +
        'assets/images/front/native-mobile/eol@2x.png 2x, ' +
        'assets/images/front/native-mobile/eol@3x.png 3x',
      class: false,
      className: 'eol'
    },
    {
      title: 'Offline capabilities',
      subtitle: 'Native apps can run offline, making them more useful when users travel abroad or to remote areas.',
      image: 'assets/images/front/native-mobile/house.png',
      imageSrcSet: 'assets/images/front/native-mobile/house.png 1x, ' +
        'assets/images/front/native-mobile/house@2x.png 2x, ' +
        'assets/images/front/native-mobile/house@3x.png 3x',
      class: false,
      className: ''
    },
    {
      title: 'Easier debugging',
      subtitle: 'Native apps require less time to fix problems, helping to keep everything up and running for your users.',
      image: 'assets/images/front/native-mobile/camera.png',
      imageSrcSet: 'assets/images/front/native-mobile/camera.png 1x, ' +
        'assets/images/front/native-mobile/camera@2x.png 2x, ' +
        'assets/images/front/native-mobile/camera@3x.png 3x',
      class: false,
      className: ''
    },
    {
      title: 'Increased visibility',
      subtitle: 'Native apps are published to Apple and Google’s online stores, offering exposure to milllions of new users.',
      image: 'assets/images/front/native-mobile/shield.png',
      imageSrcSet: 'assets/images/front/native-mobile/shield.png 1x, ' +
        'assets/images/front/native-mobile/shield@2x.png 2x, ' +
        'assets/images/front/native-mobile/shield@3x.png 3x',
      class: true,
      className: ''
    },
  ];

// Discover our native app solutions
  heroHtml = '<div class="headerText"><h1>Discover our ' +
    ' <span class="txt-blue">native app solutions</span></h1></div>' +
    ' <p>Native apps offer users a better experience, increased security, and higher performance compared to mobile websites. If your business depends on mobile users, go native.</p> ' +
    ' <a class="contactLink pointer" id="contactCta" href="/contact">' +
    ' Get in touch <svg width="26px" height="8px" viewBox="0 0 64 22" version="1.1" ' +
    'xmlns="http://www.w3.org/2000/svg" ' +
    'xmlns:xlink="http://www.w3.org/1999/xlink">\n' +
    '    <title>Group 7 Copy 3</title>\n' +
    '    <desc>Created with Sketch.</desc>\n' +
    '    <g id="HS_Website" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">\n' +
    '        <g id="[desktop]-Homepage" transform="translate(-501.000000, -540.000000)" stroke="#74ABFC" stroke-width="4">\n' +
    '            <g id="Group-7-Copy-3" transform="translate(503.000000, 542.000000)">\n' +
    '                <path ' +
    '                   d="M58.6,15.1714286 L49.1275748,15.1714286 C47.542279,15.1714286 46.2571429,13.8862924 46.2571429,12.3009967 L46.2571429,2.82857143" ' +
    '                   id="Rectangle-Copy-14" ' +
    '                   transform="translate(52.428571, 9.000000) rotate(-135.000000) translate(-52.428571, -9.000000) ">' +
    '                   </path>\n' +
    '                <path d="M0.714285714,9.5 L58.7142857,9.5" id="Path"></path>\n' +
    '            </g>\n' +
    '        </g>\n' +
    '    </g>\n' +
    '</svg></a>';


  projects = [
    {
      icon: 'assets/images/front/softwareForAll/logo_daydate.png',
      iconSrcSet: 'assets/images/front/projects/custom/daydate/logo_daydate.png 1x, ' +
        'assets/images/front/projects/custom/daydate/logo_daydate@2x.png 2x, ' +
        'assets/images/front/projects/custom/daydate/logo_daydate@3x.png 3x',
      image: 'assets/images/front/projects/custom/daydate/daydate.png',
      imageSrcSet: 'assets/images/front/projects/custom/daydate/daydate.png 1x, ' +
        'assets/images/front/projects/custom/daydate/daydate@2x.png 2x, ' +
        'assets/images/front/projects/custom/daydate/daydate@3x.png 3x',
      video: null, // 'video/LBS.mp4',
      videoImage: null, // 'video/LBS.jpg',
      tags: ['iOS', 'Node.js', 'Social apps'],
      title: 'Enabling start-ups to fast track their launch by developing mobile app MVPs',
      link: '/portfolio',
      content: 'DayDate is a French online dating service that needed help getting their ' +
        'product on the market in the shortest time frame possible. ' +
        'Working together we developed a native mobile application and a Node.js backend in less than 4 months, ' +
        'a time frame that included multiple reviews and rounds of feedback on the product. You can read our customers’ review by ' +
        '<a href="https://clutch.co/profile/hypersense-software#review-742996" target="_blank" rel="noopener noreferrer">click here</a>.',
      webLink: null,
      iosLink: 'https://apps.apple.com/fr/app/daydate-dating-app/id1396445775?l=en',
      androidLink: null
    }
  ];


  listSolutions = [
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
      content: 'We built EdgeSuite, a native iOS and Android app that offers businesses superior ' +
          'GPS tracking. EdgeSuite uses state-of-the-art background ' +
          'tracing techniques to maintain a delicate balance between battery consumption, accuracy, and reliability.'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

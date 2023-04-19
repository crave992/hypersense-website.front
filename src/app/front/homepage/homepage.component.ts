import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  heroHtml = '<div class="headerText"><h1>Your <span class="txt-blue">trusted partner</span> for' +
    ' custom software solutions.</h1></div>' +
    ' <a class="contactLink pointer" id="contactCta_CTACTA" href="/contact">' +
    ' Get in touch <img alt="arrow right svg" src="./assets/images/front/home/r-arrow.svg"/></a>';

  listTehnologiesBadges = [
    {name: 'iOS', src: 'assets/images/front/svg/ios.svg', url: '/portfolio', state:{ technology: 'iOS' }},
    {name: 'Android', src: 'assets/images/front/svg/android.svg', url: '/portfolio', state:{ technology: 'Android' }},
    {name: 'Flutter', src: 'assets/images/front/svg/flutter-icon.svg', url: '/portfolio', state:{ technology: 'Flutter' }},
    {name: 'Web', src: 'assets/images/front/svg/web.svg', url: '/portfolio', state:{ technology: 'Angular' }},
    {name: 'Cloud', src: 'assets/images/front/svg/cloud.svg', url: '/portfolio', state:{ technology: 'Node.js' }},
    {name: 'Wearables', src: 'assets/images/front/svg/wearables.svg', url: '/portfolio', state:{ technology: 'Wearables' }}
  ];

  listTopPriorities = [
    {
      name: 'E-commerce and M-commerce',
      src: 'assets/images/front/svg/ecommerce.svg'
    },
    {
      name: 'Automotive',
      src: 'assets/images/front/svg/automotive.svg'
    },
    {
      name: 'Financial (Fintech)',
      src: 'assets/images/front/svg/fintech.svg'
    },
    {
      name: 'Business Intelligence & Analytics',
      src: 'assets/images/front/svg/bi_analytics.svg'
    },
    {
      name: 'Healthcare & Fitness',
      src: 'assets/images/front/svg/health.svg'
    },
    {
      name: 'Education',
      src: 'assets/images/front/svg/education.svg'
    },
    {
      name: 'Social media',
      src: 'assets/images/front/svg/social_media.svg'
    },
    {
      name: 'VoIP & Communication',
      src: 'assets/images/front/svg/communication.svg'
    },
    {
      name: 'Image & Video Processing',
      src: 'assets/images/front/svg/video_processing.svg'
    },
    {
      name: 'Mobile Games',
      src: 'assets/images/front/svg/mobile_games.svg'
    },
  ];
  listServices = [
    {
      image: 'assets/images/front/services/web_icon.png',
      srcsetImage: '\n' +
        'assets/images/front/services/web_icon.png,\n' +
        'assets/images/front/services/web_icon@2x.png,\n' +
        'assets/images/front/services/web_icon@3x.png',
      title: 'Web\nDevelopment',
      description: 'From lightweight MVPs to complex web products, we take the technical' +
        ' stuff off your hands and work to bring your ideas to life.',
      href: ''
    },
    {
      image: 'assets/images/front/services/native_icon.png',
      srcsetImage: '\n' +
        'assets/images/front/services/native_icon.png,\n' +
        'assets/images/front/services/native_icon@2x.png,\n' +
        'assets/images/front/services/native_icon@3x.png',
      title: 'Native Mobile\nApp Development',
      description: 'We develop superior mobile applications to delight ' +
        'your users. SWIFT and Kotlin are our languages of choice.'
    },
    {
      image: 'assets/images/front/services/uxui_icon.png',
      srcsetImage: '\n' +
        'assets/images/front/services/uxui_icon.png,\n' +
        'assets/images/front/services/uxui_icon@2x.png,\n' +
        'assets/images/front/services/uxui_icon@3x.png',
      title: 'UI & UX Design',
      description: 'We design user experiences and interfaces for mobile ' +
        'applications and websites that help convert visitors into customers.'
    },
    {
      image: 'assets/images/front/services/DevOps_icon.png',
      srcsetImage: '\n' +
        'assets/images/front/services/DevOps_icon.png,\n' +
        'assets/images/front/services/DevOps_icon@2x.png,\n' +
        'assets/images/front/services/DevOps_icon@3x.png',
      title: 'DevOps',
      description: 'We can help you manage your critical infrastructure' +
        ' on AWS or a variety of other hosting services.'
    },
    {
      image: 'assets/images/front/services/market_icon.png',
      srcsetImage: '\n' +
        'assets/images/front/services/market_icon.png,\n' +
        'assets/images/front/services/market_icon@2x.png,\n' +
        'assets/images/front/services/market_icon@3x.png',
      title: 'E-Commerce &\nMarketplaces',
      description: 'We create streamlined experiences for your ' +
        'users to help them make the best purchasing choices.'
    },
    {
      image: 'assets/images/front/services/intelligence_icon.png',
      srcsetImage: '\n' +
        'assets/images/front/services/intelligence_icon.png,\n' +
        'assets/images/front/services/intelligence_icon@2x.png,\n' +
        'assets/images/front/services/intelligence_icon@3x.png',
      title: 'Business Intelligence\nand Automation',
      description: 'We build fast, actionable, and insights-driven ' +
        'BI apps so you can make decisions with confidence.'

    },
  ];
  listSolutions = [
    {
      image: 'assets/images/front/solutions/img-node-lg.jpg',
      imageSrcSet: 'assets/images/front/solutions/img-node-lg.jpg 1x,' +
        'assets/images/front/solutions/img-node-lg@2x.jpg 2x,' +
        'assets/images/front/solutions/img-node-lg@3x.jpg 3x',
      imageMobileSrcSet: 'assets/images/front/solutions/img-node-sm.jpg 1x,' +
        'assets/images/front/solutions/img-node-sm@2x.jpg 2x,' +
        'assets/images/front/solutions/img-node-sm@3x.jpg 3x',
      alt: 'Node.js Development Solutions',
      title: 'Node.js Development Solutions',
      link: '/node-development',
      linkText: 'NODE.js SOLUTIONS',
      content: 'Many high-profile software companies use Node.js for ' +
        'developing their primary applications. Node.js is fast, secure, ' +
        'scalable, and allows for a unified front-end and back-end codebase. ' +
        'Learn more about how our Node.js solutions can help your business below.'
    },
    {
      image: 'assets/images/front/solutions/img-flutter-lg.jpg',
      imageSrcSet: 'assets/images/front/solutions/img-flutter-lg.jpg 1x,' +
          'assets/images/front/solutions/img-flutter-lg@2x.jpg 2x,' +
          'assets/images/front/solutions/img-flutter-lg@3x.jpg 3x',
      imageMobileSrcSet: 'assets/images/front/solutions/img-flutter-sm.jpg 1x,' +
          'assets/images/front/solutions/img-flutter-sm@2x.jpg 2x,' +
          'assets/images/front/solutions/img-flutter-sm@3x.jpg 3x',
      alt: 'Flutter development solutions',
      title: 'Flutter development solutions',
      link: '/flutter-mobile-app-development',
      linkText: 'Flutter solutions',
      content: 'Flutter opens new doors in the development world. One codebase ' +
          'means less time needed to go to market and validate your idea. ' +
          'Established apps can also benefit from the ease of maintenance of Flutter based mobile apps. '
    },
    {
      image: 'assets/images/front/solutions/img-mobile-lg.jpg',
      imageSrcSet: 'assets/images/front/solutions/img-mobile-lg.jpg 1x,' +
        'assets/images/front/solutions/img-mobile-lg@2x.jpg 2x,' +
        'assets/images/front/solutions/img-mobile-lg@3x.jpg 3x',
      imageMobileSrcSet: 'assets/images/front/solutions/img-mobile-sm.jpg 1x,' +
        'assets/images/front/solutions/img-mobile-sm@2x.jpg 2x,' +
        'assets/images/front/solutions/img-mobile-sm@3x.jpg 3x',
      alt: 'Mobile Apps Solutions',
      title: 'Mobile Apps Solutions',
      link: '/native-mobile-app-development',
      linkText: 'MOBILE APP SOLUTIONS',
      content: 'We offer both native iOS and Android app development, ' +
        'which allows for the most highly optimized user experience, and ' +
        'cross-platform solutions via Flutter, which offers the opportunity to save ' +
        'time and money by building for Android, iOS, and web from a single codebase.'
    },
    {
      image: 'assets/images/front/solutions/img-enterprise-lg.jpg',
      imageSrcSet: 'assets/images/front/solutions/img-enterprise-lg.jpg 1x,' +
        'assets/images/front/solutions/img-enterprise-lg@2x.jpg 2x,' +
        'assets/images/front/solutions/img-enterprise-lg@3x.jpg 3x',
      imageMobileSrcSet: 'assets/images/front/solutions/img-enterprise-sm.jpg 1x,' +
        'assets/images/front/solutions/img-enterprise-sm@2x.jpg 2x,' +
        'assets/images/front/solutions/img-enterprise-sm@3x.jpg 3x',
      alt: 'Custom Enterprise Software Solutions',
      title: 'Custom Enterprise Software Solutions',
      link: '/enterprise-custom-software-development',
      linkText: 'ENTERPRISE SOLUTIONS',
      content: 'Through tailor-made enterprise software solutions, we can help you address ' +
        'your specific business problems, augment your business processes, ' +
        'increase employee productivity, and even develop new and unique lines of business. '
    }
  ];

  bgClass = 'bg-white';

  constructor() { }

  ngOnInit() { }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {
  workWithUs = [
    {
      title: 'In-house staff',
      subtitle: 'Our entire team works under one roof. We work faster and better when we directly interact ' +
        'with our colleagues. We tackle challenges together and every team member benefits from the collective knowledge and ' +
        'skill set of the entire team. ',
      image: 'assets/images/front/aboutUs/staff.png'
    },
    {
      title: 'We are independent',
      subtitle: 'HyperSense is a privately owned company. We are answerable to only one stakeholder, our customer. ' +
        'Our owners are directly involved in all aspects of our work, including client relationships, software architecture ' +
        'and mobile and web development.',
      image: 'assets/images/front/aboutUs/independent.png'
    },
    {
      title: 'Timezone doesn’t matter',
      subtitle: 'We have experience working with customers from every corner of the world. We can make adjustments to ' +
        'compensate for the time zone difference and facilitate the communication and delivery process. Working with us will ' +
        'make you feel ' +
        'like you have a highly experienced software development department in your own office. ',
      image: 'assets/images/front/aboutUs/ill1.png'
    },
    {
      title: 'Located in Bucharest, Romania',
      subtitle: 'Our location, in the capital city, allows us to offer better prices to our customers and select employees ' +
        'from the very vast pool of highly trained  IT experts. We also benefit from the fastest internet in the EU, ' +
        'employees proficient in ' +
        'English, many great IT related universities and many other pro arguments.',
      image: 'assets/images/front/aboutUs/country.png'
    },


  ];
  bgClass = 'bg-white';

  heroHtml = '<div class="headerText"><h1>Our ' +
    ' <span class="txt-blue">custom software solutions</span> help businesses grow</h1></div>';

  testimonialItem = [
    {
      id : 36,
      updatedAt: 1606569435.502,
      createdAt: 1606569435.502,
      sourceURL: 'https://clutch.co/profile/hypersense-software#review-1598477',
      source: 'clutch',
      name:	'Sebastiaan Bekker',
      src: '',
      location: 'Netherlands',
      title: 'Head of Technology',
      company: 'Tinka',
      description: 'The final app successfully took work off customer service staff and appeals to users. The team\'s industry experience with mobile app development was clearly visible through their problem-solving capabilities. They hit all deadlines and regularly over-delivered on tasks.',
      rank:	5
    }];
  constructor() { }

  ngOnInit(): void {
  }

}

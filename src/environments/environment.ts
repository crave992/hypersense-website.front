// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  frontUrl: 'https://dev.hypersense-software.com',
  apiUrl: 'https://dev.hypersense-software.com/',
  // apiUrl: 'http://localhost:3006/',
  bucket: {
    bucket: 'base-project-development',
    url: 'https://s3-eu-west-1.amazonaws.com/base-project-development'
  },
  ga_code: 'UA-36129220-10',
  GOOGLE_MAPS: 'AIzaSyABIPIsJ3Y-YJFlIalcFZ674IhiF9QpTlM',
  cdn: 'https://dev.hypersense-software.com',
  RECAPTCHA_key: '6LeUF-kUAAAAAGz47KsLgdK2w7jTekPtZMrZYMcD',
  imageSizes: [
    {folder: '/mobile/', media: '(max-width: 599.99px)'},
    {folder: '/tablet/', media: '(min-width: 600px) and (max-width: 1279.99px)'},
    {folder: '/web/', media: '(min-width: 1280px)'}
  ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

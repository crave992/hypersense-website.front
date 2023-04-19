/***************************************************************************************************
 * Load `$localize` onto the global scope - used if i18n tags appear in Angular templates.
 */
import '@angular/localize/init';
import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';

const NodeCache = require('node-cache');
const myCache = new NodeCache({ stdTTL: 7 * 24 * 60 * 60, checkperiod: 120 });

if (!process.env.APP_BACKEND) {
process.env.APP_BACKEND = 'https://hypersense-software.com/';
}
if (!process.env.APP_BASEPATH) {
  process.env.APP_BASEPATH = '/';
}

// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)

  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
    providers: [
      { provide: 'APP_BACKEND', useValue: process.env.APP_BACKEND }
    ]
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  server.get('*', (req, res, next) => {
    console.log("redirect");
    console.log(req.headers.host.match(/^www/));
    console.log('https://' + req.headers.host.replace(/^www\./, '') + req.url);
    if (req.headers.host.match(/^www/) !== null ) {
      res.redirect(301, 'https://' + req.headers.host.replace(/^www\./, '') + req.url);
    } else {
      next();
    }
  });

  server.get('/hs007admin/clear', (req, res) => {
    console.log('START /hs007admin/clear');
    console.log( myCache.keys() );
    console.log(myCache.getStats());
    myCache.flushAll();
    res.redirect(301, '/');
    console.log('END /hs007admin/clear');
  });

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {

    if (req.path == '/mobile-app') {
        res.redirect(301, '/native-mobile-app-development');
    }
    if (req.path == '/custom-software') {
        res.redirect(301, '/enterprise-custom-software-development');
    }
     if (req.originalUrl.includes('2018/01/23/equity-funding-platform')) {
       res.redirect(301, '/equity-funding-platform');
     }
     if (req.originalUrl.includes('2017/10/17/mobile-brand-engagement')) {
       res.redirect(301, '/mobile-brand-engagement');
     }
     if (req.originalUrl.includes('2018/01/31/kotlin-programming-language')) {
       res.redirect(301, '/kotlin-programming-language');
     }
     if (req.originalUrl.includes('2018/01/23/top-romania-app-developer')) {
       res.redirect(301, '/top-romania-app-developer');
     }
     if (req.originalUrl.includes('2018/01/23/hypersense-software-kinvey')) {
       res.redirect(301, '/hypersense-software-kinvey');
     }
     if (req.originalUrl.includes('2018/01/23/rethink-the-development-process')) {
       res.redirect(301, '/rethink-the-development-process');
     }
     if (req.originalUrl.includes('2018/01/23/native-hybrid-app-development')) {
       res.redirect(301, '/ative-hybrid-app-development');
     }
     if (req.originalUrl.includes('2018/01/23/outsource-software-development-to-romania')) {
       res.redirect(301, '/outsource-software-development-to-romania');
     }
     if (req.originalUrl.includes('2018/01/23/go-mobile-app-usage-keeps-rising')) {
       res.redirect(301, '/go-mobile-app-usage-keeps-rising');
     }
     if (req.originalUrl.includes('2018/02/08/developing-a-social-media-app')) {
       res.redirect(301, '/developing-a-social-media-app');
     }
     if (req.originalUrl.includes('2018/02/15/aws-athena-parsing-apache-nginx-logs')) {
       res.redirect(301, '/aws-athena-parsing-apache-nginx-logs');
     }
     if (req.originalUrl.includes('2018/02/15/software-development-project')) {
       res.redirect(301, '/software-development-project');
     }
     if (req.originalUrl.includes('2018/03/08/360-degrees-image-capture-on-ios')) {
       res.redirect(301, '/360-degrees-image-capture-on-ios');
     }
     if (req.originalUrl.includes('2018/03/12/smart-glasses')) {
       res.redirect(301, '/smart-glasses');
     }
     if (req.originalUrl.includes('2018/03/12/aws-elastic-beanstalk-nginx-php')) {
       res.redirect(301, '/aws-elastic-beanstalk-nginx-php');
     }
     if (req.originalUrl.includes('2018/03/18/overview-mobile-video-processing')) {
       res.redirect(301, '/overview-mobile-video-processing');
     }
     if (req.originalUrl.includes('2018/03/29/end_to_end_encryption')) {
       res.redirect(301, '/end_to_end_encryption');
     }
     if (req.originalUrl.includes('2018/04/04/aws-beanstalk-ubuntu-16-04-php')) {
       res.redirect(301, '/aws-beanstalk-ubuntu-16-04-php');
     }
     if (req.originalUrl.includes('2018/04/16/magento-ecommerce-app-ui-ux-case-study')) {
       res.redirect(301, '/magento-ecommerce-app-ui-ux-case-study');
     }
     if (req.originalUrl.includes('2018/04/23/mobile-app-animations')) {
       res.redirect(301, '/mobile-app-animations');
     }
     if (req.originalUrl.includes('2018/06/04/build-live-video-streaming-app')) {
       res.redirect(301, '/build-live-video-streaming-app');
     }
     if (req.originalUrl.includes('2018/06/13/tracking-and-analytics')) {
       res.redirect(301, '/tracking-and-analytics');
     }
     if (req.originalUrl.includes('2018/07/13/key-points-location-tracking-mobile-app')) {
       res.redirect(301, '/key-points-location-tracking-mobile-app');
     }
     if (req.originalUrl.includes('2019/04/17/goodfirms-interviews-cto-of-hypersense-software-andrei-neacsu')) {
       res.redirect(301, '/goodfirms-interviews-cto-of-hypersense-software-andrei-neacsu');
     }
     if (req.originalUrl.includes('2019/07/05/the-advantages-of-outsourcing-and-working-with-a-technology-partner')) {
       res.redirect(301, '/the-advantages-of-outsourcing-and-working-with-a-technology-partner');
     }

    const conditions = ['/hs007admin', '/api'];

    myCache.getStats();

    if (!conditions.some(el => req.originalUrl.includes(el))) {
      console.log('yes');
      const entry = myCache.has(req.originalUrl);
      if (entry) {
        console.log('From Cache');
        res.send(myCache.get(req.originalUrl));
      } else {
        console.log('Create Cache');
        res.render('index', { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] }, (err, html) => {
          myCache.set(req.originalUrl, html);
          res.send(html);
        });
      }
    } else {
      console.log('NO Cache Page');
      console.log(req.originalUrl);
      res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
    }

  });



  return server;
}

function run() {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';

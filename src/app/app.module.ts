import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './front/shared/core/core.module';
import { FrontComponent } from './front/layout/front.component';
import { FooterComponent } from './front/layout/footer/footer.component';
import { SettingsService } from './front/_services/settings.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { TokenInterceptor } from './admin/_interceptors/token.interceptor';
import { DatePipe } from '@angular/common';
import { TransferHttpCacheModule } from '@nguniversal/common';
import {RECAPTCHA_LANGUAGE, RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module} from 'ng-recaptcha';
import {environment} from '../environments/environment';
import { GoogleMapsService } from './front/_services/google-maps.service';

@NgModule({
  declarations: [
    AppComponent,
    FrontComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    TransferHttpCacheModule,
    HttpClientModule,
    RecaptchaV3Module,
    HttpClientJsonpModule
  ],
  providers: [
    DatePipe,
    SettingsService,
    GoogleMapsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: RECAPTCHA_LANGUAGE,
      useValue: 'en', // use French language
    },
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.RECAPTCHA_key
    }
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

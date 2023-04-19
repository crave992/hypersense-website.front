import {HttpClient, HttpHeaders, HttpParams,} from '@angular/common/http';
import {Inject, Injectable, PLATFORM_ID, Optional} from '@angular/core';
import {environment} from '../../../../environments/environment';

const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json'
});

@Injectable({
    providedIn: 'root'
})

export class ContactService {
  apiUrl: string = environment.apiUrl;

  constructor(
      @Inject(PLATFORM_ID) private platformId: any,
      @Optional() @Inject('APP_BACKEND') private APP_BACKEND: any,
      protected http: HttpClient
  )
  {
    if (APP_BACKEND !== null) {
      this.apiUrl = APP_BACKEND;
    }
  }

  contactForm( contact, fileUrl = null, fileKey = null): any {

      const fields = {
          name: contact.name,
          email: contact.email,
          message: contact.message,
          captcha: contact.recaptcha,
          phoneNumber: contact.phoneNumber,
          fileURL: fileUrl,
          fileKey
      };

      return this.http.post(this.apiUrl + 'api/v1/contacts/contactForm', fields, {headers});
  }


  getCustomSignedUrl(type, key) {
      const params = new HttpParams()
          .set('type', type)
          .set('key', key);

      return this.http.get(this.apiUrl + 'api/v1/contacts/generateTempSignedPutURL', {params});

  }

  uploadFileAWSS3(fileUploadURL, file): Promise<any> {
      return new Promise<any>((resolve, reject) => {
          const httpOptions = {
              headers: {
                  'Access-Control-Allow-Origin': '*',
                  'Content-Type': file.type,
              }
          };

          this.http.put(fileUploadURL, file, httpOptions)
            .toPromise()
              .then(
                  res => { // Success
                      console.log('Success');
                      console.log(res);
                      return resolve(res);
                  },
                  msg => { // Error
                      console.log('msg');
                      console.log(msg);
                      return reject(msg);
                  }
              );
      });
  }

}

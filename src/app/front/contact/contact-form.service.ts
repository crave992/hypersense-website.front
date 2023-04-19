import {ElementRef, Injectable, OnDestroy, ViewChild} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {environment} from '../../../environments/environment';
import * as uuid from 'uuid';
import { ContactService} from '../_services/crud_services/contact.service';
import { ToastService} from '../shared/core/toasts/toast.service';
import {SettingsService } from '../_services/settings.service';
import {Router} from '@angular/router';
declare let ga: any;
import {ReCaptchaV3Service} from 'ng-recaptcha';

@Injectable({
  providedIn: 'root'
})
export class ContactFormService implements OnDestroy {
  @ViewChild('fileInput', {static: true}) fileElement: ElementRef;
  public baseUrl;
  public imageBucket = 'contact-assets';
  successMessage: ElementRef;

  dragOver = false;
  formSubmitted = false;
  nameCtrl: FormControl;
  emailCtrl: FormControl;
  messageCtrl: FormControl;
  phoneNumberCtrl: FormControl;
  contactForm: FormGroup;
  loading = false;

  file: File = null;
  uuid: string;
  destroySubject$: Subject<void> = new Subject();

  constructor(
    protected contactService: ContactService,
    protected toastService: ToastService,
    protected settingsService: SettingsService,
    protected fb: FormBuilder,
    protected router: Router,
    protected recaptchaV3Service: ReCaptchaV3Service
  ) {

    this.uuid = uuid.v4();

    this.baseUrl = environment.cdn;
    this.nameCtrl = this.fb.control(null, [Validators.required]);
    this.emailCtrl = this.fb.control(null, [Validators.required, Validators.email]);
    this.messageCtrl = this.fb.control(null, [Validators.required]);
    this.phoneNumberCtrl = this.fb.control(null);

    this.contactForm = this.fb.group({
      name: this.nameCtrl,
      email: this.emailCtrl,
      message: this.messageCtrl,
      phoneNumber: this.phoneNumberCtrl
    });
  }

  dragover($event) {
    this.dragOver = true;
    $event.preventDefault();
    $event.stopPropagation();
  }

  dragleave($event) {
    this.dragOver = false;
    $event.preventDefault();
    $event.stopPropagation();
  }


  checkExtensions(file) {

    const type = file.type;

    return !((type === 'image/png') ||
      (type === 'image/jpeg') ||
      (type === 'image/jpg') ||
      (type === 'image/gif') ||
      (type === 'application/pdf') ||
      (type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') ||
      (type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') ||
      (type === 'application/msword') ||
      (type === 'application/vnd.ms-excel') ||
      (type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'));
  }

  checkSize(file): boolean {
    return (file.size / (1024*1024)) > 10;
  }

  async onFileSelected($event) {
    const file: File = ($event.target as HTMLInputElement).files[0];
    try {
      if (file) {
        const checkFile = await this.checkFile(file);
        if (checkFile) {
          this.file = file;
        }
      }
    } catch (e) {
      this.toastService.error(e);
    }
  }

  async checkFile(file) {
    let res = true;
    if (await this.checkExtensions(file)) {
      console.log(file);
      this.toastService.error('We accept only these extensions: png, jpeg, jpg, gif,pdf,doc,xls,xlsx');
      res = false;
    }
    if (await this.checkSize(file)) {
      this.toastService.error('File size exceeded.');
      res = false;
    }

    return res;
  }

  async dropHandler(event) {
    event.preventDefault();
    try {
      if (event.dataTransfer && event.dataTransfer.items && event.dataTransfer.items[0] && event.dataTransfer.items[0].kind === 'file') {
        const file = event.dataTransfer.items[0].getAsFile();
        if ( await this.checkFile(file)) {
          this.file = file;
        }
      } else if (event.dataTransfer.files && event.dataTransfer.files[0]) {
        if (await this.checkFile(event.dataTransfer.files[0])) {
          this.file = event.dataTransfer.files[0];
        }
      }
    } catch (e) {
      this.toastService.error(e);
    }


  }

 async drop($event) {
    this.dragOver = false;
    await this.dropHandler($event);
    $event.preventDefault();
    $event.stopPropagation();
  }

  sendMessage() {

    if (this.contactForm.controls.name.status === 'INVALID') {
      this.nameCtrl.markAsTouched();
    }
    if (this.contactForm.controls.email.status === 'INVALID') {
      this.emailCtrl.markAsTouched();
    }
    if (this.contactForm.controls.message.status === 'INVALID') {
      this.messageCtrl.markAsTouched();
    }

    if (this.contactForm.status === 'INVALID') {
      return;
    }
    this.loading = true;

    this.recaptchaV3Service.execute('importantAction')
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((token) => {
        const formData = this.contactForm.value;
        formData.recaptcha = token;

        if (this.file) {

          const dataT = new Date();
          const key = this.imageBucket + '/' + this.uuid + '/' + dataT.getTime() + '-' + this.file.name;
          const url = this.baseUrl + '/' + key;

          this.contactService.getCustomSignedUrl(this.file.type, key)
            .pipe(takeUntil(this.destroySubject$))
            .subscribe(
              (s3Url: any) => {
                if (s3Url.response && s3Url.response.url) {

                  this.contactService.uploadFileAWSS3(s3Url.response.url, this.file).then(
                    () => {
                      this.contactService.contactForm(formData, url, key)
                        .subscribe((res) => {
                            this.loading = false;
                            if (res && res.error_code && res.error_code.code === '0') {
                              this.formSubmitted = true;
                              this.scroll();
                            } else {
                              this.toastService.error(res.error_code.message);
                            }

                            if (typeof  ga != 'undefined') {
                              ga('send', {
                                hitType: 'event',
                                eventCategory: 'ContactForm',
                                eventAction: 'Submit',
                                eventLabel: formData.email
                              });
                            }

                          },
                          (error) => {
                            this.loading = false;

                            if (typeof  ga != 'undefined') {
                              ga('send', {
                                hitType: 'event',
                                eventCategory: 'ContactForm',
                                eventAction: 'Error',
                                eventLabel: 'Error'
                              });
                            }

                            if (error.statusCode === 403) {
                              this.toastService.error('Security code is not valid.');
                            } else {
                              console.log(error);
                              this.toastService.error('Security code is not valid.');
                            }

                          });
                    });

                } else {
                  this.loading = false;
                  this.toastService.error('Failed to upload the file!');
                }

              });

        }
        else
        {

          this.contactService.contactForm(formData)
            .pipe(takeUntil(this.destroySubject$))
            .subscribe((res) => {
                if (typeof  ga != 'undefined') {
                  ga('send', {
                    hitType: 'event',
                    eventCategory: 'ContactForm',
                    eventAction: 'Submit',
                    eventLabel: formData.email
                  });
                }
                this.loading = false;
                if (res && res.error_code && res.error_code.code === '0') {
                  this.formSubmitted = true;
                  this.scroll();
                } else {
                  this.toastService.error(res.error_code.message);
                }
              },
              (error) => {
                if (typeof  ga != 'undefined') {
                  ga('send', {
                    hitType: 'event',
                    eventCategory: 'ContactForm',
                    eventAction: 'Error',
                    eventLabel: 'Error'
                  });
                }
                this.loading = false;
                if (error.statusCode === 403) {
                  this.toastService.error('Security code is not valid.');
                } else {
                  console.log(error);
                }
              });

        }
      });
  }

  clickEmail(): void {
    if (typeof  ga != 'undefined') {
      ga('send', {
        hitType: 'event',
        eventCategory: 'EmailClick',
        eventAction: 'Click',
        eventLabel: 'email click'
      });
    }
  }

  removeFile() {
    this.file = null;
  }

  resetForm() {
    this.removeFile();
    this.contactForm.reset();
    this.formSubmitted = false;
    this.uuid = uuid.v4();
    this.scroll();
  }

  scroll() {
    if (this.successMessage) {
      this.successMessage.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  ngOnDestroy() {
    this.destroySubject$.next();
    this.destroySubject$.unsubscribe();
  }

}

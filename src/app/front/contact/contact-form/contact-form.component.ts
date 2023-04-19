import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ContactService} from '../../_services/crud_services/contact.service';
import {ToastService} from '../../shared/core/toasts/toast.service';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {ContactFormService} from '../contact-form.service';
import {SettingsService} from '../../_services/settings.service';
import {ReCaptchaV3Service} from 'ng-recaptcha';

@Component({
    selector: 'app-contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent extends ContactFormService implements OnInit {
  @Input() bgClass = 'bg-white';
  @ViewChild('successMessage', {static: false}) successMessage: ElementRef;
  constructor(
    protected contactService: ContactService,
    protected toastService: ToastService,
    protected settingsService: SettingsService,
    protected fb: FormBuilder,
    protected router: Router,
    protected recaptchaV3Service: ReCaptchaV3Service
  ) {
    super(contactService, toastService, settingsService, fb, router,recaptchaV3Service);
  }

  ngOnInit(): void {

  }

}

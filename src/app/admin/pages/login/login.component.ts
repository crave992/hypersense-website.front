import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../_services/auth.service';
import {Router} from '@angular/router';
import {ToastService} from '../../../front/shared/core/toasts/toast.service';
import {takeUntil} from 'rxjs/operators';
import {ReCaptchaV3Service} from 'ng-recaptcha';
import {Subject} from 'rxjs';

@Component({
    selector: 'app-admin-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy {
    public form: FormGroup;
    private submitted = false;

   private destroySubject$: Subject<void> = new Subject();

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private toastr: ToastService,
        protected recaptchaV3Service: ReCaptchaV3Service
    ) {

    }

    ngOnInit() {
        this.form = this.fb.group({
            email: [null, Validators.compose([Validators.required])],
            password: [null, Validators.compose([Validators.required])]
        });
    }


    get f() {
        return this.form.controls;
    }


    onSubmit() {
        this.submitted = true;
        if (this.form.invalid) {
            return;
        }

        this.recaptchaV3Service.execute('importantAction')
          .pipe(takeUntil(this.destroySubject$))
          .subscribe((token) => {

              const formData = this.form.value;
              formData.captcha = token;

              this.authService.adminLogin(formData)
                .subscribe(
                  (data: any) => {
                      if (data.response) {
                          this.router.navigate(['/hs007admin/dashboard']);
                      } else {
                          this.toastr.error(data.error_code.message);
                      }
                  }
                );
          });
    }


    ngOnDestroy() {
        this.destroySubject$.next();
        this.destroySubject$.unsubscribe();
    }

}

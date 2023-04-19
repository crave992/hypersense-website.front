import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../_services/auth.service';

@Injectable({providedIn: 'root'})
export class AdminGuard implements CanActivate {

    constructor(private router: Router,
                private authService: AuthService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (state.url.indexOf('login') > -1) {
            if (!this.authService.adminAuthenticated()) {
                return true;
            }

            // not logged in so redirect to login page with the return url
            this.router.navigate(['/hs007admin/dashboard']);
            return false;
        } else {
            if (this.authService.adminAuthenticated()) {
                return true;
            }

            // not logged in so redirect to login page with the return url
            this.router.navigate(['/hs007admin/login']);
            return false;
        }

    }


}

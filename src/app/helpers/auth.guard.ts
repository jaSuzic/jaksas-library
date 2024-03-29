import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | boolean
        | UrlTree
        | Observable<boolean | import("@angular/router").UrlTree>
        | Promise<boolean | import("@angular/router").UrlTree> {
        const isAuth = this.authService.getIsAuth();
        if (!isAuth) {
            this.router.navigate(["/login"]);
        }
        return isAuth;
    }
}

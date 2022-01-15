import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import jwt_decode from "jwt-decode";

import { User } from './../models/user.model';

const BACKEND_URL = environment.apiUrl + "/users";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    private token: string | null;
    private tokenStatus = new BehaviorSubject<string[]>([]);
    private isAuthObservable = new BehaviorSubject(false);
    private isAuth = false;
    private tokenTimer: any;
    private user: User;
    constructor(private http: HttpClient, private router: Router) { }

    loginUser(email: string, password: string) {
        return this.http.post(BACKEND_URL + "/login", {
            email: email,
            password: password
        });
    }

    processLogin(data: any) {
        this.token = data.token;
        if (this.token) {
            const decodedToken: any = jwt_decode(data.token);
            const expiresInDuration = decodedToken['exp'] - decodedToken['iat'];
            this.tokenTimer = setTimeout(() => {
                this.logout();
            }, expiresInDuration * 1000);
            this.tokenStatus.next([this.token]);
            this.isAuth = true;
            this.user = decodedToken.userForSign;
            const now = new Date();
            const expDate = new Date(decodedToken['exp'] * 1000);
            this.saveAuthData(this.token, expDate, this.user);
            this.isAuthObservable.next(true);
            this.router.navigate(["/"]);
        }
    }

    autoAuthUser() {
        const authInfo = this.getAuthData();
        if (!authInfo) return;
        const now = new Date();
        const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
        if (expiresIn > 0) {
            this.token = authInfo.token;
            this.user = JSON.parse(authInfo.user);
            this.isAuth = true;
            this.isAuthObservable.next(true);
            this.tokenTimer = setTimeout(() => {
                this.logout();
            }, expiresIn);
            this.tokenStatus.next([this.token]);
        }
    }

    getIsAuth() {
        return this.isAuth;
    }

    getToken() {
        return this.token;
    }

    getTokenStatus() {
        return this.tokenStatus.asObservable();
    }

    getIsAuthObs() {
        return this.isAuthObservable;
    }

    getUser() {
        return this.user;
    }

    logout() {
        this.token = null;
        this.tokenStatus.next([]);
        this.isAuth = false;
        this.isAuthObservable.next(false);
        this.clearAuthData();
        this.router.navigate(["/login"]);
        clearTimeout(this.tokenTimer);
    }

    private saveAuthData(token: string, expirationDate: Date, user: User) {
        localStorage.setItem("token", token);
        localStorage.setItem("expiration", expirationDate.toISOString());
        localStorage.setItem("user", JSON.stringify(user));
    }

    private clearAuthData() {
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
        localStorage.removeItem("user");
    }

    private getAuthData() {
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem("expiration");
        const user = localStorage.getItem("user");
        if (!token || !expirationDate || !user) {
            return null;
        }
        return {
            token: token,
            expirationDate: new Date(expirationDate),
            user: user
        };
    }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

import { User } from './../models/user.model';

const BACKEND_URL = environment.apiUrl + "/user";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private token: string;
  private tokenStatus = new BehaviorSubject([]);
  private isAuthObservable = new BehaviorSubject(false);
  private isAuth = false;
  private tokenTimer: any;
  private user: User;
  constructor(private http: HttpClient, private router: Router) {}

  createUser(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    position: string,
    image?: File
  ) {
    const newUser = new FormData();
    newUser.append("email", email);
    newUser.append("password", password);
    newUser.append("firstName", firstName);
    newUser.append("lastName", lastName);
    newUser.append("position", position);
    if (image) {
      newUser.append("image", image, email);
    }
    return this.http.post(BACKEND_URL + "/register", newUser);
  }

  loginUser(email: string, password: string) {
    this.http
      .post<{ token: string; message: string; expiresIn: number; user: User }>(
        BACKEND_URL + "/login",
        {
          email: email,
          password: password
        }
      )
      .subscribe(response => {
        this.token = response.token;
        if (this.token) {
          const expiresInDuration = response.expiresIn;
          this.tokenTimer = setTimeout(() => {
            this.logout();
          }, expiresInDuration * 1000);
          this.tokenStatus.next([]);
          this.isAuth = true;
          this.user = response.user;
          const now = new Date();
          const expDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(this.token, expDate, this.user);
          this.isAuthObservable.next(true);
          this.router.navigate(["/"]);
        }
      });
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
    this.tokenStatus.next([false]);
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
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      user: user
    };
  }
}

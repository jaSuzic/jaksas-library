import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl + "/user";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private token: string;
  private tokenStatus = new BehaviorSubject([]);
  constructor(private http: HttpClient) {}

  createUser(email: string, password: string) {
    this.http
      .post(BACKEND_URL + "/register", { email: email, password: password })
      .subscribe(response => {
        console.log(response);
      });
  }

  loginUser(email: string, password: string) {
    this.http
      .post<{ token: string; message: string }>(BACKEND_URL + "/login", {
        email: email,
        password: password
      })
      .subscribe(response => {
        this.token = response.token;
        this.tokenStatus.next([]);
      });
  }

  getToken() {
    return this.token;
  }

  getTokenStatus() {
    return this.tokenStatus.asObservable();
  }
}

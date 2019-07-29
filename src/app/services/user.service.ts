import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl + "/user";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}

  private userStatus = new BehaviorSubject([]);

  changePass(email: string, oldPass: string, newPass: string) {
    return this.http.post<{ message: string }>(BACKEND_URL + "/updatePass", {
      email: email,
      oldPass: oldPass,
      newPass: newPass
    });
  }

  changeImage(id: string, image: File) {
    const newUserImage = new FormData();
    newUserImage.append("id", id);
    newUserImage.append("image", image, id);
    return this.http.patch(BACKEND_URL + "/updateImage", newUserImage);
  }

  getUsersExcept(id: string) {
    return this.http.post(BACKEND_URL + "/getUsers", { id: id });
  }

  deleteUser(id: string) {
    return this.http.delete(BACKEND_URL + "/" + id);
  }

  usersUpdated() {
    this.userStatus.next([]);
  }

  getUserStatus() {
    return this.userStatus.asObservable();
  }
}

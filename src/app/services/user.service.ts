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

  updateUser(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    position: string,
    image: File
  ) {
    const newUser = new FormData();

    newUser.append("id", id);
    newUser.append("firstName", firstName);
    newUser.append("lastName", lastName);
    newUser.append("email", email);
    newUser.append("position", position);
    newUser.append("image", image);
    return this.http.put(BACKEND_URL + "/updateUser", newUser);
  }

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
}

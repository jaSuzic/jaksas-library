import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl + "/users";

@Injectable({
    providedIn: "root"
})
export class UserService {
    constructor(private http: HttpClient, private router: Router) { }

    private userStatus = new BehaviorSubject([]);

    changePass(email: string, oldPass: string, newPass: string) {
        return this.http.post<{ message: string }>(BACKEND_URL + "/updatePass", {
            email: email,
            oldPass: oldPass,
            newPass: newPass
        });
    }

    changeImage(email: string, image: File) {
        const newUserImage = new FormData();
        newUserImage.append("email", email);
        newUserImage.append("image", image);
        return this.http.patch(BACKEND_URL + "/updateImage", newUserImage);
    }

    getUsersExcept(email: string) {
        return this.http.post(BACKEND_URL + "/getUsers", { email: email });
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
        image: File | string
    ) {
        const newUser = new FormData();

        newUser.append("firstName", firstName);
        newUser.append("lastName", lastName);
        newUser.append("email", email);
        newUser.append("position", position);
        if (image) {
            newUser.append("image", image);
        }
        return this.http.patch(BACKEND_URL + "/updateUser", newUser);
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
            newUser.append("image", image);
        }
        return this.http.post(BACKEND_URL + "/register", newUser);
    }
}

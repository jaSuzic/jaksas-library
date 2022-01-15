import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Member } from './../models/member.model';

const BACKEND_URL = environment.apiUrl + "/members";

@Injectable({
    providedIn: "root"
})
export class MemberService {
    constructor(private http: HttpClient, private router: Router) { }

    private membersStatus = new BehaviorSubject([]);

    getMembers() {
        return this.http.get<{ message: string; members: Member[]; count: number }>(
            BACKEND_URL
        );
    }

    saveMember(firstName: string, lastName: string, birthDate: Date) {
        const newMember = {
            firstName,
            lastName,
            birthDate
        };
        return this.http.post<{ message: string }>(BACKEND_URL, newMember);
    }

    deleteMember(id: string) {
        return this.http.delete(BACKEND_URL + "/" + id);
    }

    updateMember(
        id: string,
        firstName: string,
        lastName: string,
        birthDate: Date
    ) {
        return this.http.patch(BACKEND_URL + "/" + id, {
            firstName,
            lastName,
            birthDate
        });
    }

    membersUpdated() {
        this.membersStatus.next([]);
    }

    getMembersStatus() {
        return this.membersStatus.asObservable();
    }
}

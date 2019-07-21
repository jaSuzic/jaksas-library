import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl + "/rents";

@Injectable({
  providedIn: "root"
})
export class RentService {
  constructor(private http: HttpClient, private router: Router) {}

  private rentStatus = new BehaviorSubject([]);

  // response type for rents has to be any[] because of populate
  getRents() {
    return this.http.get<{ message: string; rents: any[]; count: number }>(
      BACKEND_URL
    );
  }

  saveRent(idMember: string, idBook: string, rentDate: Date) {
    const newRent = {
      idMember: idMember,
      idBook: idBook,
      rentDate: rentDate,
      returnDate: null
    };
    return this.http.post<{ message: string }>(BACKEND_URL, newRent);
  }

  deleteRent(id: string) {
    return this.http.delete(BACKEND_URL + "/" + id);
  }

  updateRent(
    id: string,
    idMember: string,
    idBook: string,
    rentDate: Date,
    returnDate: Date
  ) {
    return this.http.put(BACKEND_URL + "/" + id, {
      idMember: idMember,
      idBook: idBook,
      rentDate: rentDate,
      returnDate: returnDate
    });
  }

  rentUpdated() {
    this.rentStatus.next([]);
  }

  getRentStatus() {
    return this.rentStatus.asObservable();
  }
}

import { AuthService } from './services/auth.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    opened: boolean;
    sub: Subscription;
    isAuth = false;
    @ViewChild(MatSidenav, { static: false }) sidenav: MatSidenav;

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
        this.authService.autoAuthUser();
        this.sub = this.authService.getIsAuthObs().subscribe(
            res => {
                this.isAuth = res;
            },
            err => {
                console.log(err);
            }
        );
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    closeSidenav() {
        this.sidenav.close();
    }
}

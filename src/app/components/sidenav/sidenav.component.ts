import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { User } from './../../models/user.model';
import { AuthService } from './../../services/auth.service';
@Component({
    selector: "app-sidenav",
    templateUrl: "./sidenav.component.html",
    styleUrls: ["./sidenav.component.css"]
})
export class SidenavComponent implements OnInit {
    @Output() clicked = new EventEmitter();
    user: User;

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.user = this.authService.getUser()
    }

    onClick() {
        this.clicked.emit(true);
    }

    isAdmin() {
        return this.user.position === 'admin' || this.user.position === 'super-admin'
    }
}

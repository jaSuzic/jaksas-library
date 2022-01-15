import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
@Component({
    selector: 'app-admin-panel',
    templateUrl: './admin-panel.component.html',
    styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
    user: User;
    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.user = this.authService.getUser();
    }
}

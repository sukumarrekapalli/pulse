import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { DataService } from '../../services/data.service';
import { AuthenticationService } from '../../services/authentication.service';

import { User } from '../../models/user.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

    @BlockUI() blockUI: NgBlockUI;

    public orgs: any;
    public orgDetails: any;
    public orgErrorMessage:any;
    public currentUser: User;

    constructor(
        private dataService: DataService,
        private authService: AuthenticationService
    ) {
        this.blockUI.start('Loading...'); // Start blocking
        this.orgs = [];
    }

    ngOnInit() {

        this.currentUser = this.authService.currentUserValue;
        this.blockUI.stop();
    
    }

    logout() {
        this.authService.logout();
    }
}

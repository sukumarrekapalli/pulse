import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { DataService } from '../../../services/data.service';
import { AuthenticationService } from '../../../services/authentication.service';

import { User } from '../../../models/user.model';

@Component({
  selector: 'app-lmain',
  templateUrl: './lmain.component.html',
  styleUrls: ['./lmain.component.css']
})
export class LmainComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

    public orgs: any;
    public orgDetails: any;
    public orgErrorMessage:any;
    public currentUser: User;
    public slideConfig: any;

    constructor(
        private dataService: DataService,
        private authService: AuthenticationService
    ) {
        this.blockUI.start('Loading...'); // Start blocking
        this.orgs = [];
        
        this.slideConfig = { 
          slidesToShow: 4,
          slidesToScroll: 1,
          dots: false,
          arrows: true,
          autoplay: true,
          mobileFirst: true,
          speed: 800,
          autoplaySpeed: 3000,
          infinite: true,
          cssEase: 'linear'

      };
    }
 
    ngOnInit() {

        this.currentUser = this.authService.currentUserValue;
        // /console.log(this.currentUser);
        this.dataService.getLeaderProjects(this.currentUser.org_id).subscribe(
            data => {
                 this.orgs = data; 
                 this.blockUI.stop();
            },
            err => {
              console.log("inside org list error", JSON.stringify(err.message));
              alert(JSON.stringify(err.message));
              this.blockUI.stop();
        })
    
    }

}

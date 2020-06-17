import { Component, OnInit, Renderer } from '@angular/core';

import { User } from '../../../models/user.model';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public currentUser: User;
  public showUserPanel: any;

  constructor(
    private authService: AuthenticationService,
    private renderer: Renderer 
  ) { 
    
    //this.renderer.listenGlobal('document', 'click', (event) => {
      // Do something with 'event'
    //  if(!$(event.target).hasClass('userPanelBtn') ) {
    //    this.showUserPanel = false;
    //  }
   // });
       
  }

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
  }
  
  logout() {
      this.authService.logout();
  }

}

import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Title } from '@angular/platform-browser';

import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class AprojectsComponent implements OnInit {

    @BlockUI() blockUI: NgBlockUI;

    public projects: any;

    constructor(
        private dataService: DataService,
        private title: Title
    ) {
        this.blockUI.start('Loading...'); // Start blocking
        this.projects = [];
        
        this.title.setTitle('Projects List');
    }

    ngOnInit() {
    
        this.dataService.getProjects().subscribe(
            data => {
                 this.projects = data; 
                 this.blockUI.stop();
            },
            err => {
              console.log("inside projects list error", JSON.stringify(err.message));
              alert(JSON.stringify(err.message));
              this.blockUI.stop();
        })
    
    }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { DataService } from '../../services/data.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    @BlockUI() blockUI: NgBlockUI;
    @ViewChild('auto') auto;

    public registerCode: any;
    public project: any;
    public user: any;
    public errorMessage: any;
    public errors: any;
    public registerResponse: any;
    public projectValid: any;
    public currentYear: any;

    constructor(
        private dataService: DataService,
        private route: ActivatedRoute,
        private title: Title
    )  { 
        this.blockUI.start('Loading...'); // Start blocking
        this.registerCode = this.route.snapshot.params.registerCode;
        this.project = {};        
        this.user = {};        
        this.errorMessage = '';      
        this.errors = [];        
        this.registerResponse = '';
        this.projectValid = true;
        this.currentYear = (new Date()).getFullYear();
    }

    ngOnInit() {
        if(this.registerCode !== '' && this.registerCode !== undefined) {
            this.dataService.getRegisterAccess(this.registerCode).subscribe(
                data => {
                    if(data.project !== undefined && data.project !== '') {
                        this.project = data.project;
                        this.title.setTitle(this.project.project_title);
                        this.user = new User();
                        this.user.generation = '-';
                    }
                    else {
                        this.projectValid = false;
                        this.errorMessage = JSON.stringify(data.message);
                    }
                    this.blockUI.stop();
                },
                err => {
                    this.projectValid = false;
                  this.errorMessage = JSON.stringify(err.message);
                  console.log("inside Registration error", JSON.stringify(err.message));
                  this.blockUI.stop();
                }
            );
        }
        else {
            this.projectValid = false;
        }
    }


    formSubmit() {
        this.errors = []; 
        if(this.user.first_name === '') { 
            this.errors[0] = 'First Name is empty';
        }
        else {
            var re = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
            if(re.test(String(this.user.first_name)) === false) {
                this.errors[0] = 'First Name is not valid';
            }
        }
        if(this.user.last_name === '') { 
            this.errors[1] = 'Last Name is empty';
        }
        else {
            var re = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
            if(re.test(String(this.user.last_name)) === false) {
                this.errors[1] = 'Last Name is not valid';
            }
        }
        if(this.user.company_email === '') { 
            this.errors[2] = 'Company Email is empty';
        }
        else {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(re.test(String(this.user.company_email).toLowerCase()) === false) {
                this.errors[2] = 'Company Email is not valid';
            }
        }

        if(this.user.linkedin_profile === '') { 
            this.errors[3] = 'LinkedIn Profile is empty';
        }
        if(this.user.org_tenure === '') { 
            this.errors[4] = 'Number of Years with Company is empty';
        }
        if(this.user.generation === '' || this.user.generation === '-') { 
            this.errors[5] = 'Generation is empty';
        }
        if(this.user.culture_definition === '') { 
            this.errors[6] = 'Choose one of the following';
        }

        if(this.errors.length === 0) {
            this.user.project_id = this.project.id;
            this.blockUI.start('Submitting...'); // Start blocking

            this.dataService.registerUser(this.user).subscribe(
                data => {
                    if(data.code === 200) {
                        if(data.message === 'Success') { this.registerResponse = 'success'; }
                        else if(data.message === 'already registered') { this.registerResponse = 'already'; }
                        
                        this.user = data.user;
                        
                    }
                    else {
                        this.registerResponse = 'error';
                    }
                    this.blockUI.stop();
                },
                err => {
                this.registerResponse = 'error';
                  this.errorMessage = JSON.stringify(err.message);
                  console.log("inside Registration error", JSON.stringify(err.message));
                  this.blockUI.stop();
                }
            );
        }

    }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ActivatedRoute } from '@angular/router';

import { PeoplespeakComponent } from '../peoplespeak/peoplespeak.component';
import { LeadershippulseComponent } from '../leadershippulse/leadershippulse.component';
import { ValueassessmentComponent } from '../valueassessment/valueassessment.component';
import { InpComponent } from '../inp/inp.component';
import { BnsComponent } from '../bns/bns.component';

import { DataService } from '../../services/data.service';
import { AuthenticationService } from '../../services/authentication.service';

import { User } from '../../models/user.model';

declare var require: any;
var Highcharts = require('highcharts/highmaps.js'),
mapGeoJSON = require('@highcharts/map-collection/custom/world.geo.json');

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  entryComponents: [LeadershippulseComponent]
})
export class DashboardComponent implements OnInit {
    @ViewChild('pskComponent') pskComponent:PeoplespeakComponent;
    @ViewChild('lspComponent') lspComponent:LeadershippulseComponent;
    @ViewChild('cvaComponent') cvaComponent:ValueassessmentComponent;
    @ViewChild('inpComponent') inpComponent:InpComponent;
    @ViewChild('bnsComponent') bnsComponent:BnsComponent;

    @BlockUI() blockUI: NgBlockUI;
    public projectId: any;
    public project: any;
    public org: any;
    public currentUser: User;
    public currentDash: any;
    public slideSMConfig: any;
    public slideNUConfig: any;
    public kpi_titles: any;
    public projObj: any;
    
  constructor(
        private dataService: DataService,
        private route: ActivatedRoute,
        private authService: AuthenticationService
    ) { 
    this.projectId = this.route.snapshot.params.projectId;
    this.blockUI.start('Loading...'); // Start blocking
    this.currentDash = '';
    this.kpi_titles = {
        'psk': 'People Speak',
        'lsp': 'Leadership Pulse',
        'cva': 'Value Assessment',
        'adq': 'Adaptability Quotient',
        'cst': 'Company Sentiment',
        'inp': 'In Pressions',
        'bns': 'Business Need Scorecard'
    }
    this.slideSMConfig = { 
        centerMode:true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
        autoplay: true,
        mobileFirst:true,
        speed: 800,
        autoplaySpeed: 3000,
        infinite: true,
        cssEase: 'linear',
        variableWidth: true,
        variableHeight: true

    };
    this.slideNUConfig = {  
        centerMode:true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
        autoplay:true,
        mobileFirst:true,
        speed: 800,
        autoplaySpeed: 3000,
        infinite: true,
        cssEase: 'linear',
        variableWidth: true,
        variableHeight: true

    };
    this.projObj = {

    }
  }

  openTab(kpi, cps) {
    this.currentDash = kpi.kpi_code;
    this.projObj.currentTab = kpi.kpi_code;
    
    if(kpi.kpi_code === 'lsp') {
        cps[1].initStuff();
        //this.lspComponent.opened();
    }
    else if(kpi.kpi_code === 'inp') {
        cps[3].initStuff();
    }
    else if(kpi.kpi_code === 'bns') {
        cps[4].initStuff();
    }
  }
    

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
    this.dataService.getLeaderProject(this.projectId, this.currentUser.email).subscribe(
        data => {
            this.project = data.project;

            if(this.project.ces !== undefined && this.project.ces.kpis !== undefined) {
                for(let kpi of this.project.ces.kpis) {
                    if(kpi.title === undefined || kpi.title === '') {
                        kpi.title = this.kpi_titles[kpi.kpi_code];
                    }
                }
            }
            
            for(let qobj of this.project.org.footPrints) {
               qobj.lat = parseFloat(qobj.lat);
               qobj.lon = parseFloat(qobj.lon);
            };

            this.loadMap(this.project.org.footPrints);

           //this.currentDash = this.project.ces.kpis[5].kpi_code;

            this.projObj.id = this.project.id;
            this.projObj.title = this.project.title;
            this.projObj.psk = this.project.psk;
            this.projObj.lsp = this.project.lsp;
            this.projObj.ilsp = this.project.ilsp;
            this.projObj.competencies = this.project.competencies;
            this.projObj.icompetencies = this.project.icompetencies;
            this.projObj.participants = this.project.participants;
            this.projObj.myparticipant = this.project.myparticipant;
            this.projObj.surveys = this.project.surveys;
            this.projObj.survey_questions = this.project.survey_questions;
            this.projObj.survey_answers = this.project.survey_answers;
            this.projObj.values = this.project.values;
            this.projObj.lsreport = this.project.lsreport;
            this.projObj.currentTab = '';
            this.blockUI.stop();
        },
        err => {
            console.log("inside org details error", JSON.stringify(err.message));
            alert(JSON.stringify(err.message));
            this.blockUI.stop();
    });
    
  }

  loadMap(data) {
    Highcharts.mapChart('dlp-map', 
        {
            chart: {
                backgroundColor: 'transparent',
                margin: 0
            },
            title: {
                text: null
            },
            credits: { enabled: false },
            mapNavigation: {
                enabled: false
            },
            legend: {
                enabled: false,
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'top'
            },

            series: [
                {
                    name: 'Countries',
                    mapData: mapGeoJSON,
                    nullColor: '#d9dadc',
                    enableMouseTracking: false
                },
                {
                    type: 'mappoint',
                    name: 'Global Footprint',
                    joinBy: ['iso-a2', 'code'],
                    color:'#f4373b',
                    dataLabels: {
                        enabled: false
                    },
                    tooltip: {
                        pointFormat: '{point.name}: {point.footPrint}'
                    },
                    data: data
                }
            ]
        }
    );

  }

}

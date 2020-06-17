import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ActivatedRoute } from '@angular/router';

import { PeoplespeakcultureComponent } from '../peoplespeakculture/peoplespeakculture.component';
import { LeadershippulsecultureComponent } from '../leadershippulseculture/leadershippulseculture.component';
import { ValueassessmentComponent } from '../valueassessment/valueassessment.component';
import { ValueassessmentempComponent} from '../valueassessmentemp/valueassessmentemp.component';
import { ValueassessmentcultureComponent } from '../valueassessmentculture/valueassessmentculture.component';

import { CompsentimentcultureComponent } from '../compsentimentculture/compsentimentculture.component';

import { AdaptqcultureComponent } from '../adaptqculture/adaptqculture.component';

import { InpComponent } from '../inp/inp.component';

import  { BnscultureComponent } from '../bnsculture/bnsculture.component';

import { DataService } from '../../services/data.service';
import { AuthenticationService } from '../../services/authentication.service';

import { User } from '../../models/user.model';
import { AgmCoreModule } from '@agm/core';

import { from } from 'rxjs';
import { pluck, groupBy } from 'rxjs/operators';
import Swal from 'sweetalert2';


declare var ldBar: any;
declare var $: any;
declare var require: any;

var Highcharts = require('highcharts/highmaps.js'),
Highcharts1 = require('highcharts/highcharts.js'),
mapGeoInJSON = require('@highcharts/map-collection/countries/in/in-all.geo.json'),
mapGeoJSON = require('@highcharts/map-collection/custom/world.geo.json');
$.support.touch = 'ontouchend' in document;
@Component({
    selector: 'app-culturegenome',
    templateUrl: './culturegenome.component.html',
    styleUrls: ['./culturegenome.component.css']
})
export class CulturegenomeComponent implements OnInit {
    @ViewChild('divClick') divClick: ElementRef;

    @ViewChild('pskcComponent') pskcComponent:PeoplespeakcultureComponent;
    @ViewChild('lspComponent') lspComponent:LeadershippulsecultureComponent;
    @ViewChild('cvaComponent') cvaComponent:ValueassessmentComponent;
    @ViewChild('evaComponent') evaComponent:ValueassessmentempComponent;
    @ViewChild('cvacComponent') cvacComponent:ValueassessmentcultureComponent;
    @ViewChild('inpComponent') inpComponent:InpComponent;
    @ViewChild('bnsComponent') bnsComponent:BnscultureComponent; 
    @ViewChild('cstcComponent') cstcComponent:CompsentimentcultureComponent; 
    @ViewChild('adqcComponent') adqcComponent:AdaptqcultureComponent;

    @ViewChild('myDiv') myDiv: ElementRef<HTMLElement>;


    @BlockUI() blockUI: NgBlockUI;
    public projectId: any;
    public project: any;
    public org: any;
    public currentUser: User;
    public currentDash: any;
    public slideSMConfig: any;
    public slideNUConfig: any;
    public kpi_titles: any;
    public kpi_short_titles: any;
    public projObj: any;

    public ivop: any;
    public ivop1: any;
    public ivop2: any;
    public ivop3: any; 
    public ivls: any;
    public ivls1: any;
    public ivls_op1:any;
    public ivls_op2: any;
    public ivls_op3:any;
    public knobConfig: any;
    public knobValues: any; 
    public data1: any;
    public ccqscrore: any;
    public custEmpTab: any;
    public categoriesTab: any;
    public selectedCategoryTab: any;
    public selectedCustCategoryTab: any;
    public empcategoriesTab: any;
    public cvls: any; 
    public empcvls: any;
    public filter_array: any; 
    public chartdata: any;
    public allchartresponse: any;
    public cust_dropdn: any;
    public emp_dropdn: any;
    public empdem1: any;
    public empdem2: any;
    public selectedNetwork: any;
    public selectedModule: any;
    public selectedBranch: any;
    public selectedCategoryDropDown1: any;
    public selectedCategoryDropDown2: any;
    public selectedCustCategoryDropDown1: any;
    public selectedCustCategoryDropDown2: any;
    public showmianscreen: boolean;
    public countrydata: any;
    constructor(
        private dataService: DataService,
        private route: ActivatedRoute,
        private authService: AuthenticationService,
        element: ElementRef
        ) {

        // console.log(element.nativeElement);

        this.projectId = this.route.snapshot.params.projectId;
        this.blockUI.start('Loading...'); // Start blocking
        this.currentDash = '';
        this.kpi_titles = {
            'psk': 'People Speak',
            'pskc': 'People Speak',
            'lsp': 'Leadership Pulse',
            'cva': 'Value Assessment',
            // 'eva': 'Value Assessment (Employee)',
            'adq': 'Adaptability Quotient',
            'cst': 'Influencer Networks',
            'inp': 'In Pressions',
            'bns': 'Culture Needs Scorecard'
        }
        this.kpi_short_titles = {
            'psk': 'PS',
            'lsp': 'LP',
            'cva': 'VA (Customers)',
            'eva': 'VA (Employee)',
            'adq': 'ADQ',
            'cst': 'CS',
            'inp': 'IP',
            'bns': 'CNS'
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
        this.cvls = [

        ];

        this.empcvls = [

        ]
        this.ivls_op1 = [
        {'id': 1, 'level': 7, 'label': 'Service', 'dlabel': 'Serving', 'bubbles': [] },
        {'id': 2, 'level': 6, 'label': 'Making a difference', 'dlabel': 'Integrating', 'bubbles': [] },
        {'id': 3, 'level': 5, 'label': 'Internal cohesion', 'dlabel': 'Self-actualizing', 'bubbles': [{'label': 'Honesty: 360', 'state':'PV'},{'label': 'Humour/Fun: 297', 'state': 'PV'},{'label': 'Integrity: 267', 'state':'PV'},{'label': 'Commitment: 225', 'state':'PV'},{'label': 'Positivity: 201', 'state':'PV'}] },
        {'id': 4, 'level': 4, 'label': 'Transformation', 'dlabel': 'Self-development', 'bubbles': [{'label': 'Accountability: 249', 'state':'PV'},{'label': 'Balance (Home/Work): 201', 'state':'PV'}] },
        {'id': 5, 'level': 3, 'label': 'Self-respect', 'dlabel': 'Differentiating', 'bubbles': [] },
        {'id': 6, 'level': 2, 'label': 'Relationships', 'dlabel': 'Conforming', 'bubbles': [{'label': 'Respect: 249', 'state':'PV'},{'label': 'Caring: 231', 'state':'PV'},{'label': 'Family: 213', 'state':'PV'}] },
        {'id': 7, 'level': 1, 'label': 'Survive', 'dlabel': 'Surviving', 'bubbles': [] }
        ];
        this.ivls_op2 = [
        {'id': 1, 'level': 7, 'label': 'Service', 'dlabel': 'Serving', 'bubbles': [] },
        {'id': 2, 'level': 6, 'label': 'Making a difference', 'dlabel': 'Integrating', 'bubbles': [{'label': 'Making a difference: 309', 'state':'PV'}] },
        {'id': 3, 'level': 5, 'label': 'Internal cohesion', 'dlabel': 'Self-actualizing', 'bubbles': [{'label': 'Commitment: 174', 'state':'PV'}] },
        {'id': 4, 'level': 4, 'label': 'Transformation', 'dlabel': 'Self-development', 'bubbles': [{'label': 'Continuous improvement: 264', 'state': 'PV'},{'label': 'Teamwork: 222', 'state':'PV'},{'label': 'Accountability: 204', 'state': 'PV'}] },
        {'id': 5, 'level': 3, 'label': 'Self-respect', 'dlabel': 'Differentiating', 'bubbles': [{'label': 'Brand: 231', 'state':'PV'},{'label': 'Bureaucray: 216', 'state': 'LV'},{'label': 'Hierarchy(L): 159', 'state':'LV'}] },
        {'id': 6, 'level': 2, 'label': 'Relationships', 'dlabel': 'Conforming', 'bubbles': [{'label': 'Client Satisfaction: 378', 'state': 'PV'},{'label': 'Caring: 162', 'state':'PV'}] },
        {'id': 7, 'level': 1, 'label': 'Survive', 'dlabel': 'Surviving', 'bubbles': [] }
        ];
        this.ivls_op3 = [
        {'id': 1, 'level': 7, 'label': 'Service', 'dlabel': 'Serving', 'bubbles': [] },
        {'id': 2, 'level': 6, 'label': 'Making a difference', 'dlabel': 'Integrating', 'bubbles': [{'label': 'Employee Fullfilment: 159', 'state':'PV'}] },
        {'id': 3, 'level': 5, 'label': 'Internal cohesion', 'dlabel': 'Self-actualizing', 'bubbles': [] },
        {'id': 4, 'level': 4, 'label': 'Transformation', 'dlabel': 'Self-development', 'bubbles': [{'label': 'Accountability: 408', 'state':'PV'},{'label': 'Continuous improvement: 336', 'state':'PV'},{'label': 'Teamwork: 228', 'state':'PV'},{'label': 'Adaptability: 210', 'state':'PV'},{'label': 'Information sharing: 165', 'state':'PV'}] },
        {'id': 5, 'level': 3, 'label': 'Self-respect', 'dlabel': 'Differentiating', 'bubbles': [{'label': 'Professionalism: 189', 'state':'PV'}] },
        {'id': 6, 'level': 2, 'label': 'Relationships', 'dlabel': 'Conforming', 'bubbles': [{'label': 'Client Satisfaction: 447', 'state': 'PV'},{'label': 'open communication: 210', 'state':'PV'},{'label': 'Respect: 180', 'state': 'PV'}] },
        {'id': 7, 'level': 1, 'label': 'Survive', 'dlabel': 'Surviving', 'bubbles': [] }
        ];
        this.ivop = 'op1';
        this.ivop1 = 'op4';
        this.ivop2 = 'op7';
        this.ivop3 = 'op10';
        this.empdem1 = "op16";
        this.empdem2 = "op13";
        this.ivls = this.ivls_op1;
        this.ivls1 = this.ivls_op2;
        this.showmianscreen = true;



        this.data1 = [
        ['in-ka', 500],
        ['in-ap', 27],
        ['in-tn', 7]
        ];

    }  

    openTab(kpi, cps) {
        this.currentDash = kpi;
        this.projObj.currentTab = kpi;
        this.showmianscreen = false;

        if(kpi === 'psk') {
            setTimeout(()=>{
                this.pskcComponent.initStuff(this.projObj);
            },1000);
        } else if(kpi === 'lsp') {
            setTimeout(()=>{
                this.lspComponent.initStuff(this.projObj);
            },500); 
        } else if(kpi === 'inp') {
            setTimeout(()=>{
                this.inpComponent.initStuff();
            },500); 
        }
        else if(kpi === 'bns') {
            setTimeout(()=>{
                this.bnsComponent.initStuff(this.projObj);
            },500); 
        } 
        else if(kpi === 'cva') {
            setTimeout(()=>{
                this.cvacComponent.initStuff();
            },500); 
        } 
    } 

    openTabMob(kpi) {
        this.currentDash = kpi;
        this.projObj.currentTab = kpi;
        this.showmianscreen = false;
        console.log(kpi);
        if(kpi === 'psk') {
            setTimeout(()=>{
                this.pskcComponent.initStuff(this.projObj);
            },1000);
        } else if(kpi === 'lsp') {
            setTimeout(()=>{
                this.lspComponent.initStuff(this.projObj);
            },500); 
        } else if(kpi === 'inp') {
            setTimeout(()=>{
                this.inpComponent.initStuff();
            },500); 
        }
        else if(kpi === 'bns') {
            setTimeout(()=>{
                this.bnsComponent.initStuff(this.projObj);
            },500); 
        } 
        else if(kpi === 'cva') {
            setTimeout(()=>{
                this.cvacComponent.initStuff();
            },500); 
        } 
    } 


    openDashTab(kpi, cps) {
        console.log(kpi);
        this.currentDash = kpi;
        this.projObj.currentTab = kpi;
        this.showmianscreen = false;
        if(kpi === 'psk') {
            console.log(this.pskcComponent);
            this.pskcComponent.initStuff(this.projObj);
        }
        else if(kpi === 'lsp') {
            this.lspComponent.initStuff(this.projObj);
        }
        else if(kpi === 'inp') {
            this.inpComponent.initStuff();
        }
        else if(kpi === 'bns') {
            this.bnsComponent.initStuff(this.projObj);
        } 
        else if(kpi === 'cva') {
            setTimeout(()=>{
                this.cvacComponent.initStuff();
            },500); 
        } 
        // else if(kpi === 'cstc') {
            //     this.cvacComponent.initStuff();
            // }
        } 

        showmianscreenfunc(){
            this.showmianscreen = true;
            console.log(this.showmianscreen);
        }
        ivopChange(opval){
            this.ivop = opval;
        }
        ivopCustChange(opval1){
            this.ivop1 = opval1;
            // if(this.ivls !== undefined){
                //     if(opval == 'op1')this.ivls = this.ivls_op1;

                //     if(opval == 'op2')this.ivls = this.ivls_op2;

                //     if(opval == 'op3')this.ivls = this.ivls_op3;
                // }  
            }
            ivopCustInsChange1(opval2){
                this.ivop2 = opval2;
            }

            ivopCustInsChange2(opval3){
                this.ivop3 = opval3;
            }

            ivopEmpInsChange1(el){
                this.empdem1 = el;
            }

            ivopEmpInsChange2(el){
                this.empdem2 = el;
            }

            showKnob(ccqscrore) {
                // console.log(ccqscrore);
                // var bar = new ldBar('#ccq');
                // bar.set(ccqscrore);
            }
            switchcustEmpTab (view) {
                // console.log(view);
                this.custEmpTab = view;
            }
            switchCategoriesTab (view) {
                // console.log(view);
                this.categoriesTab = view;
                if(view == 'networktab') {
                    this.cust_dropdn = this.filter_array.network; 
                    this.selectedCategoryTab = 'region';
                    this.selectedCategoryDropDown1 = 'all';
                    this.selectedCategoryDropDown2 = 'all';
                    this.getFilterDetails('empdemo');
                }
                if(view == 'agegrouptab') {
                    this.cust_dropdn = this.filter_array.age; 
                    this.selectedCategoryTab = 'age';
                    this.selectedCategoryDropDown1 = 'all';
                    this.selectedCategoryDropDown2 = 'all';
                    this.getFilterDetails('empdemo');
                }
                if(view == 'durationtab') {
                    this.cust_dropdn = this.filter_array.duration_at_sbi; 
                    this.selectedCategoryTab = 'duration_at_sbi';
                    this.selectedCategoryDropDown1 = 'all';
                    this.selectedCategoryDropDown2 = 'all';
                    this.getFilterDetails('empdemo');
                }
                if(view == 'joiningagetab') {
                    this.cust_dropdn = this.filter_array.age_at_joining_sbi; 
                    this.selectedCategoryTab = 'age_at_joining_sbi';
                    this.selectedCategoryDropDown1 = 'all';
                    this.selectedCategoryDropDown2 = 'all';
                    this.getFilterDetails('empdemo');
                }
                if(view == 'designationtab') {
                    this.cust_dropdn = this.filter_array.designation; 
                    this.selectedCategoryTab = 'designation';
                    this.selectedCategoryDropDown1 = 'all';
                    this.selectedCategoryDropDown2 = 'all';
                    this.getFilterDetails('empdemo');
                }
                if(view == 'scaletab') {
                    this.cust_dropdn = this.filter_array.scale;
                    this.selectedCategoryTab = 'scale';
                    this.selectedCategoryDropDown1 = 'all';
                    this.selectedCategoryDropDown2 = 'all';
                    this.getFilterDetails('empdemo');
                }
                if(view == 'payslabtab') {
                    this.cust_dropdn = this.filter_array.pay_slab; 
                    this.selectedCategoryTab = 'pay_slab';
                    this.selectedCategoryDropDown1 = 'all';
                    this.selectedCategoryDropDown2 = 'all';
                    this.getFilterDetails('empdemo');
                }
            }
            switchCustCategoriesTab (view) {
                this.empcategoriesTab = view;
                if(view == 'empbranchtab') {
                    this.emp_dropdn = this.filter_array.branch; 
                    this.selectedCustCategoryTab = 'branch';
                    this.selectedCustCategoryDropDown1 = 'all';
                    this.selectedCustCategoryDropDown2 = 'all';
                    this.getFilterDetails('custdemo');
                }
                if(view == 'empmergerbanktab') {
                    this.emp_dropdn = this.filter_array.merger_bank; 
                    this.selectedCustCategoryTab = 'merger_bank';
                    this.selectedCustCategoryDropDown1 = 'all';
                    this.selectedCustCategoryDropDown2 = 'all';
                    this.getFilterDetails('custdemo');
                }
                if(view == 'empdurationsbitab') {
                    this.emp_dropdn = this.filter_array.duration_of_banking; 
                    this.selectedCustCategoryTab = 'duration_of_banking'; 
                    this.selectedCustCategoryDropDown1 = 'all';
                    this.selectedCustCategoryDropDown2 = 'all';
                    this.getFilterDetails('custdemo');
                }
            }

            getChartData(filters, container, subcontainer) {
                // console.log(subcontainer);
                let source_data = [];
                let filtered_data = [];
                let response;
                source_data =this.project.participants;
                // console.log(source_data);
                for(let data of source_data) {
                    // console.log(data);
                    var toAdd = true;
                    // console.log(data['user_type']);
                    for(let f of filters) {
                        if(f.value !== 'all' && data[f.name] !== f.value) {
                            toAdd = false;
                            break;
                            console.log('check');
                        }
                    }
                    if(toAdd == true) {
                        filtered_data.push(data);
                    }    
                }
                
                let pv_question = this.project.survey_questions.find(q => q.question_type === 'cva' && q.question_text.toLowerCase() === subcontainer);

                if(pv_question !== undefined ) { 
                    let ans_values = []; let ansv_data = [];  
                    for( let emp of filtered_data){
                        let answers = this.project.survey_answers.filter(ans => ans.question_id === pv_question.id && ans.employee_id === emp.id);

                        if(answers !== undefined) {

                            // console.log(answers);
                            from(answers).pipe(pluck('answer')).subscribe(val => ansv_data.push(val));
                            for(let avd of ansv_data) {
                                let avob = ans_values.find(av => av.value === avd);
                                if(avob !== undefined) {
                                    avob.count++;
                                }
                                else {
                                    ans_values.push({'value': avd, 'count': 1});
                                }
                            }

                        }
                    }
                    ans_values.sort((a,b)=> b.count - a.count);
                    this.cvls = ans_values.slice(0, 10);

                    let i = 1; 
                    let j = 1;

                    for(let cvl of this.cvls) {
                        cvl.id = i++;
                    }
                    // console.log(this.cvls);
                    response = this.cvls;
                }
                if (response !== undefined) {
                    return response;
                }
                else {
                    response = [];
                    return response;
                }
            }


            getFilterDetails(comparisontab) {
                let empfilterdetails = [];
                let empfilterdetails1 = [];
                let empfilterdetails2 = [];
                let custfilterdetails = [];
                let custfilterdetails1 = [];
                let custfilterdetails2 = [];

                if(comparisontab === 'empvscust') {
                    empfilterdetails.push({ "name" : "region", "value" : this.selectedNetwork });
                    empfilterdetails.push({ "name" : "module", "value" : this.selectedModule });
                    empfilterdetails.push({ "name" : "branch", "value" : this.selectedModule });
                    empfilterdetails.push({ "name" : "user_type", "value" : "employee" });
                    // console.log(empfilterdetails);

                    this.chartdata.a.personal = this.getChartData(empfilterdetails,"a","personal values");
                    this.chartdata.a.current = this.getChartData(empfilterdetails,"a","current culture values");
                    this.chartdata.a.desired = this.getChartData(empfilterdetails,"a","desired culture values");

                    custfilterdetails.push({ "name" : "region", "value" : this.selectedNetwork });
                    custfilterdetails.push({ "name" : "module", "value" : this.selectedModule });
                    custfilterdetails.push({ "name" : "branch", "value" : this.selectedModule });
                    custfilterdetails.push({ "name" : "user_type", "value" : "customer" });
                    // console.log(custfilterdetails);
                    this.chartdata.b.personal = this.getChartData(custfilterdetails,"b","personal values");
                    this.chartdata.b.current = this.getChartData(custfilterdetails,"b","current culture values");
                    this.chartdata.b.desired = this.getChartData(custfilterdetails,"b","desired culture values");
                }

                if(comparisontab === 'empdemo') {
                    empfilterdetails1.push({ "name" : this.selectedCategoryTab, "value" : this.selectedCategoryDropDown1 });
                    empfilterdetails1.push({ "name" : "user_type", "value" : "employee" });
                    // console.log(empfilterdetails1);

                    this.chartdata.c.personal = this.getChartData(empfilterdetails1,"c","personal values");
                    this.chartdata.c.current = this.getChartData(empfilterdetails1,"c","current culture values");
                    this.chartdata.c.desired = this.getChartData(empfilterdetails1,"c","desired culture values");

                    empfilterdetails2.push({ "name" : this.selectedCategoryTab, "value" : this.selectedCategoryDropDown2 });
                    empfilterdetails2.push({ "name" : "user_type", "value" : "employee" });
                    // console.log(empfilterdetails2);
                    this.chartdata.d.personal = this.getChartData(empfilterdetails2,"d","personal values");
                    this.chartdata.d.current = this.getChartData(empfilterdetails2,"d","current culture values");
                    this.chartdata.d.desired = this.getChartData(empfilterdetails2,"d","desired culture values");
                    // console.log(this.selectedCategoryTab);
                }

                if(comparisontab === 'custdemo') {
                    custfilterdetails1.push({ "name" : this.selectedCustCategoryTab, "value" : this.selectedCustCategoryDropDown1 });
                    custfilterdetails1.push({ "name" : "user_type", "value" : "customer" });
                    // console.log(custfilterdetails1);

                    this.chartdata.e.personal = this.getChartData(custfilterdetails1,"e","personal values");
                    this.chartdata.e.current = this.getChartData(custfilterdetails1,"e","current culture values");
                    this.chartdata.e.desired = this.getChartData(custfilterdetails1,"e","desired culture values");

                    custfilterdetails2.push({ "name" : this.selectedCustCategoryTab, "value" : this.selectedCustCategoryDropDown2 });
                    custfilterdetails2.push({ "name" : "user_type", "value" : "customer" });
                    // console.log(custfilterdetails2);
                    this.chartdata.f.personal = this.getChartData(custfilterdetails2,"f","personal values");
                    this.chartdata.f.current = this.getChartData(custfilterdetails2,"f","current culture values");
                    this.chartdata.f.desired = this.getChartData(custfilterdetails2,"f","desired culture values");
                    // console.log(this.selectedCustCategoryTab);
                }
                // 
                this.allchartresponse = this.chartdata;
                console.log(this.chartdata);

            }

            convertToHumanReadable(number : any){
                let hasMinus = String(number).charAt(0) === '-' ? true:false;
                number =  String(number).charAt(0) === '-' ?
                + String(number).substring(1, number.length)  : number;
                // hundreds
                if(number <= 999){
                    number = number ;
                }
                // thousands
                else if(number >= 1000 && number <= 99999){
                    number = (number / 1000).toFixed(1) + 'K';
                }
                // Lakhs
                else if(number >= 100000 && number <= 999999){
                    number = (number / 100000).toFixed(1) + 'L';
                }
                // millions
                else if(number >= 1000000 && number <= 999999999){
                    number = (number / 1000000).toFixed(1) + 'M';
                }
                // billions
                else if(number >= 1000000000 && number <= 999999999999){
                    number = (number / 1000000000).toFixed(1) + 'B';
                }
                if(hasMinus){
                    return '-'+number;
                }else
                {
                    return number;
                }
            }
            ngAfterViewInit(){
                console.log(this.evaComponent);
            }

            ngOnInit() {


                this.currentUser = this.authService.currentUserValue;
                this.dataService.getLeaderProject(this.projectId, this.currentUser.email).subscribe(
                    data => {
                        this.project = data.project;
                        console.log(this.project);  

                        if(this.project.ces !== undefined && this.project.ces.kpis !== undefined) {
                            for(let kpi of this.project.ces.kpis) {
                                if(kpi.title === undefined || kpi.title === '') {
                                    kpi.title = this.kpi_titles[kpi.kpi_code];
                                    kpi.shortTitle = this.kpi_short_titles[kpi.kpi_code];
                                }
                            }
                        } 
                        else {
                            Swal.fire('SORRY', 'Data is not available for this section!<br> Please contact to admin', 'error');
                        }
                        console.log(this.project.org.footPrints.length);
                        for(let qobj of this.project.org.footPrints) {
                            qobj.lat = parseFloat(qobj.lat);
                            qobj.lon = parseFloat(qobj.lon);
                        };


                        this.ivopCustChange(this.ivop1);
                        // this.loadIndiaMap(this.data1);
                        this.custEmpTab = 'cusVemp';
                        this.ivopChange(this.ivop);
                        this.categoriesTab = 'networktab';
                        this.selectedCategoryTab = 'region';
                        this.selectedNetwork = 'all';
                        this.selectedModule = 'all';
                        this.selectedBranch = 'all';
                        this.selectedCategoryDropDown1 = 'all';
                        this.selectedCategoryDropDown2 = 'all';
                        this.empcategoriesTab = 'empbranchtab';
                        this.selectedCustCategoryTab = 'branch';



                        this.chartdata = {
                            "a" : 
                            { 
                                "personal" : {},
                                "current" : {},
                                "desired" : {}
                            }
                            ,
                            "b" : 
                            { 
                                "personal" : {},
                                "current" : {},
                                "desired" : {}
                            }
                            ,
                            "c" : 
                            { 
                                "personal" : {},
                                "current" : {},
                                "desired" : {}
                            }
                            ,
                            "d" : 
                            { 
                                "personal" : {},
                                "current" : {},
                                "desired" : {}
                            }
                            ,
                            "e" : 
                            { 
                                "personal" : {},
                                "current" : {},
                                "desired" : {}
                            }
                            ,
                            "f" : 
                            { 
                                "personal" : {},
                                "current" : {},
                                "desired" : {}
                            }

                        };


                        this.getFilterDetails('empvscust');
                        this.getFilterDetails('custdemo');
                        this.getFilterDetails('empdemo');
                        this.generateGenderChart();
                        this.generateDesignationChart();
                        this.generateAssociateBankChart();

                        this.generateCultureChart();
                        this.generategeoChart();



                        let networkdata = []; let moduledata = []; let branchdata = []; let agedata = []; let durationAtBankdata = []; let ageOfJoiningdata = []; let designationdata = []; let scaledata = []; let paySlabdata = []; let mergerBankdata = [];

                        from(this.project.participants).pipe(pluck('region')).subscribe(val => networkdata.push(val));
                        let uniquenetwork = networkdata.filter((item, i, ar) => ar.indexOf(item) === i);

                        from(this.project.participants).pipe(pluck('module')).subscribe(val => moduledata.push(val));
                        let uniquemodule = moduledata.filter((item, i, ar) => ar.indexOf(item) === i);

                        from(this.project.participants).pipe(pluck('branch_name')).subscribe(val => branchdata.push(val));
                        let uniquebranch = branchdata.filter((item, i, ar) => ar.indexOf(item) === i);

                        from(this.project.participants).pipe(pluck('age_group')).subscribe(val => agedata.push(val));
                        let uniqueage = agedata.filter((item, i, ar) => ar.indexOf(item) === i);

                        from(this.project.participants).pipe(pluck('duration_at_SBI')).subscribe(val => durationAtBankdata.push(val));
                        let uniquedurationAtBank = durationAtBankdata.filter((item, i, ar) => ar.indexOf(item) === i);

                        from(this.project.participants).pipe(pluck('designationName')).subscribe(val => designationdata.push(val));
                        let uniquedesignation = designationdata.filter((item, i, ar) => ar.indexOf(item) === i);

                        from(this.project.participants).pipe(pluck('scale')).subscribe(val => scaledata.push(val));
                        let uniquescale = scaledata.filter((item, i, ar) => ar.indexOf(item) === i);

                        from(this.project.participants).pipe(pluck('pay_slab')).subscribe(val => paySlabdata.push(val));
                        let uniquepaySlab = paySlabdata.filter((item, i, ar) => ar.indexOf(item) === i);

                        from(this.project.participants).pipe(pluck('merger_bank')).subscribe(val => mergerBankdata.push(val));
                        let uniquemergerBank = mergerBankdata.filter((item, i, ar) => ar.indexOf(item) === i);

                        from(this.project.participants).pipe(pluck('age_of_joining_SBI')).subscribe(val => ageOfJoiningdata.push(val));
                        let uniqueageOfJoining = ageOfJoiningdata.filter((item, i, ar) => ar.indexOf(item) === i);

                        this.filter_array = {
                            "user_type" : ["employee","customer"],
                            "network" : uniquenetwork,
                            "module" : uniquemodule,
                            "branch" : uniquebranch,
                            "age" : uniqueage,
                            "duration_at_sbi" : uniquedurationAtBank,
                            "age_at_joining_sbi" : uniqueageOfJoining,
                            "designation" : uniquedesignation,
                            "scale" : uniquescale,
                            "pay_slab" : uniquepaySlab,
                            "merger_bank" : uniquemergerBank
                        }


                        this.project.org.emp_count = this.convertToHumanReadable(this.project.org.emp_count);
                        // console.log(this.project.org.emp_count);
                        this.cust_dropdn = this.filter_array.network;
                        this.emp_dropdn = this.filter_array.branch;
                        this.loadMap(this.project.org.footPrints);
                        this.loadMap_mbl(this.project.org.footPrints);
                        this.showKnob(this.project.ces.ces_score);
                        //this.currentDash = this.project.ces.kpis[5].kpi_code;
                        // this.ccqscrore = this.project.ces.ces_score;
                        this.projObj.filters = this.filter_array;
                        this.projObj.id = this.project.id;
                        this.projObj.title = this.project.title;
                        this.projObj.psk = this.project.psk;
                        this.projObj.pskc = this.project.pskc;
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
                        this.projObj.project_variation_type = this.project.project_variation_type;
                        this.blockUI.stop();
                    },
                    err => {
                        console.log("inside org details error", JSON.stringify(err.message));
                        // alert(JSON.stringify(err.message));
                        Swal.fire('SORRY', 'Data is not available for this project!<br> Please contact to admin', 'error');
                        this.blockUI.stop();
                    });


}
generateCultureChart() {
    var culcomp = this;

    var colors = Highcharts.getOptions().colors,
    categories = ['7.36 <br> VALUE <br>ASSESSMENT', '-- <br> INFLUENCER <br>NETWORKS', '8.54 <br>PEOPLE SPEAK', '7.38 <br> ADAPTABILITY <br> QUOTIENT', '-- <br>LEADERSHIP <br> PULSE', '-- <br>INPRESSION','-- <br>CULTURE NEEDS<br> SCORECARD'],
    components =  ['pskcComponent', 'lspComponent', 'cvacComponent', 'inpComponent', 'bnsComponent', 'cstcComponent'],
    data = [{
        y: 33.33,
        color: '#ead051',
        shortcode:'cva',
        useHTML:true,
        drilldown: {
            name: 'Value Assessment ',
            categories: ['<p class="cvacvalue text-center"><img style="width:90%" src="assets/images/mask-icon.png"></p>'],
            data: [ 0.33],
            width:'10px',
            color: ['#afafaf']
        }
    }, {
        y: 33.33,
        color: '#6bc96b',
        shortcode:'cst',
        drilldown: {
            name: 'Company Sentiment',
            categories: ['<p class="cstcvalue text-center"><img style="width:90%" src="assets/images/cs-icon.png"></p>'],
            data: [ 0.33],
            color: ['#6c6c6c']
        }
    }, {
        y: 33.33,
        color: '#fa5462',
        shortcode:'psk',
        drilldown: {
            name: 'People Speak',
            categories: ['<p class="pskcvalue text-center"><img style="width:90%" src="assets/images/ps-icon.png"></p>'],
            data: [0.33],
            color: ['#f868ae']
        }
    }, {
        y: 33.33,
        color: '#6bc96b',
        shortcode:'adq',
        drilldown: {
            name: 'Adaptability Quotient',
            categories: ['<p class="adqcvalue text-center"><img style="width:90%" src="assets/images/adq-icon.png"></p>'],
            data: [0.33],
            color: ['#914ee9']
        }
    }, {
        y: 33.33,
        color: '#f9cf3d',
        shortcode:'lsp',
        drilldown: {
            name: 'Leadership Pulse',
            categories: ['<p class="lspvalue text-center"><img style="width:90%" src="assets/images/leadership-icon.png"></p>'],
            data: [ 0.33],
            color: ['#02c5fd']
        }
    }, {
        y: 33.33,
        color: '#fa5462',
        shortcode:'inp',
        drilldown: {
            name: 'Inpressions',
            categories: ['<p class="inpvalue text-center"><img style="width:90%" src="assets/images/impression-icon.png"></p>'],
            data: [ 0.33],
            color: ['#6c6c6c']
        }
    }, {
        y: 33.33,
        color: '#f9cf3d',
        shortcode:'bns',
        drilldown: {
            name: 'Culture needs scorecards',
            categories: ['<p class="bnsvalue text-center"><img style="width:90%" src="assets/images/bns-icon.png"></p>'],
            data: [ 0.33],
            color: ['#afafaf']
        }
    }],
    browserData = [],
    versionsData = [],
    i,
    j,
    dataLen = data.length,
    drillDataLen,
    brightness;


    // Build the data arrays
    for (i = 0; i < dataLen; i += 1) {

        // add dashboard data
        browserData.push({
            name: categories[i],
            y: data[i].y,
            color: data[i].color,
            shortcode:data[i].shortcode

        });

        // add dash value data
        drillDataLen = data[i].drilldown.data.length;
        for (j = 0; j < drillDataLen; j += 1) {
            versionsData.push({
                name: data[i].drilldown.categories[j],
                y: data[i].drilldown.data[j],
                color: data[i].drilldown.color[j],
                shortcode:data[i].shortcode
            });
        }
    }
    Highcharts1.chart('culture-dash', {
        chart: {
            type: 'pie',
            backgroundColor: 'transparent',
            spacingTop: -80
        },
        title: {
            text: '',
            align: 'center',
            verticalAlign: 'middle',
            y:0
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            pie: {
                shadow: false,
                borderWidth:2,
                borderColor: '#fff',
                dataLabels: {
                    enabled: true,
                },
                center: ['50%', '70%'],
                slicedOffset: 30,
                startAngle: -140,
                endAngle: 140,
                states: {
                    hover: true
                }
            }
        },
        tooltip: {
            enabled: false 
        },
        series: [{
            name: 'Culture Genome',
            data: browserData,
            cursor: 'pointer',
            point: {
                events: {
                    click: function () {
                        if(this.shortcode === 'cva'){
                            culcomp.openTab('cva',culcomp.cvacComponent);
                        } else if(this.shortcode === 'cst'){
                            culcomp.openTab('cst',culcomp.cstcComponent);
                        } else if(this.shortcode === 'psk'){
                            culcomp.openTab('psk',culcomp.pskcComponent);
                        } else if(this.shortcode === 'adq'){
                            culcomp.openTab('adq',culcomp.adqcComponent);
                        } else if(this.shortcode === 'lsp'){
                            culcomp.openTab('lsp',culcomp.lspComponent);
                        } else if(this.shortcode === 'inp'){
                            culcomp.openTab('inp',culcomp.inpComponent);
                        } else if(this.shortcode === 'bns'){
                            culcomp.openTab('bns',culcomp.bnsComponent);
                        }
                    }
                }
            },
            size: '100%',
            innerSize: '58%',
           

            enabled: true,
            borderWidth: 15,
            borderColor: '#fff',
                
                dataLabels: {
                    formatter: function () {
                        return this.point.name;
                    },
                    //  Inner Dashboard Names
                    style: {
                        // fontWeight: 'bold',
                        color: 'white',
                        textShadow: false,
                        // fontVariant:'small-caps',

                        stroke:'white',
                        letterSpacing:'1',
                        lineHeight:'20'
                    },
                    useHTML:true,
                    rotation: -1,
                    distance: -65
                }
            },{
                name: 'Versions',
                data: versionsData,
                cursor: 'pointer',
                allowPointSelect: false,
                stickyTracking: false,
                point:{
                    events:{
                        click: function (event) {
                            if(this.shortcode === 'cva'){
                                culcomp.openTab('cva',culcomp.cvacComponent);
                            } else if(this.shortcode === 'cst'){
                                culcomp.openTab('cst',culcomp.cstcComponent);
                            } else if(this.shortcode === 'psk'){
                                culcomp.openTab('psk',culcomp.pskcComponent);
                            } else if(this.shortcode === 'adq'){
                                culcomp.openTab('adq',culcomp.adqcComponent);
                            } else if(this.shortcode === 'lsp'){
                                culcomp.openTab('lsp',culcomp.lspComponent);
                            } else if(this.shortcode === 'inp'){
                                culcomp.openTab('inp',culcomp.inpComponent);
                            } else if(this.shortcode === 'bns'){
                                culcomp.openTab('bns',culcomp.bnsComponent);
                            } 
                        },
                        mouseOver: function() {
                            var point = this,
                            points = this.series.points;

                            // unslice sliced element(s)
                            for (var key in points) {
                                if (points[key].sliced) {
                                    points[key].slice(false);
                                }
                            }

                           
                        }

                    }
                },
                events: {
                    mouseOut: function(event) {
                      // unslice sliced element(s)
                      for (var key in this.points) {
                        if (this.points[key].sliced) {
                          this.points[key].slice(false);
                        }
                      }
                    }
                  },
                size: '100%',
                innerSize: '60%',
                
                dataLabels: {
                    useHTML: true,
                    enabled: true,
                    formatter: function () {
                        return this.point.name;
                    },
                    style: {
                        color: 'white',
                        textShadow: false,
                        stroke:'white',
                        letterSpacing:'1'
                    },
                    color: '#000',
                    inside:false,             
                    y: -15,
                    x:15,

                    shadow: false,
                    connectorColor: 'transparent',
                    distance: 5     
                }
            }]
        });
    }

generateGenderChart() {
    Highcharts1.chart('malefemalechart', {
        chart: {
            type: 'pie',
            backgroundColor: 'transparent',
            // margin: [0, 0, 50, 0],
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            width: 400,
            style: {
                fontFamily: "'segoeui', sans-serif"
            }
        },
        title: {
            text: ''
        },
        tooltip: {
            pointFormat: '<b>{point.percentage:.1f}%</b>'
        },

        'credits': { enabled: false },
        subtitle: {
            text: ''
        },
        legend: {
            enabled: true,
            align: 'center',
            verticalAlign: 'bottom',
            itemStyle: {
                color: '#333',
                // fontSize: 10,
                position: 'fixed'
            },
            layout: 'horizontal',
            width: '50%',
            y: 20
        },

        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                size: 100,
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    // format: '<b>{point.name}</b>: {point.y}',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },

        series: [{
            minPointSize: 10,
            innerSize: '50%',
            zMin: 0,
            name: '',
            data: [{
                name: 'Women Employees',
                y: 28,
                color: '#9688e0'
            },{
                name: 'Men Employees',
                y: 8,
                color: '#D672AE'
            }]
        }]
    });
}
generateDesignationChart() {
    Highcharts1.chart('designationchart', {
        chart: {
            type: 'pie',
            backgroundColor: 'transparent',
            // margin: [0, 0, 50, 0],
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            width: 400,
            style: {
                fontFamily: "'segoeui', sans-serif"
            }
        },
        title: {
            text: ''
        },
        tooltip: {
            pointFormat: '<b>{point.percentage:.1f}%</b>'
        },

        'credits': { enabled: false },
        subtitle: {
            text: ''
        },
        legend: {
            enabled: true,
            align: 'center',
            verticalAlign: 'bottom',
            itemStyle: {
                color: '#333',
                // fontSize: 10,
                position: 'fixed'
            },
            layout: 'horizontal',
            width: '100%',
            y: 20
        },

        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                size: 120,
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    // format: '<b>{point.name}</b>: {point.y}',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            minPointSize: 10,
            innerSize: '50%',
            zMin: 0,
            name: '',
            data: [{
                name: 'iLabs',
                y: 10,
                color: '#9688e0'
            },{
                name: 'SDZ',
                y: 24,
                color: '#D672AE'
            },{
                name: 'HR/People & Communications',
                y: 1,
                color: '#FF0000'
            },{
                name: 'Administration',
                y: 1,
                color: '#FF1493'
            }]
        }]
    });
}
generateAssociateBankChart() {
    Highcharts1.chart('hierarchyid', {
        chart: {
            type: 'pie',
            backgroundColor: 'transparent',
            // margin: [0, 0, 50, 0],
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            width: 400,
            style: {
                fontFamily: "'segoeui', sans-serif"
            }
        },
        title: {
            text: ''
        },
        tooltip: {
            pointFormat: '<b>{point.percentage:.1f}%</b>'
        },

        'credits': { enabled: false },
        subtitle: {
            text: ''
        },
        legend: {
            enabled: true,
            align: 'center',
            verticalAlign: 'bottom',
            itemStyle: {
                color: '#333',
                // fontSize: 10,
                position: 'fixed'
            },
            layout: 'horizontal',
            width: '100%',
            y: 20
        },

        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                size: 100,
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    // format: '<b>{point.name}</b>: {point.y}',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            minPointSize: 10,
            innerSize: '50%',
            zMin: 0,
            name: '',
            data: [{
                name: 'Senior',
                y: 8,
                color: '#9688e0'
            },{
                name: 'Mid',
                y: 19,
                color: '#D672AE'
            },{
                name: 'Junior',
                y: 9,
                fontSize: '1.2em',
                color: '#FF0000'
            }]
        }]
    });
}
generategeoChart() {
    Highcharts1.chart('associategeochart', {
        chart: {
            type: 'pie',
            backgroundColor: 'transparent',
            // margin: [0, 0, 50, 0],
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            width: 400,
            style: {
                fontFamily: "'segoeui', sans-serif"
            }
        },
        title: {
            text: ''
        },
        tooltip: {
            pointFormat: '<b>{point.percentage:.1f}%</b>'
        },

        'credits': { enabled: false },
        subtitle: {
            text: ''
        },
        legend: {
            enabled: true,
            align: 'center',
            verticalAlign: 'bottom',
            itemStyle: {
                color: '#333',
                // fontSize: 10,
                position: 'fixed'
            },
            layout: 'horizontal',
            width: '100%',
            y: 20
        },

        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                size: 100,
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    // format: '<b>{point.name}</b>: {point.y}',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            minPointSize: 10,
            innerSize: '50%',
            zMin: 0,
            name: '',
            data: [{
                name: '20-25',
                y: 16,
                color: '#9688e0'
            },{
                name: '25-30',
                y: 16,
                color: '#D672AE'
            },{
                name: '30-35',
                y: 10,
                fontSize: '1.2em',
                color: '#FF0000'
            },{
                name: '35-40',
                y: 4,
                color: '#FF1493'
            },{
                name: '40+',
                y: 0,
                color: '#00FFFF'
            }]
        }]
    });
}



loadMap(data) {
    Highcharts.mapChart('dlp-map', 
    {
        chart: {
            backgroundColor: 'transparent',
            events: {
                load: function () {
                    this.mapZoom(1,100,100);
                }
            },

        },
        title: {
            // text: '<p>GLOBAL FOOTPRINT</p>'
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
            nullColor: '#aaa',
            enableMouseTracking: false,
            tooltip: {
                // pointFormat: '{point.name}: {point.footPrint}'
                enabled: false
            }
        },
        {
            type: 'mappoint',
            name: 'Global Footprint',
            joinBy: ['iso-a2', 'code'],
            color:'#dc3545',
            cursor : 'pointer',
            point:{
                events:{
                    click: function(){
                        // alert(this.name);
                        $("#worldmyModal").modal('show');
                    },
                }
            },
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
loadMap_mbl(data) {
    Highcharts.mapChart('dlp-map-mbl', 
    {
        chart: {
            backgroundColor: 'transparent',
            height:230,
            events: {
                load: function () {
                    this.mapZoom(1,100,100);
                }
            },

        },
        title: {
            // text: '<p>GLOBAL FOOTPRINT</p>'
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
            nullColor: '#aaa',
            enableMouseTracking: false,
            tooltip: {
                // pointFormat: '{point.name}: {point.footPrint}'
                enabled: false
            }
        },
        {
            type: 'mappoint',
            name: 'Global Footprint',
            joinBy: ['iso-a2', 'code'],
            color:'#dc3545',
            cursor : 'pointer',
            point:{
                events:{
                    click: function(){
                        // alert(this.name);
                        $("#worldmyModal").modal('show');
                    },
                }
            },
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



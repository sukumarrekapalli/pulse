import { Component, OnInit,Input } from '@angular/core';
import { Project } from '../../models/project.model';
declare var ldBar: any;
@Component({
selector: 'app-valueassessment',
templateUrl: './valueassessment.component.html',
styleUrls: ['./valueassessment.component.css']
})
export class ValueassessmentComponent implements OnInit {
@Input() project: Project;
public rcs: any;
public ivop: any;
public ivls: any;
public ivls_op1:any;
public ivls_op2: any;
public ivls_op3:any;
public ivoptions :any;
public currentView: any;
public cvls: any;


constructor() { 
this.rcs = [
{'code': 'rcwl', 'prop': 'rc_work_life_balance', 'label': 'Personal Values', 'icon': 'balance-scale', 'opvalue': 'op1'},
{'code': 'rcoe', 'prop': 'rc_org_experience', 'label': 'Current Organizational Values', 'icon': 'sitemap', 'opvalue': 'op2'},
{'code': 'rcsb', 'prop': 'rc_salary_benefits', 'label': 'Desired Organizational Values', 'icon': 'wallet', 'opvalue': 'op3'}
//      {'code': 'rcjc', 'prop': 'rc_job_security', 'label': 'Job Security', 'icon': 'user-shield'},
//      {'code': 'rcmn', 'prop': 'rc_management', 'label': 'Management', 'icon': 'tasks'}
];
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
this.ivls = this.ivls_op1;
//    this.ivoptions =[
//        {'op1': [{'label':7, 'state': 'LV'},{'label': 7, 'state':'PV'},{'label':7, 'state': 'LV'},{'label': 6, 'state':'PV'},
//                {'label':6, 'state': 'LV'},{'label': 5, 'state':'PV'},{'label':5, 'state': 'LV'},{'label': 4, 'state':'PV'},
//                {'label':3, 'state': 'LV'},{'label': 2, 'state':'PV'}]},
//        {'op2': [{'label':4, 'state': 'LV'},{'label': 4, 'state':'PV'},{'label':4, 'state': 'LV'},{'label': 3, 'state':'PV'},
//                {'label':3, 'state': 'LV'},{'label': 3, 'state':'PV'},{'label':2, 'state': 'LV'},{'label': 2, 'state':'PV'},
//                {'label':7, 'state': 'LV'},{'label': 5, 'state':'PV'}]},
//        {'op3': [{'label':1, 'state': 'LV'},{'label': 1, 'state':'PV'},{'label':1, 'state': 'LV'},{'label': 1, 'state':'PV'},
//                {'label':2, 'state': 'LV'},{'label': 2, 'state':'PV'},{'label':2, 'state': 'LV'},{'label': 3, 'state':'PV'},
//                {'label':3, 'state': 'LV'},{'label': 3, 'state':'PV'}]}];
//   
}

showKnob(el, prop) {
var bar = new ldBar('#' + el);
bar.set( (this.project.cva[prop] * 10));
//$('.' + el).data('percent', (this.project.lsp[prop] * 10));
//$('.' + el).loading();
}

hideKnob(el, prop) {
var bar = new ldBar('#' + el);
bar.set(0);
//$('.' + el).data('percent', 0);
//$('.' + el).loading();
}
ivopChange(opval){
this.ivop = opval;
if(this.ivls !== undefined){
if(opval == 'op1')this.ivls = this.ivls_op1;

if(opval == 'op2')this.ivls = this.ivls_op2;

if(opval == 'op3')this.ivls = this.ivls_op3;
}  
}
ngOnInit() {

this.project.cva = {
"executiveSummary": "This report gives us an overview of what is important to the people, current experience and what employees view important for the future of the organization.",
"opinion_index": 3.7,
"review": "1170",
"interview":"693",
"ceo_approval":"84",
"friend_recommend":"62",
"rc_work_life_balance": 3.7,
"rc_org_experience": 4.2,
"rc_salary_benefits": 2.4,
"rc_job_security": 5.3,
"rc_management": 2.4
};


let self = this;
setTimeout(function() { 
for(let rc of self.rcs) {
self.hideKnob(rc.code, rc.prop);
}

}, 1000);

this.ivopChange(this.ivop);
}


}

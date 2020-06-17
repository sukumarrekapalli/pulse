import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../models/project.model';
import { from } from 'rxjs';
import { pluck, groupBy } from 'rxjs/operators';
 
declare var ldBar: any;
@Component({
  selector: 'app-valueassessmentculture',
  templateUrl: './valueassessmentculture.component.html',
  styleUrls: ['./valueassessmentculture.component.css']
})
export class ValueassessmentcultureComponent implements OnInit {
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
public branchno: any;
public uniqueresponse: any;
public responsedata_per: any;
public countUpView: any;
public protect: any;
public cva: any = [];
public count: any;
  constructor() { 
  	console.log(this.project);
  	this.rcs = [
		{'code': 'rcwl', 'prop': 'rc_work_life_balance', 'label': 'Personal Values', 'icon': 'balance-scale', 'opvalue': 'op1'},
		{'code': 'rcoe', 'prop': 'rc_org_experience', 'label': 'Current Organizational Values', 'icon': 'sitemap', 'opvalue': 'op2'},
		{'code': 'rcsb', 'prop': 'rc_salary_benefits', 'label': 'Desired Organizational Values', 'icon': 'wallet', 'opvalue': 'op3'}
		];
		this.ivls_op1 = [
		{'id': 1, 'level': 7, 'label': 'Service', 'dlabel': 'Serving', 'bubbles': [] },
		{'id': 2, 'level': 6, 'label': 'Making a difference', 'dlabel': 'Integrating', 'bubbles': [{'label': 'Leadership: 9', 'state': 'PV'}] },
		{'id': 3, 'level': 5, 'label': 'Internal cohesion', 'dlabel': 'Self-actualizing', 'bubbles': [{'label': 'Creativity: 10', 'state':'PV'}] },
		{'id': 4, 'level': 4, 'label': 'Transformation', 'dlabel': 'Self-development', 'bubbles': [{'label': 'Teamwork: 9', 'state':'PV'},{'label': 'Continuous Learning: 12', 'state':'PV'}] },
		{'id': 5, 'level': 3, 'label': 'Self-respect', 'dlabel': 'Differentiating', 'bubbles': [{'label': 'Professional Growth: 9', 'state':'PV'},{'label': 'Efficiency: 10', 'state':'PV'}] },
		{'id': 6, 'level': 2, 'label': 'Relationships', 'dlabel': 'Conforming', 'bubbles': [{'label': 'Respect: 9', 'state':'PV'},{'label': 'Friendship: 12', 'state':'PV'},{'label': 'Family: 8', 'state':'PV'},{'label': 'Listning: 12', 'state':'PV'}] },
		{'id': 7, 'level': 1, 'label': 'Survive', 'dlabel': 'Surviving', 'bubbles': [] }
		];
		this.ivls_op2 = [
		{'id': 1, 'level': 7, 'label': 'Service', 'dlabel': 'Serving', 'bubbles': [{'label': 'Vision: 12', 'state': 'PV'},{'label': 'Ease with Uncertainity: 8', 'state': 'PV'}] },
		{'id': 2, 'level': 6, 'label': 'Making a difference', 'dlabel': 'Integrating', 'bubbles': [] },
		{'id': 3, 'level': 5, 'label': 'Internal cohesion', 'dlabel': 'Self-actualizing', 'bubbles': [{'label': 'Creativity: 10', 'state':'PV'},{'label': 'Trust: 10', 'state':'PV'}] },
		{'id': 4, 'level': 4, 'label': 'Transformation', 'dlabel': 'Self-development', 'bubbles': [{'label': 'Continuos Learning: 4', 'state': 'PV'},{'label': 'Team work: 16', 'state':'PV'}] },
		{'id': 5, 'level': 3, 'label': 'Self-respect', 'dlabel': 'Differentiating', 'bubbles': [{'label': 'Short-term focus: 8', 'state':'LV'},{'label': 'Ambitious: 10', 'state': 'PV'}] },
		{'id': 6, 'level': 2, 'label': 'Relationships', 'dlabel': 'Conforming', 'bubbles': [{'label': 'Confusion: 8', 'state': 'LV'},{'label': 'Friendship: 11', 'state':'PV'}] },
		{'id': 7, 'level': 1, 'label': 'Survive', 'dlabel': 'Surviving', 'bubbles': [] }
		];
		this.ivls_op3 = [
		{'id': 1, 'level': 7, 'label': 'Service', 'dlabel': 'Serving', 'bubbles': [{'label': 'Vision : 11', 'state':'PV'}] },
		{'id': 2, 'level': 6, 'label': 'Making a difference', 'dlabel': 'Integrating', 'bubbles': [{'label': 'Coaching/Mentoring: 14', 'state':'PV'}] },
		{'id': 3, 'level': 5, 'label': 'Internal cohesion', 'dlabel': 'Self-actualizing', 'bubbles': [{'label': 'Clarity: 14', 'state':'PV'}] },
		{'id': 4, 'level': 4, 'label': 'Transformation', 'dlabel': 'Self-development', 'bubbles': [{'label': 'Continuos Learning: 9', 'state':'PV'},{'label': 'Adaptability: 9', 'state':'PV'},{'label': 'Balance (Work/life): 12', 'state':'PV'},{'label': 'Team work: 16', 'state':'PV'}] },
		{'id': 5, 'level': 3, 'label': 'Self-respect', 'dlabel': 'Differentiating', 'bubbles': [{'label': 'Professional Growth: 9', 'state': 'PV'},{'label': 'Acountability: 9', 'state':'PV'},{'label': 'Reward: 11', 'state': 'LV'}] },
		{'id': 6, 'level': 2, 'label': 'Relationships', 'dlabel': 'Conforming', 'bubbles': [] },
		{'id': 7, 'level': 1, 'label': 'Survive', 'dlabel': 'Surviving', 'bubbles': [] }
		];
		this.ivop = 'op1';
		this.ivls = this.ivls_op1;
  }

	showKnob(el, prop) {
		var bar = new ldBar('#' + el);
		bar.set( (this.cva[prop] * 10));
	}

	hideKnob(el, prop) {
		var bar = new ldBar('#' + el);
		bar.set(0);
	}
	ivopChange(opval){
		this.ivop = opval;
		if(this.ivls !== undefined){
		if(opval == 'op1')this.ivls = this.ivls_op1;

		if(opval == 'op2')this.ivls = this.ivls_op2;

		if(opval == 'op3')this.ivls = this.ivls_op3;
		}  
	}
	resetCountUp() {
		this.countUpView = false;
	}

	setCountUp() {
		this.countUpView = true;
	}
	initStuff() {
		let self = this;
	    self.resetCountUp();
	    setTimeout(function() { 
	      self.setCountUp();
	    }, 1000);
     
  }
	ngOnInit() {
		this.count = {
    countTo: 100,
    from: 0,
    duration: 1
};
		this.cva = {
			"executiveSummary": "This report gives us an overview of what is important to the customers, their current experiences and what they view to be important for the future of the organization.",
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
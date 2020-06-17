import { Component, OnInit, Input } from '@angular/core';

import { Project } from '../../models/project.model';

declare var ldBar: any;
@Component({
  selector: 'app-peoplespeakculture',
  templateUrl: './peoplespeakculture.component.html',
  styleUrls: ['./peoplespeakculture.component.css']
})
export class PeoplespeakcultureComponent implements OnInit {
  @Input() project: Project;
  public rcs: any; 
  public psk: any;
  constructor() {
  	 this.rcs = [
      {'code': 'rcwl2', 'prop': '4.13', 'label': 'Work-Life Balance', 'icon': 'balance-scale'},
      {'code': 'rcoe2', 'prop': '3.47', 'label': 'Culture', 'icon': 'sitemap'},
      {'code': 'rcsb2', 'prop': '3.98', 'label': 'Salary / Benefits', 'icon': 'wallet'},
      {'code': 'rcjc', 'prop': '3.53', 'label': 'Job Security', 'icon': 'user-shield'},
      {'code': 'rcmn', 'prop': '4.14', 'label': 'Management', 'icon': 'tasks'}
    ]
   }
 
 showKnob(el, prop) {
   var bar = new ldBar('#' + el);
    bar.set( (prop * 20)); 
  }

  hideKnob(el, prop) {
    var bar = new ldBar('#' + el);
    bar.set(0);
  }
  
  initStuff(prm1){
    this.project = prm1;
    let self = this;
    setTimeout(function() { 
        for(let rc of self.rcs) {
           self.hideKnob(rc.code, rc.prop);
          self.showKnob(rc.code, rc.prop);
        }

    }, 1000);
  }
  ngOnInit() {
    this.psk = {
      "executiveSummary": "People Speak is a comprehensive report telling your organizations's story with actionable insights taking into account factors that offer more value than internal employee engagement surveys.",
      "opinion_index": 3.9,
      "review": "34",
      "interview":"1",
      "ceo_approval":"90",
      "friend_recommend":"73",
      "rc_work_life_balance1": 3.63,
      "rc_org_experience1": 3.02,
      "rc_salary_benefits1": 3.98,
      "rc_job_security": 4.42,
      "rc_management": 3.88
    };

 
    
  }

}


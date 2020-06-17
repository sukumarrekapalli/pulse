import { Component, OnInit, Input } from '@angular/core';

import { Project } from '../../models/project.model';

declare var ldBar: any;

@Component({
  selector: 'app-peoplespeak',
  templateUrl: './peoplespeak.component.html',
  styleUrls: ['./peoplespeak.component.css']
})
export class PeoplespeakComponent implements OnInit {
  @Input() project: Project;
  public rcs: any;


  constructor() { 
    this.rcs = [
      {'code': 'rcwl', 'prop': 'rc_work_life_balance', 'label': 'Work-Life Balance', 'icon': 'balance-scale'},
      {'code': 'rcoe', 'prop': 'rc_org_experience', 'label': 'Organizational Experience', 'icon': 'sitemap'},
      {'code': 'rcsb', 'prop': 'rc_salary_benefits', 'label': 'Salary / Benefits', 'icon': 'wallet'},
      {'code': 'rcjc', 'prop': 'rc_job_security', 'label': 'Job Security', 'icon': 'user-shield'},
      {'code': 'rcmn', 'prop': 'rc_management', 'label': 'Management', 'icon': 'tasks'}
    ]
  }
  
  showKnob(el, prop) {
    var bar = new ldBar('#' + el);
    bar.set( (this.project.psk[prop] * 20));
    //$('.' + el).data('percent', (this.project.lsp[prop] * 10));
    //$('.' + el).loading();
  }

  hideKnob(el, prop) {
    var bar = new ldBar('#' + el);
    bar.set(0);
    //$('.' + el).data('percent', 0);
    //$('.' + el).loading();
  }
  ngOnInit() {
      
    this.project.psk = {
      "executiveSummary": "People Speak is a comprehensive report telling your company's story with actionable insights taking into account factors that offer more value than internal employee engagement surveys.<br>A mixed opinion on the work life balance but overall the company is a greate environment to learn, grow and nurture your skills in the specific fields.",
      "opinion_index": 3.7,
      "review": "1170",
      "interview":"693",
      "ceo_approval":"84",
      "friend_recommend":"62",
      "rc_work_life_balance": 3.7,
      "rc_org_experience": 4.2,
      "rc_salary_benefits": 2.4,
      "rc_job_security": 4.3,
      "rc_management": 2.4
    };

 
    let self = this;
    setTimeout(function() { 
        for(let rc of self.rcs) {
          self.hideKnob(rc.code, rc.prop);
        }

    }, 1000);
  }

}


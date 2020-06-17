import { Component, OnInit,Input } from '@angular/core';
import { Project } from '../../models/project.model';

declare var ldBar: any;
@Component({
  selector: 'app-compsentiment',
  templateUrl: './compsentiment.component.html',
  styleUrls: ['./compsentiment.component.css']
})
export class CompsentimentComponent implements OnInit {
 @Input() project: Project;
  public rcs: any;


  constructor() { 
    this.rcs = [
      {'code': 'rcwl1', 'prop': 'rc_work_life_balance', 'label': 'Reciprocity', 'icon': 'user-friends'},
      {'code': 'rcoe1', 'prop': 'rc_org_experience', 'label': 'Edge Density', 'icon': 'chart-line'},
      {'code': 'rcsb1', 'prop': 'rc_salary_benefits', 'label': 'Mean Distance', 'icon': 'chart-area'},
      {'code': 'rcjc1', 'prop': 'rc_job_security', 'label': 'Diameter', 'icon': 'circle-notch'},
      
    ]
  }
  
  showKnob(el, prop) {
    var bar = new ldBar('#' + el);
    bar.set( (this.project.pskcs[prop] * 20));
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
      
    this.project.pskcs = {
      "executiveSummary": "The Organizational Network Analysis was conducted on 1148 out of 2552 employees, covered 1658 employees in the organization and hearing 65% of your organization. Through the detailed report below we understand how the organization network operates to transfer information, handle friction and collaborate across functions. It helps us draw direct inferences to,\n\
                        <br>1. Predict attrition<br>2. Build future leaders <br>3. Identify the right organizational structure",
      "opinion_index": 1.25,
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

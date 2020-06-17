import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { from } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { Project } from '../../models/project.model';

declare var require: any;
var Highcharts = require('highcharts/highcharts.js');
declare var ldBar: any;

@Component({
  selector: 'app-leadershippulse',
  templateUrl: './leadershippulse.component.html',
  styleUrls: ['./leadershippulse.component.css']
})
export class LeadershippulseComponent implements OnInit {
  @Input() project: Project;
  public knobConfig: any;
  public knobValues: any;
  public rcs: any;
  public lsp: any;
  public competencies: any;
  public currentView: any;
  public ivls: any;
  public cvls: any;    
  public initLoaded: boolean;

  constructor() { 
    this.rcs = [
      {'code': 'rcea', 'prop': 'rc_entrepreneural_ability', 'color':'#07c0d2', 'cprop': 'cp_entrepreneural_ability', 'label': 'Entrepreneural Ability', 'icon': 'diagnoses', 'competency': 19},
      {'code': 'rcrs', 'prop': 'rc_resilience', 'color':'#f279af', 'cprop': 'cp_resilience', 'label': 'Resilience', 'icon': 'layer-group', 'competency': 23},
      {'code': 'rccm', 'prop': 'rc_crisis_management', 'color':'#9ecf74', 'cprop': 'cp_crisis_management', 'label': 'Crisis Management', 'icon': 'life-ring', 'competency': 21},
      {'code': 'rcic', 'prop': 'rc_innovation_creativity', 'color':'#e0a136', 'cprop': 'cp_innovation_creativity', 'label': 'Innovation and Creativity', 'icon': 'magic', 'competency': 13},
      {'code': 'rcdm', 'prop': 'rc_decision_making_agility', 'color':'#8c73c7', 'cprop': 'cp_decision_making_agility', 'label': 'Decision Making Agility', 'icon': 'directions', 'competency': 12},
      {'code': 'rccr', 'prop': 'rc_conflict_resolution', 'color':'#f73f59', 'cprop': 'cp_conflict_resolution', 'label': 'Conflict Resolution', 'icon': 'handshake', 'competency': 16}
    ];

    this.ivls = [
      {'id': 1, 'level': 7, 'label': 'Service', 'dlabel': 'Serving', 'bubbles': [] },
      {'id': 2, 'level': 6, 'label': 'Making a difference', 'dlabel': 'Integrating', 'bubbles': [] },
      {'id': 3, 'level': 5, 'label': 'Internal cohesion', 'dlabel': 'Self-actualizing', 'bubbles': [] },
      {'id': 4, 'level': 4, 'label': 'Transformation', 'dlabel': 'Self-development', 'bubbles': [] },
      {'id': 5, 'level': 3, 'label': 'Self-respect', 'dlabel': 'Differentiating', 'bubbles': [] },
      {'id': 6, 'level': 2, 'label': 'Relationships', 'dlabel': 'Conforming', 'bubbles': [] },
      {'id': 7, 'level': 1, 'label': 'Survive', 'dlabel': 'Surviving', 'bubbles': [] }
    ];

    this.cvls = [
      
    ];

    this.lsp = {};
    this.competencies = [];
    this.initLoaded = false;

  }

  showKnob(el, prop) {
      console.log(el, prop);
    var bar = new ldBar('#' + el);
    bar.set( (this.lsp[prop] * 20));console.log((this.lsp[prop] ));
    //$('.' + el).data('percent', (this.project.lsp[prop] * 10));
    //$('.' + el).loading();
  }

  hideKnob(el, prop) {
    var bar = new ldBar('#' + el);
    bar.set(0);
    //$('.' + el).data('percent', 0);
    //$('.' + el).loading();
  }

  
  loadCompChart() {
    var series = []; var colors = [];
    for(let rc of this.rcs) {
//      series.push([rc.label, Number(this.competencies[rc.cprop])]);
        series.push([rc.label, Number( this.lsp[rc.prop])]);
        
      colors.push(rc.color);
    }

    Highcharts.chart('comp_chart', {
        chart: {
            type: 'pie',
            backgroundColor: 'transparent',
            margin: [0, 0, 50, 0],
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: ''
        },
        'credits': { enabled: false },
        subtitle: {
            text: ''
        },
        tooltip: {
//            formatter: function() {
//                console.log(this);
//                console.log(this.lsp);
//                 return '<b>'+ Highcharts.numberFormat(this.y, 0) +'</b><br/>'+
//        'in year: '+ this.point.name;
//            }
//            this.lsp[prop]
            pointFormat: '{series.name}: <b>{point.y:.1f}</b>'
        },
        legend: {
          enabled: true,
          align: 'center',
           layout: 'horizontal',
          verticalAlign: 'bottom',
          itemStyle: {
            color: '#333',
            fontSize: 8,
            position: 'fixed'
          },
          width: '100%',
          y: 20
        },
      
        plotOptions: {
            pie: {
              colors: colors,
              dataLabels: {
                enabled: false,
              },
              innerSize: 100,
              depth: 45,
              showInLegend: true,
              point: {
                events: {
                  legendItemClick: function(){
                    
                    return false;
                  }
                }
              }
            }
        },
        series: [{
            name: 'Competency',
            data:series
        }]
    });
  }

  switchView(view) {
    this.currentView = view;

    if(view === 'lsp') {
      this.lsp = Object.assign({}, this.project.lsp) ;
      this.competencies = Object.assign({}, this.project.competencies) ;
    }
    else if(view === 'ilsp' && this.project.ilsp !=='') {
      this.lsp = Object.assign({}, this.project.ilsp) ;
      this.competencies = Object.assign({}, this.project.icompetencies) ;
    }
    this.loadCompChart();
  }

  setupIValues() {
    if(this.project.myparticipant !== '') {
      // identify personal values question
      let pv_question = this.project.survey_questions.find(q => q.question_type === 'cva' && q.question_text.toLowerCase() === 'personal values');

      if(pv_question !== undefined) {          
        // find my answers in survey answers
        let my_answers = this.project.survey_answers.filter(ans => ans.employee_id === this.project.myparticipant.id && ans.question_id === pv_question.id );
        if(my_answers !== undefined) {
          for(let ans of my_answers) {
            let value = this.project.values.find(v => v.value.toLowerCase() === ans.answer.toLowerCase());
            if(value !== undefined) {
              for(let ivl of this.ivls) {
                if(Number(ivl.level) === Number(value.level)) {
                  ivl.bubbles.push({'label': value.value, 'state': value.pvlv});
                }
              }
            }
          }
        }
      }

    }
  }

  setupCValues() {
    let pv_question = this.project.survey_questions.find(q => q.question_type === 'cva' && q.question_text.toLowerCase() === 'personal values');

      if(pv_question !== undefined) {          
        // find my answers in survey answers
        let answers = this.project.survey_answers.filter(ans => ans.question_id === pv_question.id );
        if(answers !== undefined) {
          let ans_values = []; let ansv_data = [];
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

          
          ans_values.sort((a,b)=> b.count - a.count);
          this.cvls = ans_values.slice(0, 10);
          let i = 1;
          for(let cvl of this.cvls) {
            cvl.id = i++;
          }
//          console.log(this.cvls);
        }
      }
  }

  initStuff() {
    console.log("inside ls istuf");
    if(this.initLoaded === false) {
      let self = this;
      setTimeout(function() { 
          if(self.project.ilsp !== '') {
            self.switchView('ilsp');
            self.setupIValues();
          }
          else {
            self.switchView('lsp');
          }
          self.setupCValues();
          for(let rc of self.rcs) {
            self.hideKnob(rc.code, rc.prop);
          }
          //self.loadCompChart();
          self.initLoaded = true;
      }, 600);
    }
  }

  ngOnInit() {

    console.log(this.project);
  }



}

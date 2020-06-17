import { Component, OnInit, Input } from '@angular/core';

import { Project } from '../../models/project.model';

declare var ldBar: any;
declare var require: any;
var Highcharts = require('highcharts/highcharts.js');

@Component({
  selector: 'app-bns',
  templateUrl: './bns.component.html',
  styleUrls: ['./bns.component.css']
})
export class BnsComponent implements OnInit {
  @Input() project: Project;
  public rcs: any;
  public bnsTab: any;
  public tdData: any;
  public initLoaded: boolean;


  constructor() { 
    this.rcs = [
      {'code': 'rcfc', 'prop': 'rc_finance', 'color':'#07c0d2', 'label': 'Finance', 'icon': 'money-bill-alt', 'cov': 12.4, 'dov': 13.2, 'plv': -3, 'ctd': 21.3, 'dtd': 17.4 },
      {'code': 'rcfn', 'prop': 'rc_fitness', 'color':'#f279af', 'label': 'Fitness', 'icon': 'dumbbell', 'cov': 11.2, 'dov': 14.1, 'plv': -1, 'ctd': 16.1, 'dtd': 24.8},
      {'code': 'rcesr', 'prop': 'rc_esr', 'color':'#9ecf74', 'label': 'External Stakeholder Relationship', 'cov': 12.4, 'dov': 13.2, 'plv': -0.5, 'icon': 'hand-holding-usd', 'ctd': 27.6, 'dtd': 22.8},
      {'code': 'rcev', 'prop': 'rc_evolution', 'color':'#e0a136', 'label': 'Evolution', 'icon': 'industry', 'cov': 12.4, 'dov': 13.2, 'plv': -2, 'ctd': 26.3, 'dtd': 24.5},
      {'code': 'rctd', 'prop': 'rc_tdyn', 'color':'#8c73c7', 'label': 'Team Dynamics', 'icon': 'users-cog', 'cov': 12.4, 'dov': 13.2, 'plv': -2.7, 'ctd': 31.2, 'dtd': 34.9},
      {'code': 'rcsc', 'prop': 'rc_soc', 'color':'#f73f59', 'label': 'Social Contribution', 'icon': 'people-carry', 'cov': 12.4, 'dov': 13.2, 'plv': -3, 'ctd': 21.2, 'dtd': 17.8} 
    ];

    this.bnsTab = 'ctd';
    this.initLoaded = false;
    this.tdData = {
      'ctd': [
        {'label': ''}
      ]
    };
  }
  
  showKnob(el, prop) {
    var bar = new ldBar('#' + el);
    bar.set( (this.project.bns[prop] * 20));
    console.log((this.project.bns[prop] * 20));
    //$('.' + el).data('percent', (this.project.lsp[prop] * 10));
    //$('.' + el).loading();
  }

  hideKnob(el, prop) {
    var bar = new ldBar('#' + el);
    bar.set(0);
    //$('.' + el).data('percent', 0);
    //$('.' + el).loading();
  }

  switchBnsTab(tab) {
    this.bnsTab = tab;
    var series = []; var colors = [];
    for(let rc of this.rcs) {
      series.push([rc.label, Number(rc[tab])]);
      colors.push(rc.color);
    }
    let self = this;
    setTimeout(function() { 
      let title = (tab === 'ctd') ? 'Current' : 'Desired';
      self.generateBnsChart(tab+'_chart', series, colors, title);

    }, 100);
  }

  generateBnsChart(container, series, colors, title) {

    Highcharts.chart(container, {
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
            formatter: function() {
                if (container == 'ctd_chart' ){
                    if(this.key =='Finance'){ return false;}
                    if(this.key =='Fitness'){ return 'Bureaucracy';}
                    if(this.key =='External Stakeholder Relationship'){ return 'Client satisfaction, <br> brand'; }
                    if(this.key =='Evolution'){ return 'Continuous improvement';}
                    if(this.key =='Team Dynamics'){ return 'Teamwork,<br> Accountability,<br> Commitment,<br> Hierarchy,<br> Caring';}
                    if(this.key =='Social Contribution'){ return 'Making a difference';}

                }
                if (container == 'dtd_chart' ){
                    if(this.key =='Finance'){ return false;}
                    if(this.key =='Fitness'){ return 'Professionalism';}
                    if(this.key =='External Stakeholder Relationship'){ return 'Client satisfaction'; }
                    if(this.key =='Evolution'){ return 'Continuous improvement,<br>Adaptability';}
                    if(this.key =='Team Dynamics'){ return 'Accountability,<br>	Teamwork,<br> Employee fulfillment,<br>	Open Communication,<br> Information Sharing,<br> Respect';}
                    if(this.key =='Social Contribution'){ return false;}
                }
            }
        },
        legend: {
          enabled: true,
          align: 'center',
          verticalAlign: 'bottom',
          itemStyle: {
            color: '#333',
            fontSize: 8,
            position: 'fixed'
            
          },
          layout: 'horizontal',
          width: '100%',
          y: 20
        },
    
        plotOptions: {
            pie: {
              colors: colors,
              dataLabels: {
                enabled: false,
              },
              innerSize: 80,
              depth: 45,
              showInLegend: true
            }
        },
        series: [{
            
            name: title + ' Team Dynamics',
            data:series
        }]
    });
  }

  setupBarChart() {
    let series = [{
      name: 'Current Organizational Values',
      color:"#94c039",
      data: []
  }, {
      name: 'Desired Organizational Values',
      color:"#f1a246",
      data: []
  }, {
      name: 'Potentially Limiting Values',
      color:"#ec3237",
      data: []
  }]; let categories = [];

    for(let rc of this.rcs) {
      categories.push(rc.label)
      series[0].data.push(rc.cov);
      series[1].data.push(rc.dov);
      series[2].data.push(rc.plv);
    }

    Highcharts.chart('bnsbarchart1', {
        chart: {
            type: 'column',
            backgroundColor: 'transparent',
            margin: [0, 0, 50, 0],
            plotBackgroundColor: null,
            plotBorderWidth: null,
             tooltip: { enabled: false },
            plotShadow: false
        },
        title: {
            text: ''
        },
        plotOptions: {
        series: {
          showInLegend: false,
           enableMouseTracking: true,
            dataLabels: {
                   
//                    enabled: true,
//                    align: 'right',
//                    color: '#294469',
//                    shadow: false,
////                    x: -20,
//                    style: {"fontSize": "8px", "textShadow": "0px" ,"fontWeight": "normal"},
//               
//               formatter:function() 
//                {
//                    console.log(this.series.columnIndex);
//                  if(this.series.columnIndex == 2){
//                   return this.x;
//                  }else{
//                      return '';
//                  }
//                }
             }
        }
    },
        xAxis: {
            categories: categories,
            labels: { enabled: false},
            gridLineWidth: 1,
            lineWidth: 0
        },
        yAxis: {
          lineColor: '#FF0000',
          lineWidth: 1,
          gridLineWidth: 0,
          plotLines: [{
            color: '#999999',
            width: 1,
            value: 0
        }]
        },
        credits: {
            enabled: false
        },
        legend: {
          enabled: true,
          align: 'center',
          verticalAlign: 'bottom',
          itemStyle: {
            color: '#333',
            fontSize: 8,
            position: 'fixed'
            
          },
          layout: 'horizontal',
          width: '100%',
          y: 20
        },
        series: series
    });
  }
  
  initStuff() {    
    console.log('inside bns initstuff');
    let self = this;
    setTimeout(function() { 
        for(let rc of self.rcs) {
          self.hideKnob(rc.code, rc.prop);
        }
        self.switchBnsTab('ctd');
        self.setupBarChart();

    }, 1000);
  }

  ngOnInit() {
    this.project.bns = {
      "executiveSummary": "The Business Needs Scorecard (BNS) provides a strategic lens on the top current and desired culture values. It maps the top values in the Values Plot onto a six-part scorecard including, Social Contribution, Fitness, Finance, External Stakeholder Relations, Evolution, and Team Dynamics. The area of Team Dynamics is broken down in three further sub-sections; Trust/ Engagement, Direction/ Communication and Supportive Environment. High performance cultures show an even distribution of values accross all six segments of the scorecard.",
      "opinion_index": "324 Mn",
      "review": "1170",
      "interview":"693",
      "ceo_approval":"84",
      "friend_recommend":"62",
      "rc_finance": 2.7,
      "rc_fitness": 3.2,
      "rc_esr": 2.9,
      "rc_evolution": 4.3,
      "rc_tdyn": 3.1,
      "rc_soc": 2.2
    };
      //this.setInitStuff();
  }

}


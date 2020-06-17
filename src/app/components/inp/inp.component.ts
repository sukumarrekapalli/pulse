import { Component, OnInit, Input } from '@angular/core';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';

import { Project } from '../../models/project.model';

declare var ldBar: any;
declare var require: any;
var Highcharts = require('highcharts/highcharts.js');

@Component({
  selector: 'app-inp',
  templateUrl: './inp.component.html',
  styleUrls: ['./inp.component.css']
})
export class InpComponent implements OnInit {
  @Input() project: Project;
  public rcs: any;
  public inpTab: any;
  public tdData: any;
  public initLoaded: any;

  options: CloudOptions = {
    overflow: false,
    width: 440,
    height: 200
  };
 
  data: CloudData[] = [
    {text: 'Innovation', weight: 3, color: '#07c0d2' },
    {text: 'Growth', weight: 2, color: '#9ecf74'},
    {text: 'IoT', weight: 4, color: '#f73f59', "rotate": 90},
    {text: 'Digital', weight: 2, color: '#07c0d2'},
    {text: 'Supplier', weight: 1, color: '#f279af'},
    {text: 'Efficiency', weight: 4, color: '#8c73c7'},
    {text: 'CSR', weight: 6, color: '#f279af'},
    {text: 'Entrepreneurial', weight:4, color: '#e0a136'}
  ];

  constructor() { 
    this.rcs = [
      {'code': 'rcfc', 'prop': 'rc_finance', 'color':'#07c0d2', 'label': 'Finance', 'icon': 'money-bill-alt', 'cov': 12.4, 'dov': 13.2, 'plv': -3, 'ctd': 21.3, 'dtd': 17.4 },
      {'code': 'rcfn', 'prop': 'rc_fitness', 'color':'#f279af', 'label': 'Fitness', 'icon': 'dumbbell', 'cov': 11.2, 'dov': 14.1, 'plv': -2.7, 'ctd': 16.1, 'dtd': 24.8},
      {'code': 'rcesr', 'prop': 'rc_esr', 'color':'#9ecf74', 'label': 'External Stakeholder Relationship', 'cov': 12.4, 'dov': 13.2, 'plv': -3, 'icon': 'hand-holding-usd', 'ctd': 27.6, 'dtd': 22.8},
      {'code': 'rcev', 'prop': 'rc_evolution', 'color':'#e0a136', 'label': 'Evolution', 'icon': 'industry', 'cov': 12.4, 'dov': 13.2, 'plv': -3, 'ctd': 26.3, 'dtd': 24.5},
      {'code': 'rctd', 'prop': 'rc_tdyn', 'color':'#8c73c7', 'label': 'Team Dynamics', 'icon': 'users-cog', 'cov': 12.4, 'dov': 13.2, 'plv': -3, 'ctd': 31.2, 'dtd': 34.9},
      {'code': 'rcsc', 'prop': 'rc_soc', 'color':'#f73f59', 'label': 'Social Contribution', 'icon': 'people-carry', 'cov': 12.4, 'dov': 13.2, 'plv': -3, 'ctd': 21.2, 'dtd': 17.8}
    ];
    this.inpTab = 'ctd';
    this.initLoaded = false;
    this.tdData = {
      'ctd': [
        {'label': ''}
      ]
    };
  }
  
  showKnob(el, prop) {
    var bar = new ldBar('#' + el);
    bar.set( (this.project.inp[prop] * 20));
    console.log((this.project.inp[prop] * 20));
    //$('.' + el).data('percent', (this.project.lsp[prop] * 10));
    //$('.' + el).loading();
  }

  hideKnob(el, prop) {
    var bar = new ldBar('#' + el);
    bar.set(0);
    //$('.' + el).data('percent', 0);
    //$('.' + el).loading();
  }

  switchInpTab(tab) {
    this.inpTab = tab;
    var series = []; var colors = [];
    for(let rc of this.rcs) {
      series.push([rc.label, Number(rc[tab])]);
      colors.push(rc.color);
    }
    let self = this;
    setTimeout(function() { 
      let title = (tab === 'ctd') ? 'Current' : 'Desired';
      self.generateInpChart(tab+'_chart', series, colors, title);

    }, 100);
  }

  generateInpChart(container, series, colors, title) {

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
            pointFormat: '{series.name}: <b>{point.percentage:.1f}</b>'
        },
        legend: {
          enabled: true,
          align: 'center',
          verticalAlign: 'bottom',
          itemStyle: {
            color: '#333',
            fontSize: 9
            
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
    
    Highcharts.chart('inpstackchart1', {
    
      chart: {
        type: 'column',
        backgroundColor: 'transparent',
        margin: [0, 90, 0, 0],
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false
    },
    title: {
        text: ''
    },
    credits: { enabled: false },
    xAxis: {
        categories: ['Mar', 'Apr', 'May', 'Jun', 'Jul'],
        lineWidth: 1,
    },
    yAxis: {
      lineWidth: 1,
        min: 0,
        title: {
            text: '',
            enabled: false
        },
        stackLabels: {
            enabled: true,
            style: {
                fontSize: 9,
                color:'#333'
            }
        },
        plotLines: [{
          color: '#999999',
          width: 1,
          value: 0
      }]
    },
    legend: {
        align: 'right',
        verticalAlign: 'middle',
        itemStyle: {
          color: '#333',
          fontSize: 9
          
        },
        width: 120,
        x: 40
    },
    tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
    },
    plotOptions: {
        column: {
            stacking: 'normal',
            dataLabels: {
                enabled: false
            }
        }
    },
    series: [{
      name: 'Strong Buy',
      color:'#07c0d2',
      data: [5, 3, 4, 7, 2]
      }, {
        name: 'Buy',
        color:'#f279af',
        data: [2, 2, 3, 2, 1]
    }, {
        name: 'Hold',
        color:'#9ecf74',
        data: [3, 4, 4, 2, 5]
    }, {
        name: 'Underperform',
        color:'#8c73c7',
        data: [2, 2, 3, 2, 1]
    }, {
        name: 'Sell',
        color:'#f73f59',
        data: [3, 4, 4, 2, 5]
    }]
  
    
    
    })

  }

  initStuff() {
    if(this.initLoaded === false) {
      let self = this;
      setTimeout(function() { 
          for(let rc of self.rcs) {
            //self.hideKnob(rc.code, rc.prop);
            //self.switchInpTab('ctd');
          }
          self.setupBarChart();
          self.initLoaded = true;
      }, 500);
    }
  }

  ngOnInit() {
      
    this.project.inp = {
      "executiveSummary": "The Business Needs Scorecard (BNS) provides a strategic lens on the top current and desired culture values. It maps the top values in the Values Plot onto a six-part scorecard including, Social Contribution, Fitness, Finance, External Stakeholder Relations, Evolution, and Team Dynamics. The area of Team Dynamics is broken down in three further sub-sections; Trust/ Engagement, Direction/ Communication and Supportive Environment. High performance cultures show an even distribution of values accross all six segments of the scorecard.",
      "opinion_index": "XYZ $",
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

   //this.initStuff();


    
  }

}


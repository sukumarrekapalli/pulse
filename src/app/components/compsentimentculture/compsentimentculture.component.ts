import { Component, OnInit,Input, ViewChild } from '@angular/core';
import { Project } from '../../models/project.model';
import { DataService } from '../../services/data.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AuthenticationService } from '../../services/authentication.service';
import { ActivatedRoute } from '@angular/router';
 import Swal from 'sweetalert2';
declare var ldBar: any;
declare var require: any;
var Highcharts = require('highcharts/highcharts.js');
var HighchartsNetworkgraph = require('highcharts/modules/networkgraph.js');

HighchartsNetworkgraph(Highcharts); 

@Component({
  selector: 'app-compsentimentculture',
  templateUrl: './compsentimentculture.component.html',
  styleUrls: ['./compsentimentculture.component.css']
})
export class CompsentimentcultureComponent implements OnInit {
  @Input() project: Project;
 @BlockUI() blockUI: NgBlockUI;
 @ViewChild('auto') auto;

  public rcs: any;
  public networkdata: any;
  public networkdata_hangout: any;
  public networkdata_info_repo: any;
  public branchlist: any;
  public allnetworkdata: any;
  public democut_tnl: any;
  public democut_ti: any;
  public selectedbranch: any;
  public psk: any;
  public dashflag: boolean;
  constructor(
        private dataService: DataService,
        private route: ActivatedRoute,
        private authService: AuthenticationService
      ) {
    this.dashflag = false;

  	 this.rcs = [
      {'code': 'rcwl1', 'prop': '3.7', 'label': 'Social Dynamics', 'icon': 'user-friends', 'pop_desc':'Measures the health of individual interactions and behaviors of the group at the Bank.'},
      {'code': 'rcoe1', 'prop': '4.2', 'label': 'Employee Importance', 'icon': 'chart-line', 'pop_desc':'A measure of how important every employee feels in the organization, team and the role they are currently in.'},
      {'code': 'rcsb1', 'prop': '2.4', 'label': 'Information Flow', 'icon': 'chart-area', 'pop_desc':'Measures the health of information flow across the network, among cliques and influencers in the bank.'},
      {'code': 'rcjc1', 'prop': '4.3', 'label': 'Community Structure', 'icon': 'circle-notch', 'pop_desc':'A measure of how the cliques, influencers, and the overall network is structured within the organization.'},
      
    ]
   }
   showKnob(el, prop) {
    var bar = new ldBar('#' + el);
    bar.set( (this.psk[prop] * 20));
   }

  hideKnob(el, prop) {
    var bar = new ldBar('#' + el);
    bar.set(0);
  }
   initStuff(){
    let self = this;
    setTimeout(function() { 
        for(let rc of self.rcs) {
          self.hideKnob(rc.code, rc.prop);
          self.showKnob(rc.code, rc.prop);
        }

    }, 1000);
  } 
 
  getemployeedata(){
    let answers;
    let filter_onaresult = [];
    if(this.selectedbranch === 'all'){
        this.networkdata = this.allnetworkdata.emp_survey_answers;
        
        let topleader = this.allnetworkdata.ona_result.sort(function(obj1, obj2) {
          return obj2.network_leadership_scores - obj1.network_leadership_scores;
        }); 
        this.democut_tnl = topleader.slice(0, 5);
        
        let topinfluencer = this.allnetworkdata.ona_result.sort(function(obj1, obj2) {
          return obj2.influencer_scores - obj1.influencer_scores;
        }); 
        this.democut_ti = topinfluencer.slice(0, 5);

        let inforepodata = this.networkdata.filter(ans => ans.question_id === '6');
        this.networkdata_info_repo = inforepodata;

        let hangoutdata = this.networkdata.filter(ans => ans.question_id === '8');
        this.networkdata_hangout = hangoutdata;

    }

    if(this.selectedbranch != 'all'){
      let answers = this.allnetworkdata.emp_survey_answers.filter(ans => ans.branch_name.toLowerCase() === this.selectedbranch.toLowerCase());
      if(answers.length > 0 ) { 
        this.networkdata = answers;
      } else{
        Swal.fire('SORRY', 'Data is not available for this branch', 'error');
         this.networkdata = [];
      }

      let inforepodata = this.networkdata.filter(ans => ans.question_id === '6',ans => ans.branch_name.toLowerCase() === this.selectedbranch.toLowerCase());
      this.networkdata_info_repo = inforepodata;

      let hangoutdata = this.networkdata.filter(ans => ans.question_id === '8',ans => ans.branch_name.toLowerCase() === this.selectedbranch.toLowerCase());
      this.networkdata_hangout = hangoutdata;


      let answers_democut = this.allnetworkdata.ona_result.filter(ans => ans.branch_name.toLowerCase() === this.selectedbranch.toLowerCase());
      let topleader = answers_democut.sort(function(obj1, obj2) {
        return obj2.network_leadership_scores - obj1.network_leadership_scores;
      }); 
      this.democut_tnl = topleader.slice(0, 5);
      
      let topinfluencer = answers_democut.sort(function(obj1, obj2) {
        return obj2.influencer_scores - obj1.influencer_scores;
      }); 
      this.democut_ti = topinfluencer.slice(0, 5);
    }
    this.sentimentGraphs();
   }

  ngOnInit() {
//     this.dataService.getSurveyEmployee(this.project.id).subscribe(
//     data => {
//       console.log(data);
//          this.allnetworkdata = data;
//          console.log(this.allnetworkdata);
//          this.branchlist = data.all_branches; 
//          this.selectedbranch = this.branchlist[0].branch_name;
//          this.getemployeedata();
//          this.blockUI.stop();
//     },
//     err => {
//       console.log("inside org list error", JSON.stringify(err.message));
//       alert(JSON.stringify(err.message));
//       this.blockUI.stop();
// });


  	this.psk = {
      "executiveSummary": "The Organizational Network Analysis covered 64% of the employees. Through the detailed report below we understand how the bank network operates to transfer information, handle friction and collaborate across functions. It helps us draw direct inferences to,\n\
                        <br>1. Group Dynamics<br>2. Identify Influencers  <br>3. Inferences to the adoption of effective communication channels",
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
    // this.generateTopNetworkLeaderGraph();
  }

 sentimentGraphs(){
    var seriesdata = []; var seriesdata_hangout = []; var seriesdata_tirepo = []; var colors = [];
    for(let empbranch of this.networkdata) {
      seriesdata.push([empbranch.network_graph_respondent,empbranch.network_graph_response]);
    }

    for(let ti_repo of this.networkdata_info_repo) {
      seriesdata_tirepo.push([ti_repo.network_graph_respondent,ti_repo.network_graph_response]);
    }

    for(let hngoutdt of this.networkdata_hangout) {
      seriesdata_hangout.push([hngoutdt.network_graph_respondent,hngoutdt.network_graph_response]);
    }


  
   
   Highcharts.addEvent(
    Highcharts.Series,
    'afterSetOptions',
    function (e) {
        var colors = Highcharts.getOptions().colors,
            i = 0,
            nodes = {};

        if (
            this instanceof Highcharts.seriesTypes.networkgraph
        ) {
            e.options.data.forEach(function (link) {
              // console.log(colors[i]);
                if (link[i]) {
                    
                    nodes[link[i]] = {
                        id: link[i],
                        marker: {
                            radius: 10
                        },
                        color: colors[i]
                    };
                     i++;
                } else if (nodes[link[i]] && nodes[link[i]].color) {
                    nodes[link[i+1]] = {
                        id: link[i+1],
                        color: nodes[link[i]].color
                    };
                }
                
              });
              e.options.nodes = Object.keys(nodes).map(function (id) {
                  return nodes[id];
              });
             
            }
          }
    );

    Highcharts.chart('tnl_networkgraphcontainer', {
    chart: {
        type: 'networkgraph',
        height: '50%'
    },
    title: {
        text: ''
    },
    credits: {
            enabled: false
        },
        
    plotOptions: {
        networkgraph: {
            keys: ['from', 'to'],
           layoutAlgorithm: {
                enableSimulation: false,
                linkLength:150,
                integration: 'verlet',
                friction: -1
            },
            link: {
                color: '#9688e0'
            }
        }
    },
    series: [{
        dataLabels: {
            enabled: true,
            linkFormat: ''
        },
        id: 'lang-tree',
        data: seriesdata
      }]
  });

  Highcharts.chart('ti_networkgraphcontainer', {
    chart: {
        type: 'networkgraph',
        height: '50%'
    },
    title: {
        text: ''
    },
    credits: {
            enabled: false
        },
        
    plotOptions: {
        networkgraph: {
            keys: ['from', 'to'],
           layoutAlgorithm: {
                enableSimulation: false,
                linkLength:150,
                integration: 'verlet',
                // friction: -0.9
            },
            link: {
                color: '#9688e0'
            }
        }
    },
    series: [{
        dataLabels: {
            enabled: true,
            linkFormat: ''
        },
        id: 'lang-tree1',
        data:seriesdata
      }]
  });

  Highcharts.chart('tir_networkgraphcontainer', {
    chart: {
        type: 'networkgraph',
        height: '50%'
    },
    title: {
        text: ''
    },
    credits: {
            enabled: false
        },
        
    plotOptions: {
        networkgraph: {
            keys: ['from', 'to'],
           layoutAlgorithm: {
                enableSimulation: false,
                linkLength:150,
                integration: 'verlet',
                // friction: -0.9
            },
            link: {
                color: '#9688e0'
            }
        }
    },
    series: [{
        dataLabels: {
            enabled: true,
            linkFormat: ''
        },
        id: 'lang-tree1',
        data: seriesdata_tirepo
      }]
  });
   
  Highcharts.chart('tfh_networkgraphcontainer', {
    chart: {
        type: 'networkgraph',
        height: '50%'
    },
    title: {
        text: ''
    },
    credits: {
            enabled: false
        },
        
    plotOptions: {
        networkgraph: {
            keys: ['from', 'to'],
           layoutAlgorithm: {
                enableSimulation: false,
                linkLength:150,
                integration: 'verlet',
                // friction: -0.9
            },
            link: {
                color: '#9688e0'
            }
        }
    },
    series: [{
        dataLabels: {
            enabled: true,
            linkFormat: ''
        },
        id: 'lang-tree1',
        data: seriesdata_hangout
      }]
  });   
  }
 
}

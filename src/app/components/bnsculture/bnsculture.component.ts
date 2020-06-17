import { Component, OnInit, Input } from '@angular/core';

import { Project } from '../../models/project.model';

declare var ldBar: any;
declare var require: any;
var Highcharts = require('highcharts/highcharts.js');

@Component({
	selector: 'app-bnsculture',
	templateUrl: './bnsculture.component.html',
	styleUrls: ['./bnsculture.component.css']
}) 
export class BnscultureComponent implements OnInit {
	@Input() project: Project;
	public rcs: any;
	public bnsTab: any;
	public tdData: any;
	public initLoaded: boolean;
	public currentView: any;
	public rcschart: any;
	public cschart: any;
	 public bns: any; 
	constructor() { 
		this.rcs = [
		{'code': 'rcfc', 'prop': '2.7', 'color':'#07c0d2', 'label': 'Finance', 'icon': 'money-bill-alt', 'cov': 12.4, 'dov': 13.2, 'plv': -3, 'cov1': 14.4, 'dov1': 14.2, 'plv1': -3, 'ctd': 21.3, 'dtd': 17.4, 'ctd1': 21.3, 'dtd1': 17.4},
		{'code': 'rcfn', 'prop': '3.2', 'color':'#f279af', 'label': 'Fitness', 'icon': 'dumbbell', 'cov': 11.2, 'dov': 14.1, 'plv': -1, 'cov1': 12.2, 'dov1': 11.1, 'plv1': -2, 'ctd': 16.1, 'dtd': 24.8, 'ctd1': 16.1, 'dtd1': 24.8},
		{'code': 'rcesr', 'prop': '2.9', 'color':'#9ecf74', 'label': 'External Stakeholder Relationship', 'cov': 12.4, 'dov': 13.2, 'plv': -0.5, 'cov1': 14.4, 'dov1': 11.2, 'plv1': -0.3, 'icon': 'hand-holding-usd', 'ctd': 27.6, 'dtd': 22.8, 'ctd1': 27.6, 'dtd1': 22.8},
		{'code': 'rcev', 'prop': '4.3', 'color':'#e0a136', 'label': 'Evolution', 'icon': 'industry', 'cov': 12.4, 'dov': 13.2, 'plv': -2, 'cov1': 11.4, 'dov1': 12.2, 'plv1': -3, 'ctd': 26.3, 'dtd': 24.5, 'ctd1': 26.3, 'dtd1': 24.5},
		{'code': 'rctd', 'prop': '3.1', 'color':'#8c73c7', 'label': 'Team Dynamics', 'icon': 'users-cog', 'cov': 12.4, 'dov': 13.2, 'plv': -2.7, 'cov1': 11.4, 'dov1': 12.2, 'plv1': -1.7, 'ctd': 31.2, 'dtd': 34.9, 'ctd1': 31.2, 'dtd1': 34.9},
		{'code': 'rcsc', 'prop': '2.2', 'color':'#f73f59', 'label': 'Social Contribution', 'icon': 'people-carry', 'cov': 12.4, 'dov': 13.2, 'plv': -3, 'cov1': 14.4, 'dov1': 11.2, 'plv1': -3, 'ctd': 21.2, 'dtd': 17.8, 'ctd1': 21.2, 'dtd1': 17.8} 
		];
		this.rcschart = [
		{'code': 'rcfc', 'prop': 'rc_finance', 'color':'#07c0d2', 'label': 'Finance', 'icon': 'money-bill-alt', 'cov': 12.4, 'dov': 13.2, 'plv': -3, 'cov1': 14.4, 'dov1': 14.2, 'plv1': -3, 'ctd': 21.3, 'dtd': 17.4, 'ctd1': 21.3, 'dtd1': 17.4},
		{'code': 'rcfn', 'prop': 'rc_fitness', 'color':'#f279af', 'label': 'Fitness', 'icon': 'dumbbell', 'cov': 11.2, 'dov': 14.1, 'plv': -1, 'cov1': 12.2, 'dov1': 11.1, 'plv1': -2, 'ctd': 16.1, 'dtd': 24.8, 'ctd1': 16.1, 'dtd1': 24.8},
		{'code': 'rcesr', 'prop': 'rc_esr', 'color':'#9ecf74', 'label': 'External Stakeholder Relationship', 'cov': 12.4, 'dov': 13.2, 'plv': -0.5, 'cov1': 14.4, 'dov1': 11.2, 'plv1': -0.3, 'icon': 'hand-holding-usd', 'ctd': 27.6, 'dtd': 22.8, 'ctd1': 27.6, 'dtd1': 22.8},
		{'code': 'rcev', 'prop': 'rc_evolution', 'color':'#e0a136', 'label': 'Evolution', 'icon': 'industry', 'cov': 12.4, 'dov': 13.2, 'plv': -2, 'cov1': 11.4, 'dov1': 12.2, 'plv1': -3, 'ctd': 26.3, 'dtd': 24.5, 'ctd1': 26.3, 'dtd1': 24.5},
		{'code': 'rctd', 'prop': 'rc_tdyn1', 'color':'#8c73c7', 'label': 'Trust/Engagement', 'icon': 'users-cog', 'cov': 12.4, 'dov': 13.2, 'plv': -2.7, 'cov1': 11.4, 'dov1': 12.2, 'plv1': -1.7, 'ctd': 10.2, 'dtd': 11.9, 'ctd1': 12.2, 'dtd1': 12.9},
		{'code': 'rctd', 'prop': 'rc_tdyn2', 'color':'#8c73c7', 'label': 'Direction/ Communication', 'icon': 'users-cog', 'cov': 12.4, 'dov': 13.2, 'plv': -2.7, 'cov1': 11.4, 'dov1': 12.2, 'plv1': -1.7, 'ctd': 10.2, 'dtd': 11.9, 'ctd1': 6.2, 'dtd1': 9.9},
		{'code': 'rctd', 'prop': 'rc_tdyn3', 'color':'#8c73c7', 'label': 'Supportive Environment', 'icon': 'users-cog', 'cov': 12.4, 'dov': 13.2, 'plv': -2.7, 'cov1': 11.4, 'dov1': 12.2, 'plv1': -1.7, 'ctd': 10.2, 'dtd': 11.9, 'ctd1': 12.2, 'dtd1': 13.9},
		{'code': 'rcsc', 'prop': 'rc_soc', 'color':'#f73f59', 'label': 'Social Contribution', 'icon': 'people-carry', 'cov': 12.4, 'dov': 13.2, 'plv': -3, 'cov1': 14.4, 'dov1': 11.2, 'plv1': -3, 'ctd': 21.2, 'dtd': 17.8, 'ctd1': 21.2, 'dtd1': 17.8} 
		];

		this.cschart = [
		{'cov': 11, 'dov': 1, 'plv': 12},
		{'cov': 14, 'dov': 6, 'plv': 19},
		{'cov': 6, 'dov': 0, 'plv': 7},
		{'cov': 29, 'dov': 3, 'plv': 22},
		{'cov': 15, 'dov': 0, 'plv': 14},
		{'cov': 13, 'dov': 3, 'plv': 26},
		{'cov': 0, 'dov': 0, 'plv': 0},
		{'cov': 0, 'dov': 0, 'plv': 0},
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
		bar.set( (0 * 20)); 
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
		for(let rc of this.rcschart) {
			series.push([rc.label, Number(rc[tab])]);
			colors.push(rc.color);
		}
		let self = this;
		setTimeout(function() { 
			let title = (tab === 'ctd') ? 'Current' : 'Desired';
			console.log(series);
			console.log(tab);
			self.generateBnsChart(tab+'_chart', series, colors, title);

		}, 100);
	}

	switchBnsTab1(tab) {
		this.bnsTab = tab;
		// console.log(tab);
		var series = []; var colors = [];
		for(let rc of this.rcschart) {
			series.push([rc.label, Number(rc[tab])]);
			colors.push(rc.color);
		}
		let self = this;
		setTimeout(function() { 
			let title = (tab === 'ctd1') ? 'Current' : 'Desired';
			// console.log(series);
			console.log(tab+'_chart1');
			self.generateBnsChart(tab+'_chart1', series, colors, title);

		}, 100);
	}

	switchView(view) {
		if(view === 'bnsEmp'){
			this.switchBnsTab('ctd');
		} else{
			this.switchBnsTab1('ctd1');
		}

		let self = this;
		setTimeout(function() { 
			for(let rc of self.rcs) {
				self.hideKnob(rc.code, rc.prop);
				self.showKnob(rc.code, rc.prop);
			}

		}, 100);
		this.currentView = view;
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
						if(this.key =='Finance'){ return '-';}
						if(this.key =='Fitness'){ return 'Digital connectivity';}
						if(this.key =='External Stakeholder Relationship'){ return 'Brand image'; }
						if(this.key =='Evolution'){ return '-';}
						if(this.key =='Trust/Engagement'){ return 'Cooperation,<br> Trust,<br> Accountability';}
						if(this.key =='Direction/ Communication'){ return 'Honesty,<br> Clarity';}
						if(this.key =='Supportive Environment'){ return 'Respect,<br> Patience,<br>Caring';}
						if(this.key =='Social Contribution'){ return '-';}

					}
					if (container == 'dtd_chart' ){
						if(this.key =='Finance'){ return '-';}
						if(this.key =='Fitness'){ return 'Fitness';}
						if(this.key =='External Stakeholder Relationship'){ return 'External Stakeholder Relations'; }
						if(this.key =='Evolution'){ return '-';}
						if(this.key =='Trust/Engagement'){ return 'Cooperation,<br> Trust,<br> Accountability';}
						if(this.key =='Direction/ Communication'){ return 'Honesty,<br> Clarity';}
						if(this.key =='Supportive Environment'){ return 'Patience,<br> Encouragement,<br>Respect';}
						if(this.key =='Social Contribution'){ return '-';}
					}
					if (container == 'ctd1_chart1' ){
						if(this.key =='Finance'){ return '-';}
						if(this.key =='Fitness'){ return 'Digital connectivity';}
						if(this.key =='External Stakeholder Relationship'){ return 'Brand image'; }
						if(this.key =='Evolution'){ return '-';}
						if(this.key =='Trust/Engagement'){ return 'Cooperation,<br> Trust,<br> Accountability';}
						if(this.key =='Direction/ Communication'){ return 'Honesty,<br> Clarity';}
						if(this.key =='Supportive Environment'){ return 'Respect,<br> Patience,<br>Caring';}
						if(this.key =='Social Contribution'){ return '-';}

					}
					if (container == 'dtd1_chart1' ){
						if(this.key =='Finance'){ return '-';}
						if(this.key =='Fitness'){ return 'Fitness';}
						if(this.key =='External Stakeholder Relationship'){ return 'External Stakeholder Relations'; }
						if(this.key =='Evolution'){ return '-';}
						if(this.key =='Trust/Engagement'){ return 'Cooperation,<br> Trust,<br> Accountability';}
						if(this.key =='Direction/ Communication'){ return 'Honesty,<br> Clarity';}
						if(this.key =='Supportive Environment'){ return 'Patience,<br> Encouragement,<br>Respect';}
						if(this.key =='Social Contribution'){ return '-';}
					}

				} 
			},
			legend: {
				enabled: true,
				align: 'center',
				verticalAlign: 'bottom',
				itemStyle: {
					color: '#333',
					fontSize: 10,
					position: 'fixed'

				},
				layout: 'horizontal',
				width: '100%',
				y: 20
			},

			plotOptions: {
				series: {
					dataLabels: { formatter: function() {
						if(this.key =='Finance'){ return 'Finance';}
						if(this.key =='Fitness'){ return 'Fitness';}
						if(this.key =='External Stakeholder Relationship'){ return 'External Stakeholder Relations'; }
						if(this.key =='Evolution'){ return 'Evolution';}
						if(this.key =='Trust/Engagement'){ return 'Culture: Trust/Engagement';}
						if(this.key =='Direction/ Communication'){ return 'Culture: Direction/ Communication';}
						if(this.key =='Supportive Environment'){ return 'Culture: Supportive Environment';}
						if(this.key =='Social Contribution'){ return 'Societal Contribution';}
					},
					sliced: true,
					selected: true,
					enabled: true,
					align: 'right',
					color: '#294469',
					shadow: false,
					x: -10,
					style: {"fontSize": "10px", "textShadow": "0px" } },
					pointPadding: 0.1,
					groupPadding: 0
				},
				pie: {
					colors: colors,
					dataLabels: {
						enabled: true,
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
	for(let rc of this.cschart) {
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
					enabled: true,
					format: '{point.y:.1f}%'
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
		
		tooltip: {
			enabled: false
			// positioner: function(labelWidth, labelHeight, point) {
				//   var tooltipX;
				//   if(point.plotX < 200) {
					//     tooltipX = point.plotX - 20;  
					//   }
					//   else if(point.plotX > 200) {
						//     tooltipX = point.plotX - 220;  
						//   }
						//   var tooltipY;
						//   if(point.plotY < 50) {
							//     tooltipY = point.plotY + 140;
							//   }
							//   else {
								//     if(point.plotX > 260) {
									//       tooltipX = point.plotX - 190;  
									//     }
									//     tooltipY = point.plotY + 10;
									//   }

									//   return {
										//     x: tooltipX,
										//     y: tooltipY
										//   };
										// }
									},
									legend: {
										enabled: true,
										align: 'center',
										verticalAlign: 'bottom',
										itemStyle: {
											color: '#333',
											fontSize: 10,
											position: 'fixed'

										},
										layout: 'horizontal',
										width: '100%',
										y: 20
									},
									series: series
								});
}
setupBarChart1() {
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

	for(let rc of this.cschart) {
		categories.push(rc.label)
		series[0].data.push(rc.cov);
		series[1].data.push(rc.dov);
		series[2].data.push(rc.plv);
	}
	// console.log(this.rcs);
	
	Highcharts.chart('bnsbarchart2', {
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
				//showInLegend: false,
				enableMouseTracking: true,
				dataLabels: {

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

		tooltip: {
			positioner: function(labelWidth, labelHeight, point) {
				// alert(point.plotX);
				var tooltipX;
				if(point.plotX < 200) {
					tooltipX = point.plotX - 20;  
				}
				else if(point.plotX > 200) {
					tooltipX = point.plotX - 220;  
				}
				var tooltipY;
				if(point.plotY < 50) {
					tooltipY = point.plotY + 140;
				}
				else {
					if(point.plotX > 260) {
						tooltipX = point.plotX - 190;  
					}
					tooltipY = point.plotY + 10;
				}

				return {
					x: tooltipX,
					y: tooltipY
				};
			}
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
				fontSize: 10,
				position: 'fixed'

			},
			layout: 'horizontal',
			width: '100%',
			y: 20
		},
		series: series
	});
}

initStuff(bnscomp) {
	this.project = bnscomp;     
	console.log('inside bns initstuff');
	let self = this;
	setTimeout(function() { 
		for(let rc of self.rcs) {
			self.hideKnob(rc.code, rc.prop);
			self.showKnob(rc.code, rc.prop);
		}
		self.switchBnsTab('ctd');
		self.setupBarChart();
		self.setupBarChart1();

	}, 1000);
}

ngOnInit() {
	// console.log(this.project);
	this.bns = {
		"executiveSummary": "The Culture Needs Scorecard (CNS) provides a strategic lens into a six-part scorecard including, Social Contribution, Fitness, Finance, External Stakeholder Relations, Evolution, and Team Dynamics. The area of Team Dynamics is broken down in three further sub-sections; Trust/ Engagement, Direction/ Communication and Supportive Environment. <br> High performance cultures show an even distribution of values across all six segments of the scorecard.",
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
	this.currentView = 'bnsEmp';
}

}

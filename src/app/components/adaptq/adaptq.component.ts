import { Component, OnInit, Input } from '@angular/core';

import { Project } from '../../models/project.model';

@Component({
  selector: 'app-adaptq',
  templateUrl: './adaptq.component.html',
  styleUrls: ['./adaptq.component.css']
})
export class AdaptqComponent implements OnInit {
	@Input() project: Project;
	adaptqdash: any;
	public poscore: any;
	public mdindex: any;
	public adapq: any;


  constructor() {
  	 this.poscore = [];
  	 this.poscore = {'0':'0','1':'0'}
  	 this.mdindex = [
      {'color':'#188a34', 'label': 'Very Happy', 'icon': 'smile-beam', 'modindex': 25.8},
      {'color':'#90b240', 'label': 'Happy', 'icon': 'smile', 'modindex': 48.4},
      {'color':'#ffc02e', 'label': 'Just Ok', 'icon': 'meh', 'modindex': 16.1},
      {'color':'#ff622b', 'label': 'Sad', 'icon': 'frown-open', 'modindex': 6.5},
      {'color':'#d94334', 'label': 'Very Sad', 'icon': 'frown', 'modindex': 3.2}
    ];
    this.adapq = {
    	"overall_adq_score": "48"
    }
  	this.adaptqdash = {
  		"executiveSummary": "<p> Adaptability quotient is an individuals to change. The view here give multiple perspectives to how adaptable the whole organization is towards change.</p><p> The range for our individual adaptability is between 0 to 25 and the overall organization adaptability is between 0-100 and is calculated through the weighted average method.</p>",
  		"receptiveness": "Receptiveness to change",
  		 "opinion_index": 2.4

  	}
   }

   

  ngOnInit() {
  		
  }

}

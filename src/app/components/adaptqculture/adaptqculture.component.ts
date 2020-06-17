import { Component, OnInit, Input } from '@angular/core';
 
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-adaptqculture',
  templateUrl: './adaptqculture.component.html',
  styleUrls: ['./adaptqculture.component.css']
})
export class AdaptqcultureComponent implements OnInit {
	@Input() project: Project;
	adaptqdash: any;
	public poscore: any;
	public mdindex: any;
	public adapq: any;
  constructor() { 
  	this.poscore = [];
  	 this.poscore = {'0':'0','1':'0'}
  	 this.mdindex = [
      {'color':'#188a34', 'label': 'Very Happy', 'icon': 'smile-beam', 'modindex': 10.71},
      {'color':'#90b240', 'label': 'Happy', 'icon': 'smile', 'modindex': 50},
      {'color':'#ffc02e', 'label': 'Just Ok', 'icon': 'meh', 'modindex': 39.29},
      {'color':'#ff622b', 'label': 'Sad', 'icon': 'frown-open', 'modindex': 0.0},
      {'color':'#d94334', 'label': 'Very Sad', 'icon': 'frown', 'modindex': 0.0}
    ];
    this.adapq = {
    	"overall_adq_score": "48"
    }
  	this.adaptqdash = {
  		"executiveSummary": "<p> Adaptability quotient is an individuals ability to change. The view here give multiple perspectives on how to make the whole bank adaptive to change. The range for our individual adaptability is between 0 to 25 and the overall organization adaptability is calculated through the weighted average method.</p>",
  		"receptiveness": "Receptiveness to change",
  		 "opinion_index": 2.4

  	}
   }

  ngOnInit() {
  }

}

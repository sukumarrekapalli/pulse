import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Options } from 'ng5-slider';
import Swal from 'sweetalert2';
import { DataService } from '../../services/data.service';
import * as $ from 'jquery';
import Sortable from '../../../assets/Sortable/Sortable';

declare var require: any;
var Highcharts = require('highcharts/highcharts.js');
declare var ldBar: any;

// Detect touch support
$.support.touch = 'ontouchend' in document;
@Component({
  selector: 'app-gravityilabsurvey',
  templateUrl: './gravityilabsurvey.component.html',
  styleUrls: ['./gravityilabsurvey.component.css']
})
export class GravityilabsurveyComponent implements OnInit {
	@BlockUI() blockUI: NgBlockUI;
    @ViewChild('auto') auto;

    public surveyCode: any;
    public survey: any;
    public surveyView: any;
    public currentQuestion: any;
    public currentQuestionIndex: any;
    public currentQuesAnswers: any;
    public userAnswers: any;
    public uans: any;
    public finishbtn: boolean;
    public visibilityflag: any;
    public surveyError: any;
    public currentYear: any;
    public eumTimeoutHandler: any;
    public responsedata: any;
    public comasmailstatus: boolean;
    public usrmail: any;
    public infoInstruction: any;
    public tbdata: any;
    public showdl1form: boolean;
    public onaEmp: any;

  constructor(
  		private dataService: DataService,
        private route: ActivatedRoute,
        private router: Router,
        private title: Title
  	) { 
  		this.surveyCode = this.route.snapshot.params.surveyCode;
	    this.blockUI.start('Loading...'); // Start blocking
	    this.surveyView = '-';
	    this.surveyError =  '';
	    this.comasmailstatus = true;
	    this.userAnswers = []; this.uans = [];
	    this.currentQuesAnswers = [];
	    this.tbdata = {};
	    this.tbdata.tbqanswer1 = '';
	    this.tbdata.tbqanswer2 = '';
	    this.tbdata.tbqanswer3 = '';
	    this.showdl1form = false;
		this.visibilityflag = 0;
		this.finishbtn = false;
		 this.onaEmp = {
            data: [],
            keyword: 'empName',
            obj: '',
            name: '',
            rating: '',
            error: false,
            ratestar: 0,
            onaSliderOptions: {
                floor: 0,
                ceil: 10,
                step: 1,
                showTicksValues: false,
                animate: true
            },
            ratestars: [10, 9,8,7,6,5,4,3,2,1,0]
        };

  	 }

  ngOnInit() {

  	console.log(this.surveyCode);
  	if(this.surveyCode !== undefined && this.surveyCode !== '') {
        this.dataService.getGravitySurvey(this.surveyCode).subscribe(
            data => {
                console.log(data);
                this.showdl1form = false;
                this.survey = data.survey;
                if(this.survey.survey_status !== 'complete'){
	                 this.blockUI.stop();
                	 Swal.fire('Please complete your previous survey first.' );
                }else {
                	console.log(this.survey.gravityilabs_survey_status);
	               	this.survey.instructions = JSON.parse(this.survey.instructions);
	                this.title.setTitle(this.survey.projectTitle);
	                for(let qobj of this.survey.questions) {
	                   if(qobj.options !== undefined && qobj.options.length > 0) {
	                       for(let opt of qobj.options) {
	                           opt.selected = false;
	                       };
	                   }
	                };
	                this.currentQuestionIndex = 0;
	                
	                this.usrmail = this.survey.userEmail;
	                console.log(this.survey);
	                // console.log(this.usrmail);
	                 if(data.code === 200 && this.survey.gravityilabs_survey_status !== 'complete') {
	                   this.startSurvey();
	                 }   
	                 else if(data.code === 200 && this.survey.gravityilabs_survey_status === 'complete') {
	                    this.surveyView = 'athanks';
	                 }
	                 else if(data.code !== 200) {
	                    this.surveyView = 'error';
	                 }
	                 console.log(this.surveyView);
	                 this.blockUI.stop();
	            }
            },
            err => {
                this.surveyView = 'error';
                this.surveyError = 'Survey Code not valid';
                    this.blockUI.stop();
            });
	    }
	    else {
	        this.surveyView = 'error';
	        this.surveyError = 'Survey Code not valid';
	        this.blockUI.stop();
	    }
  	}


  startSurvey() {
    this.surveyView = 'survey';
  }
  caToggleOption(opt,qindx) {
    this.currentQuestionIndex = qindx;
    this.currentQuestion = this.survey.questions[this.currentQuestionIndex];
      	if(this.userAnswers[this.currentQuestionIndex] === undefined) {
          this.userAnswers[this.currentQuestionIndex] = {
              questionId: this.currentQuestion.id,
              questionType: this.currentQuestion.questionType,
              surveyId: this.currentQuestion.surveyId,
              answers: []
          };
      	}
    opt.selected = opt.selected;
    if(opt.selected) {
      // console.log(opt);
        this.userAnswers[this.currentQuestionIndex].answers.push(opt);
        this.uans.push(opt.value);
        // console.log(this.uans);
    }
    else {
      this.uans.splice(0, 1);
      this.userAnswers[this.currentQuestionIndex].answers = this.userAnswers[this.currentQuestionIndex].answers.filter(item => item.value !== opt.value);
    }
  this.userAnswers.answered = (this.uans.length >= 1) ? true : false;
  }


dlToggleOption(opt,currentquesindex) {
	// console.log(opt);
	opt.selected = !opt.selected;
	if(opt.selected) {
		// console.log(opt);
		this.currentQuesAnswers.push(opt);
		// console.log(this.currentQuesAnswers);
	}
	else {
		this.currentQuesAnswers = this.currentQuesAnswers.filter(item => item.value !== opt.value);
		// console.log(this.currentQuesAnswers);
	}
}

	checkmcq(currentquesindex){
		// console.log(currentquesindex);
		if(this.currentQuesAnswers.length > 1 || this.currentQuesAnswers.length < 1){
			Swal.fire('Please select one option.')
		} else{
			Swal.fire({
			  title: 'Are you sure?',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Yes'
			}).then((result) => {
		  if (result.value) {
		  	this.saveDlAnswer(currentquesindex);
		  }
		})
		}
	}

	checkrating(rting,currentquesindex){
		Swal.fire({
			  title: 'Are you sure?',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Yes'
			}).then((result) => {
		  if (result.value) {
		  	// var ratingans = {
		  	// 	rating_value: rting
		  	// }
		  	this.currentQuesAnswers.push(rting);
		  	// console.log(this.currentQuesAnswers);
		  	this.saveDlAnswer(currentquesindex);
		  }
		})
	}

  loadQuestion() {
    this.currentQuestion = this.survey.questions[this.currentQuestionIndex];
	    if(this.userAnswers[this.currentQuestionIndex] === undefined) {
	        this.userAnswers[this.currentQuestionIndex] = {
	            questionId: this.currentQuestion.id,
	            questionType: this.currentQuestion.questionType,
	            surveyId: this.currentQuestion.surveyId,
	            answers: []
	        };
	    }
	}
	nextQuestion() {      
    this.survey.questions[this.currentQuestionIndex].answered = true;
    this.userAnswers[this.currentQuestionIndex].answered = true;
    if(this.currentQuestionIndex < this.survey.questions.length - 1) {
        this.currentQuestionIndex++;
        this.loadQuestion();
    }
    else {
        this.finishSurvey();
    }

  }
  showInstructions(curState) {
    this.infoInstruction = curState;
    console.log(this.infoInstruction);
  }
	enableTtSave(){
		var opvalue1 = this.tbdata.tbqanswer1;
		var opvalue2 = this.tbdata.tbqanswer2;
		var opvalue3 = this.tbdata.tbqanswer3;
		if(opvalue1.length >= 1 && opvalue2.length >= 1 && opvalue3.length >= 1){
			this.showdl1form = true;
		} else{
			this.showdl1form = false;
		}
	}

	saveDlAnswer(currentquesindex) {
		console.log(currentquesindex);
		this.currentQuestion = this.survey.questions[currentquesindex];
		if(this.userAnswers[currentquesindex] === undefined) {
			this.userAnswers[currentquesindex] = {
				questionId: this.currentQuestion.id,
				questionType: this.currentQuestion.questionType,
				surveyId: this.currentQuestion.surveyId,
				answers: []
			};
		}
		// console.log(this.userAnswers[currentquesindex]);
		// MCS
		if(this.currentQuestion.questionType === 'mcq' && this.currentQuesAnswers.length == 1) {
			this.userAnswers[currentquesindex].answers = this.currentQuesAnswers;
			this.userAnswers[currentquesindex].answered = (this.userAnswers[currentquesindex].answers.length === 3) ? true : false;
			this.tbdata.dloption = '';
			this.survey.questions[currentquesindex].answered = true;
			this.userAnswers[currentquesindex].answered = true;
			this.currentQuesAnswers = [];
			this.visibilityflag++;
		} else if(this.currentQuestion.questionType === 'mcs' && this.currentQuesAnswers.length != 1) {
			Swal.fire(
				'Please select one option.'
			)
		}


		if(this.currentQuestion.questionType === 'tb') {
			if(this.tbdata.tbqanswer1 && this.tbdata.tbqanswer2 && this.tbdata.tbqanswer3){
				// var tbanswer = {
				// 	first_textbox :this.tbdata.tbqanswer1,
				// 	sec_textbox: this.tbdata.tbqanswer2,
				// 	third_textbox:this.tbdata.tbqanswer3
				// }
				this.currentQuesAnswers.push(this.tbdata.tbqanswer1);
				this.currentQuesAnswers.push(this.tbdata.tbqanswer2);
				this.currentQuesAnswers.push(this.tbdata.tbqanswer3);

				// this.currentQuesAnswers.push(tbanswer);
				console.log(this.currentQuesAnswers);
				if(this.currentQuesAnswers) {
					this.userAnswers[currentquesindex].answers = this.currentQuesAnswers;
					this.userAnswers[currentquesindex].answered = (this.userAnswers[currentquesindex].answers.length === 3) ? true : false;
					this.tbdata.dloption = '';
					this.survey.questions[currentquesindex].answered = true;
					this.userAnswers[currentquesindex].answered = true;
					this.currentQuesAnswers = [];
					this.visibilityflag++;
				}
			}else  {
				Swal.fire(
					'Please enter inpute.'
				)
			}
		}

		// ST
		if(this.currentQuestion.questionType === 'gilrate') {
			console.log(this.currentQuesAnswers);
			if(this.currentQuesAnswers) {
				this.userAnswers[currentquesindex].answers = this.currentQuesAnswers;
				this.userAnswers[currentquesindex].answered = (this.userAnswers[currentquesindex].answers.length === 3) ? true : false;
				this.tbdata.dloption = '';
				this.survey.questions[currentquesindex].answered = true;
				this.userAnswers[currentquesindex].answered = true;
				this.currentQuesAnswers = [];
				this.visibilityflag++;
			}
			this.finishbtn = true;
		} 

	}

  finishSurvey() {
    if(this.finishbtn === false){
        Swal.fire('Please attempt all the questions first.' );
    }else{
      this.blockUI.start('Finishing up...'); // Start blocking
      this.survey.questions[this.currentQuestionIndex].answered = true;
      this.userAnswers[this.currentQuestionIndex].answered = true;
      //this.currentQuestionIndex++;
      var surveyObj = {
          userId: this.survey.userId,
          userName: this.survey.userName,
          userEmail: this.usrmail,
          userSource:this.survey.user_source,
          surveyLink:this.surveyCode,
          projectId: this.survey.projectId,
          projectType: this.survey.projectType,
          comAssessStatus: 'completed',
          userAnswers: this.userAnswers
      }
    console.log(surveyObj);
    console.log('inside finish survey');
    this.dataService.finishgavitySurvey(surveyObj).subscribe(
        data => {
            if(data.code === 200  && data.survey.gravityilabs_survey_status === 'complete') {
            	this.responsedata = data.survey;
            	console.log(this.responsedata);
             	this.surveyView = 'thanks';
                this.blockUI.stop();
             	
             }   
             else {
                this.surveyView = 'aerror';
             }
             this.blockUI.stop();
        },
        err => {
            //this.surveyView = 'aerror';
            this.surveyError = 'Survey not submitted';
                this.blockUI.stop();
        });
    }
   }

}
 
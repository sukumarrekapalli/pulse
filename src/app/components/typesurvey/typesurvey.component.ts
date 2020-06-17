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
  selector: 'app-typesurvey',
  templateUrl: './typesurvey.component.html',
  styleUrls: ['./typesurvey.component.css']
})
export class TypesurveyComponent implements OnInit {
	@BlockUI() blockUI: NgBlockUI;
    @ViewChild('auto') auto;

    public surveyCode: any;
    public survey: any;
    public surveyView: any;
    public currentQuestion: any;
    public currentQuestionIndex: any;
    public userAnswers: any;
    public uans: any;
    public surveyError: any;
    public currentYear: any;
    public eumTimeoutHandler: any;
    public responsedata: any;
    public comasmailstatus: boolean;
    public usrmail: any;
    public infoInstruction: any;

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
   }

  ngOnInit() {
  	if(this.surveyCode !== undefined && this.surveyCode !== '') {
        this.dataService.getCaSurvey(this.surveyCode).subscribe(
            data => {
                console.log(data);
                this.survey = data.survey;
                if(this.survey.survey_status !== 'complete'){
	                 this.blockUI.stop();
                	 Swal.fire('Please complete your previous survey first.' );
                }else {

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
	                console.log(this.usrmail);
	                   if(data.code === 200 && this.survey.comSurveyStatus !== 'complete') {
	                   this.startSurvey();
	                 }   
	                 else if(data.code === 200 && this.survey.comSurveyStatus === 'complete') {
	                    this.surveyView = 'athanks';
	                 }
	                 else if(data.code !== 200) {
	                    this.surveyView = 'error';
	                 }
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
    opt.selected = !opt.selected;
    if(opt.selected) {
      console.log(opt);
        this.userAnswers[this.currentQuestionIndex].answers.push(opt);
        this.uans.push(opt.value);
    }
    else {
      this.uans.splice(0, 1);
      this.userAnswers[this.currentQuestionIndex].answers = this.userAnswers[this.currentQuestionIndex].answers.filter(item => item.value !== opt.value);
    }
  this.userAnswers.answered = (this.uans.length >= 15) ? true : false;
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

  finishSurvey() {
    if(this.uans.length < 15){
        Swal.fire('Please select at least 15 sentences that most resonate with you.' );
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
    this.dataService.finishCaSurvey(surveyObj).subscribe(
        data => {
            if(data.code === 200  && data.survey.comSurveyStatus === 'complete') {
            	this.responsedata = data.survey;
            	console.log(this.responsedata);
             	this.router.navigate(['gravityilabsurvey/'+this.surveyCode]);
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

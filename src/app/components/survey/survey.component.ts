import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Router, ActivatedRoute } from '@angular/router';
// import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Options } from 'ng5-slider';
//import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { DataService } from '../../services/data.service';
import Swal from 'sweetalert2';

import * as $ from 'jquery';
import Sortable from '../../../assets/Sortable/Sortable';

// Detect touch support
$.support.touch = 'ontouchend' in document;

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

    @BlockUI() blockUI: NgBlockUI;
    @ViewChild('auto') auto;

    public surveyCode: any;
    public survey: any;
    public surveyView: any;
    public currentQuestion: any;
    public currentQuestionIndex: any;
    public userAnswers: any;
    public surveyError: any;
    public currentYear: any;
    public eumTimeoutHandler: any;
     public tbdata: any;
    public onaEmp: any;
    public gilabEmp: any;
    public mcqOpt: any;
    public smilycolor: any;
    public eum2box: any;
    public eum2flag: boolean;
    public eum2queone: any;
    public eum2quetwo: any;
    public eum2quethree: any;

    constructor(
        private dataService: DataService,
        private route: ActivatedRoute,
        private router: Router,
        private title: Title
    ) {

        this.currentYear = (new Date()).getFullYear();
        this.surveyCode = this.route.snapshot.params.surveyCode;
        this.blockUI.start('Loading...'); // Start blocking
        this.surveyView = '-';
        this.surveyError =  '';
        this.userAnswers = [];
         this.tbdata = {};
         this.smilycolor = '';
        this.tbdata.tbqanswer1 = '';
        this.tbdata.tbqanswer2 = '';
        this.tbdata.tbqanswer3 = '';
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
                ceil: 5,
                step: 0.1,
                showTicksValues: false,
                animate: true
            },
            ratestars: [5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1, 0.5, 0],

            gilabSliderOptions: {
                floor: 0,
                ceil: 10,
                step: 1,
                showTicksValues: false,
                animate: true
            },
            gilabratestars: [10, 9,8,7,6,5,4,3,2,1,0]
        };
        this.gilabEmp = {
            data: [],
            keyword: 'empName',
            obj: '',
            name: '',
            rating: '',
            error: false,
            gilabratestar: 0,
            gilabSliderOptions: {
                floor: 0,
                ceil: 10,
                step: 1,
                showTicksValues: false,
                animate: true
            },
            gilabratestars: [10, 9,8,7,6,5,4,3,2,1,0]
        };
        this.eum2box = 1;
        this.eum2flag = false;
    }

  ngOnInit() {
    if(this.surveyCode !== undefined && this.surveyCode !== '') {
        this.dataService.getSurvey(this.surveyCode).subscribe(
            data => {
                 this.survey = data.survey;

                this.survey.instructions = JSON.parse(this.survey.instructions);

                this.title.setTitle(this.survey.projectTitle);
                this.onaEmp.data = this.survey.onaEmployees;
                for(let qobj of this.survey.questions) {
                 if(qobj.options !== undefined && qobj.options.length > 0) {
                       for(let opt of qobj.options) {
                           opt.selected = false;
                       };
                   }
                };
                this.currentQuestionIndex = 0;
                //this.startSurvey();
                 if(data.code === 200 && this.survey.survey_status !== 'complete') {
                    this.surveyView = 'intro';
                 }
                 else if(data.code === 200 && this.survey.survey_status === 'complete') {
                    this.surveyView = 'athanks';
                 }
                 else if(data.code !== 200) {
                    this.surveyView = 'error';
                 }
                 this.blockUI.stop();
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
    this.loadQuestion();
  }

    enablenextoption(optindex) {
        // Swal.fire({
        //       title: 'Are you sure you want to move next ?',
        //       showCancelButton: true,
        //       confirmButtonColor: '#3085d6',
        //       cancelButtonColor: '#d33',
        //       confirmButtonText: 'Yes'
        //     }).then((result) => {
        //       if (result.value) {
        //         let i = 1;
        //         this.currentQuestion.optBuckets[optindex].acknowledged = true;
        //         console.log(this.currentQuestion.optBuckets);
        //         if((optindex + 1) === this.currentQuestion.optBuckets.length) { // this is last question
        //             this.eum1ProcessOptData();
        //         }
        //         else {
        //             this.currentQuestion.optBuckets[optindex+1].active = true;
        //         }
        //     }
        //     })

        if(confirm("Are you sure you want to move next ?")) {
            let i = 1;
            this.currentQuestion.optBuckets[optindex].acknowledged = true;
            // console.log(this.currentQuestion.optBuckets);
            if((optindex + 1) === this.currentQuestion.optBuckets.length) { // this is last question
                this.eum1ProcessOptData();
            }
            else {
                this.currentQuestion.optBuckets[optindex+1].active = true;
            }
        }

        let allchecked = true;
        for(let optb of this.currentQuestion.optBuckets) {
            //console.log(optb.acknowledged, allchecked);
            if(optb.acknowledged === false ) {
                allchecked = false;
            }
        }

        if(allchecked === true) {
            this.userAnswers[this.currentQuestionIndex].answered = true;
        }
        else {
            this.userAnswers[this.currentQuestionIndex].answered = false;
        }
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

    if(this.currentQuestion.questionType === 'eum') {
        let self = this;
        $(document).ready(function() {
            let i = 1;

            for(let qopt of self.currentQuestion.options) {
                var el = document.getElementById('lgv_' + self.currentQuestionIndex + '_' + i);
                Sortable.create(el, {
                    animation: 200,
                    easing: "cubic-bezier(1, 0, 0, 1)",
	            group: {
                      name: "shared",
                      pull: "clone",
                      revertClone: true
                    },
                    sort: true,
                    onSort: function (evt) {
                        self.eumActionListener(evt.to, evt.item, evt.from, evt.oldIndex);
                    },
                    onEnd: function (evt) {
                        self.eumActionListener(evt.to, evt.item, evt.from, evt.oldIndex);
                        var itemElDI = evt.item;
                        var itemElDA = evt.to;

                        // after dropping, remove the highlight of dropped item
                        let opti = 1;

                        for(let optb of self.currentQuestion.optBuckets) {
                            var bbucket = '#lgo_'+ self.currentQuestionIndex + '_' + opti;
                            if($(itemElDA).attr('id') === $(bbucket).attr('id') && $(bbucket).hasClass('highlighted_true') === true) {
                                let optj = 1;
                                for(let opt of self.currentQuestion.options) {
                                    $('#lgv_'+self.currentQuestionIndex+'_'+optj).children('.list-group-item').each(function(this) {
                                        if($(this).attr('title') === $(itemElDI).attr('title')) {
                                            $(this).removeClass('eumhl');
                                        }

                                    });
                                    optj++;
                                };
                            }
                            opti++;
                        };
                    },
                });


                i++;
            };

            let j = 1;
            for(let qopt of self.currentQuestion.optBuckets) {
                var el = document.getElementById('lgo_' + self.currentQuestionIndex + '_' + j);
                Sortable.create(el, {
                    animation: 200,
                    easing: "cubic-bezier(1, 0, 0, 1)",
                    group: {
                      name: "shared",
                      pull: true,
                      revertClone: true
                    },
                    sort: true,
                    onSort: function (evt) {
                        self.eumActionListener(evt.to, evt.item, evt.from, evt.oldIndex);
                    }
                });
                j++;
            };
        });
    }

    if(this.currentQuestion.questionType === 'eum1') {
        let self = this;
        $(document).ready(function() {
            let i = 1;
            let j = 1;
            for(let qopt of self.currentQuestion.optBuckets) {

                qopt.acknowledged = false;
                qopt.active = ( j === 1 ) ? true : false;
                var el = document.getElementById('lgo_' + self.currentQuestionIndex + '_' + j);
                Sortable.create(el, {
                    animation: 200,
                    easing: "cubic-bezier(1, 0, 0, 1)",
                    // group: {
                    //   name: "shared",
                    //   pull: true,
                    //   revertClone: true
                    // },
                    sort: true,
                    onSort: function (evt) {
                        self.eum1ActionListener(evt.to, evt.item, evt.from, evt.oldIndex);
                    }
                });
                j++;
            };
            // console.log( self.currentQuestion.optBuckets);
        });
    }
    if(this.currentQuestion.questionType === 'eum2') {
        let self = this;
        $(document).ready(function() {
            let i = 1;
            console.log(self.currentQuestion.options);
            for(let qopt of self.currentQuestion.options) {
                var el = document.getElementById('lgv_' + self.currentQuestionIndex + '_' + i);
                Sortable.create(el, {
                    animation: 200,
                    easing: "cubic-bezier(1, 0, 0, 1)",
              group: {
                      name: "shared",
                      pull: "clone",
                      revertClone: true
                    },
                    sort: true,
                    onSort: function (evt) {
                        self.eumActionListener(evt.to, evt.item, evt.from, evt.oldIndex);
                    },
                    onEnd: function (evt) {
                        self.eumActionListener(evt.to, evt.item, evt.from, evt.oldIndex);
                        var itemElDI = evt.item;
                        var itemElDA = evt.to;

                        // after dropping, remove the highlight of dropped item
                        let opti = 1;

                        for(let optb of self.currentQuestion.optBuckets) {
                            var bbucket = '#lgo_'+ self.currentQuestionIndex + '_' + opti;
                            if($(itemElDA).attr('id') === $(bbucket).attr('id') && $(bbucket).hasClass('highlighted_true') === true) {
                                let optj = 1;
                                for(let opt of self.currentQuestion.options) {
                                    $('#lgv_'+self.currentQuestionIndex+'_'+optj).children('.list-group-item').each(function(this) {
                                        if($(this).attr('title') === $(itemElDI).attr('title')) {
                                            $(this).removeClass('eumhl');
                                        }

                                    });
                                    optj++;
                                };
                            }
                            opti++;
                        };
                    },
                });


                i++;
            };

            let j = 1;
            for(let qopt of self.currentQuestion.optBuckets) {
                var el = document.getElementById('lgo_' + self.currentQuestionIndex + '_' + j);
                Sortable.create(el, {
                    animation: 200,
                    easing: "cubic-bezier(1, 0, 0, 1)",
                    group: {
                      name: "shared",
                      pull: true,
                      revertClone: true
                    },
                    sort: true,
                    onSort: function (evt) {
                        self.eumActionListener(evt.to, evt.item, evt.from, evt.oldIndex);
                    }
                });
                j++;
            };
        });
    }

  }
   setMCQValue(mcq_value,indx) {
       this.smilycolor = indx;
       this.mcqOpt = mcq_value;
       // console.log(this.mcqOpt);
        this.userAnswers[this.currentQuestionIndex].answered = true;
        // this.userAnswers[this.currentQuestionIndex].answers.push(mcq_value);
    }


   ilabSliderEvent(gilabrate){
       if(gilabrate !== NaN){

           this.userAnswers[this.currentQuestionIndex].answered = true;
       }
   }

  eumHighlightOpts(lbl) {
       return false; // this function not required
       let j = 1;
       $('.eumhl').removeClass('eumhl');
       clearTimeout(this.eumTimeoutHandler);
       for(let qopt of this.currentQuestion.optBuckets) {
            var el = document.getElementById('lgo_' + this.currentQuestionIndex + '_' + j);
             $(el).children().each(function(this) {
                if($(this).attr('title') === lbl) {
                    $(el).addClass('eumhl');
                    $(this).addClass('eumhl');
                }
                else {
                    $(this).removeClass('eumhl');
                }
             });
            j++;
       };

       this.eumTimeoutHandler = setTimeout( function() { $('.eumhl').removeClass('eumhl'); }, 5000);

  };

  eumActionListener(itemElDA, itemElDI, itemElDF, oldIndex) {


    if($(itemElDA).data("da") === 'lgo') { // right area
        // check if this item is already added in this div
        var found = 0;
        $(itemElDA).children().each(function(this) {
            if($(this).attr('title') === $(itemElDI).attr('title')) {
                if(found > 0) {
                    if($(itemElDF).data('da') === 'lgo') {
                        $(this).appendTo(itemElDF);
                    }
                    else {
                         $(this).remove();
                    }
                }
                else {
                    found++;
                }

            }
        });

        var order = 1;
        $(itemElDA).children().each(function(this) {
            $(this).children('.list-group-index').text(order);
            order++;
        });


        var forder = 1;
        $(itemElDF).children().each(function(this) {
            $(this).children('.list-group-index').text(forder);
            forder++;
        });

        this.eumProcessOptData();

    }
    else if($(itemElDA).data("da") === 'lgv') {
        if($(itemElDA).attr('id') !== $(itemElDF).attr('id')) {
            $(itemElDA).children().each(function(this) {
                var atitle = $(this).attr('title');
                if(atitle === $(itemElDI).attr('title')) {
                    if($(itemElDF).data('da') === 'lgo') {
                        var sfound = 0;
                        $(itemElDF).children().each(function(this) {
                            if(atitle === $(this).attr('title')) { sfound = 1; }
                        });

                        if(sfound === 0) {
                            $(this).appendTo(itemElDF);
                        }
                    }
                    else {
                        console.log('removing from lgv');
                         $(this).remove();
                    }
                }
            });
        }
    }
    else {
        console.log('no mans land');
    }
  }
  eum1ActionListener(itemElDA, itemElDI, itemElDF, oldIndex) {
      if($(itemElDA).data("da") === 'lgo') { // right area
          // check if this item is already added in this div
          var found = 0;
          $(itemElDA).children().each(function(this) {
              if($(this).attr('title') === $(itemElDI).attr('title')) {
                  if(found > 0) {
                      if($(itemElDF).data('da') === 'lgo') {
                          $(this).appendTo(itemElDF);
                      }
                      else {
                          $(this).remove();
                      }
                  }
                  else {
                      found++;
                  }

              }
          });

          var order = 1;
          $(itemElDA).children().each(function(this) {
              $(this).children('.list-group-index').text(order);
              order++;
          });


          var forder = 1;
          $(itemElDF).children().each(function(this) {
              $(this).children('.list-group-index').text(forder);
              forder++;
          });

          this.eum1ProcessOptData();

      }
      else if($(itemElDA).data("da") === 'lgv') {
          if($(itemElDA).attr('id') !== $(itemElDF).attr('id')) {
              $(itemElDA).children().each(function(this) {
                  var atitle = $(this).attr('title');
                  if(atitle === $(itemElDI).attr('title')) {
                      if($(itemElDF).data('da') === 'lgo') {
                          var sfound = 0;
                          $(itemElDF).children().each(function(this) {
                              if(atitle === $(this).attr('title')) { sfound = 1; }
                          });

                          if(sfound === 0) {
                              $(this).appendTo(itemElDF);
                          }
                      }
                      else {
                          console.log('removing from lgv');
                          $(this).remove();
                      }
                  }
              });
          }
      }
      else {
          console.log('no mans land');
      }
  }
  cvaToggleOption(opt) {
    opt.selected = !opt.selected;
    if(opt.selected) {
        this.userAnswers[this.currentQuestionIndex].answers.push(opt);
    }
    else {
        this.userAnswers[this.currentQuestionIndex].answers = this.userAnswers[this.currentQuestionIndex].answers.filter(item => item.value !== opt.value);
    }
    this.userAnswers[this.currentQuestionIndex].answered = (this.userAnswers[this.currentQuestionIndex].answers.length === 10) ? true : false;
  }

  taToggleOPtion(opt){
      opt.selected = !opt.selected;
    if(opt.selected) {
        this.userAnswers[this.currentQuestionIndex].answers.push(opt);
    }
    else {
        this.userAnswers[this.currentQuestionIndex].answers = this.userAnswers[this.currentQuestionIndex].answers.filter(item => item.label !== opt.label);
    }
    // console.log(this.userAnswers[this.currentQuestionIndex].answers);
    this.userAnswers[this.currentQuestionIndex].answered = (this.userAnswers[this.currentQuestionIndex].answers.length >= 15) ? true : false;
  }

  enableTtSave(){
      // alert();
        var opvalue1 = this.tbdata.tbqanswer1;
        var opvalue2 = this.tbdata.tbqanswer2;
        var opvalue3 = this.tbdata.tbqanswer3;
        if(opvalue1.length >= 1){

            this.userAnswers[this.currentQuestionIndex].answered = true;
        } else{
           this.userAnswers[this.currentQuestionIndex].answered = false;
        }
    }


  nextQuestion() {
    console.log(this.userAnswers[this.currentQuestionIndex].answers);
    if(this.survey.questions[this.currentQuestionIndex].questionType === 'tb'){
        var opvalue1 = this.tbdata.tbqanswer1;
        var opvalue2 = this.tbdata.tbqanswer2;
        var opvalue3 = this.tbdata.tbqanswer3;
         var textboxValue = {
            firstText: opvalue1,
            secondText: opvalue2,
            thirdText: opvalue3
        }
       this.userAnswers[this.currentQuestionIndex].answers.push(textboxValue);
       console.log(this.userAnswers[this.currentQuestionIndex].answers);
    }
    if(this.survey.questions[this.currentQuestionIndex].questionType === 'gilrate'){
        console.log(this.gilabEmp.gilabratestar);
        this.userAnswers[this.currentQuestionIndex].answers.push(this.gilabEmp.gilabratestar);
    }
    if(this.survey.questions[this.currentQuestionIndex].questionType === 'mcq' && this.mcqOpt !== ''){
        console.log(this.mcqOpt);
        this.userAnswers[this.currentQuestionIndex].answers.push(this.mcqOpt);
    }
    this.onaEmp.error = false;
    this.onaEmp.obj = '';
    this.onaEmp.name = '';
    this.onaEmp.rating = 0;

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

  finishSurvey() {
    if(this.survey.questions[this.currentQuestionIndex].questionType === 'gilrate'){
        // console.log(this.gilabEmp.gilabratestar);
        this.userAnswers[this.currentQuestionIndex].answers.push(this.gilabEmp.gilabratestar);
    }
    this.blockUI.start('Finishing up...'); // Start blocking
    this.survey.questions[this.currentQuestionIndex].answered = true;
    this.userAnswers[this.currentQuestionIndex].answered = true;
    //this.currentQuestionIndex++;

    var surveyObj = {
        userId: this.survey.userId,
        projectId: this.survey.projectId,
        userAnswers: this.userAnswers
    }
    // console.log(surveyObj);

    console.log('inside finish survey');
        this.dataService.finishSurvey(surveyObj).subscribe(
        data => {

             if(data.code === 200 && data.survey.survey_status == 'complete') {
                this.surveyView = 'thanks';
                // this.router.navigate(['typesurvey/']);
                // this.router.navigate(['tipesurvey/'+this.surveyCode]);
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



  selectEvent(item) {
    if(item !== undefined && item !== '') {
        this.onaEmp.name = item.empName;
    }
    else {
        alert('removed');
    }
  }

  onChangeSearch(val: string) {
    console.log(val);
  }

  onFocused(e){
    // do something when input is focused

        //this.auto.close();
  }

  onaSetRating(val) {
    this.onaEmp.rating = val;
  }

  onaAddEmp() {
    if(this.onaEmp.name !== '') {
        let empName = this.onaEmp.name;
        let emp = this.onaEmp.data.find(function(item) { return item.empName === empName; });
        if(emp !== undefined) {
            emp.empRating = this.onaEmp.rating;
            let obj =  Object.assign({}, emp);

            if(this.userAnswers[this.currentQuestionIndex] === undefined) {
                this.userAnswers[this.currentQuestionIndex] = {
                    questionId: this.currentQuestion.id,
                    questionType: this.currentQuestion.questionType,
                    surveyId: this.currentQuestion.surveyId,
                    answers: []
                };
            }

            let aemp = this.userAnswers[this.currentQuestionIndex].answers.find(function(item) { return item.empId === emp.empId; });
            if(aemp === undefined) {
                this.userAnswers[this.currentQuestionIndex].answers.push(obj);
            }

            this.userAnswers[this.currentQuestionIndex].answered = (this.userAnswers[this.currentQuestionIndex].answers.length === 3) ? true : false;

            this.onaEmp.error = false;
            this.onaEmp.obj = '';
            this.onaEmp.name = '';
            this.onaEmp.rating = 0;
            this.onaEmp.ratestar = 0;
            this.auto.clear();

            if(this.userAnswers[this.currentQuestionIndex].answers.length === 3) { this.auto.close(); }

        }
        else {
            this.onaEmp.error = true;
        }
    }
  }

  onaRemoveUser(opt) {
    this.userAnswers[this.currentQuestionIndex].answers = this.userAnswers[this.currentQuestionIndex].answers.filter(item => item.empId !== opt.empId);
    this.userAnswers[this.currentQuestionIndex].answered = false;
    this.auto.open();
  }

    eumValidateNumber() {

        this.userAnswers[this.currentQuestionIndex].answers = [];
        this.userAnswers[this.currentQuestionIndex].answered = false;

        for(let qopt of this.currentQuestion.options) {

            if(qopt.rate !== undefined && qopt.rate !== '' && parseInt(qopt.rate) >= 0) {
                qopt.rate = parseInt(qopt.rate);
                if(qopt.rate > 15) { qopt.rate = 15; }
                let obj =  Object.assign({}, qopt);
                this.userAnswers[this.currentQuestionIndex].answers.push(obj);
            }
            else {
                qopt.rate = '';
            }
        };

        if(this.userAnswers[this.currentQuestionIndex].answers.length === this.currentQuestion.options.length) {
            this.userAnswers[this.currentQuestionIndex].answered = true;
        }
    }

    eumHighlightBktOpts(blabel) {
      console.log(blabel);
        let i = 1;
        $('.eumhl').removeClass('eumhl');
        for(let qopt of this.currentQuestion.optBuckets) {
            var bucket = '#'+'lgo_'+this.currentQuestionIndex+'_'+i;
            if(qopt.label === blabel) {
                qopt.highlighted = !qopt.highlighted;
                if(qopt.highlighted === true) {
                    let j = 1;
                    for(let opt of this.currentQuestion.options) {
                        if($(bucket).children("[title*='"+opt.label+"']").length === 0) {
                            $('#lgv_'+this.currentQuestionIndex+'_'+j).children('.list-group-item').addClass('eumhl');
                        }
                        j++;
                    };
                }
                else {

                }
            }
            else {
                qopt.highlighted = false;
                //$('#'+'lgo_'+this.currentQuestionIndex+'_'+i).children('
            }
            i++;
        };
    }

    eumProcessOptData() {
        this.userAnswers[this.currentQuestionIndex].answers = []; var self = this;
        var i = 1; var answers = []; var opts_count = [];
        for(let qopt of this.currentQuestion.optBuckets) {
            var j = 1;
            $('#lgo_'+this.currentQuestionIndex+'_'+i).children().each(function(this) {
                var lbl = $(this).attr('title');
                if(opts_count[lbl] === undefined) { opts_count[lbl] = 0; }
                var key = self.currentQuestion.options.find(function(item) { return item.label === lbl; });

                if(key !== undefined) {
                    let obj =  Object.assign({}, key);
                    obj.option_category = qopt.label;
                    obj.option_order = j;
                    answers.push(obj);
                    opts_count[lbl]++;
                    j++;
                }
            });

            i++;

        };
        this.userAnswers[this.currentQuestionIndex].answers = answers;
        var shouldLength = this.currentQuestion.options.length * this.currentQuestion.optBuckets.length;
        if(this.currentQuestion.questionType === 'eum'){
            if(this.userAnswers[this.currentQuestionIndex].answers.length === shouldLength) {
                this.userAnswers[this.currentQuestionIndex].answered = true;
            }
            else {
                this.userAnswers[this.currentQuestionIndex].answered = false;
            }
        } else if(this.currentQuestion.questionType === 'eum2'){

           if(this.userAnswers[this.currentQuestionIndex].answers.length === shouldLength) {
                this.eum2flag = true;
                var firstquebucket = this.currentQuestion.optBuckets[0].label;
                var secquebucket = this.currentQuestion.optBuckets[1].label;
                var thrdquebucket = this.currentQuestion.optBuckets[2].label;
                let ans1 = this.userAnswers[this.currentQuestionIndex].answers.filter(function(item) { return item.option_category === firstquebucket });
                let ans2 = this.userAnswers[this.currentQuestionIndex].answers.filter(function(item) { return item.option_category === secquebucket });
                let ans3 = this.userAnswers[this.currentQuestionIndex].answers.filter(function(item) { return item.option_category === thrdquebucket });
                this.eum2queone = ans1;
                this.eum2quetwo = ans2;
                this.eum2quethree = ans3;
            }
            else {
                this.eum2flag = false;
            }
        }

    }
    eum2confirmation(){
        $('#eum2close').click();
        this.userAnswers[this.currentQuestionIndex].answered = true;
    }
    eum1ProcessOptData() {
        this.userAnswers[this.currentQuestionIndex].answers = []; var self = this;
        var i = 1; var answers = []; var opts_count = [];
        for(let qopt of this.currentQuestion.optBuckets) {
            var j = 1;
            $('#lgo_'+this.currentQuestionIndex+'_'+i).children().each(function(this) {
                var lbl = $(this).attr('title');
                if(opts_count[lbl] === undefined) { opts_count[lbl] = 0; }
                var key = self.currentQuestion.options.find(function(item) { return item.label === lbl; });
                if(key !== undefined) {
                    let obj =  Object.assign({}, key);
                    obj.option_category = qopt.label;
                    obj.option_order = j;
                    answers.push(obj);
                    opts_count[lbl]++;
                    j++;
                }
            });

            i++;

        };
        this.userAnswers[this.currentQuestionIndex].answers = answers;
        var shouldLength = this.currentQuestion.options.length * this.currentQuestion.optBuckets.length;
    }

    nexteumdiv(nmbr){
      this.eum2box = this.eum2box + 1 ;
      $('.d-none').removeClass('d-none');
     }
    preveumdiv(nmbr){
      this.eum2box = this.eum2box - 1 ;
      $('.d-none').removeClass('d-none');
    }
}

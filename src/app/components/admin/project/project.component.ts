import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs'; 

import { DataService } from '../../../services/data.service';
import { ExcelServicesService } from '../../../services/excel-services.service';  

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class AprojectComponent implements OnInit {

    @BlockUI() blockUI: NgBlockUI;
    
    public projectId: any;
    public project: any;
     
    constructor(
        private dataService: DataService,
        private title: Title,
        private route: ActivatedRoute,
        private excelService:ExcelServicesService,
        private http: HttpClient
    ) {
        this.blockUI.start('Loading...'); // Start blocking
        this.projectId = this.route.snapshot.params.projectId;
//        this.getJSON().subscribe(data => {  
//        data.forEach(row => {  
//          this.excel.push(row);  
//        });  
//       });  
        
    }
    
   
    ngOnInit() {
    
        this.dataService.getProject(this.projectId).subscribe(
            data => {
                 this.project = data; 
                 this.title.setTitle('Project - ' + this.project.project_title);
                 
                 for(let survey of this.project.surveys) {
                    survey.questions = this.project.survey_questions.filter(que => que.survey_id === survey.id);
                    survey.answers = this.project.survey_answers.filter(ans => ans.survey_id === survey.id);
                    
                    survey.columns = [];
                    survey.rows = [];

                    if(this.project.project_type === 'LS') {
                      survey.columns.push({name: 'Participant Name', prop: 'Participant Name'});
                      survey.columns.push({name: 'Participant Email', prop: 'Participant Email'});
                    }
                    else {
                      survey.columns.push({name: 'Employee ID', prop: 'Employee ID'});
                      survey.columns.push({name: 'Employee Name', prop: 'Employee Name'});
                      survey.columns.push({name: 'Employee Email', prop: 'Employee Email'});
                    }

                    switch(survey.survey_code) {
                      case 'cva':
                        survey = this.cvaProcessData(survey);
                        break;
                        case 'ona': 
                        survey = this.onaProcessData(survey);
                        break;
                        case 'eum': 
                        survey = this.eumProcessData(survey);
                        break;
                    }

                   survey.activated = false;

                 };
//                 console.log(this.project);
                 this.blockUI.stop();
            },
            err => {
              console.log("inside project details error", JSON.stringify(err.message));
              alert(JSON.stringify(err.message));
              this.blockUI.stop();
        })
       
    }

    cvaProcessData(survey) {

      // 1. setup survey columns
      survey.columns.push({name: 'Question', prop: 'Question'});
      for(let opt_order of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] ) {
        survey.columns.push({name: 'Word ' + opt_order, prop: 'Word ' + opt_order});
      }
      
      // 2. setup survey rows
      for(let user of this.project.participants) {
        for (let question of survey.questions) {
          let row = {};
          if(this.project.project_type === 'LS') {
            row["Participant Name"] = user.first_name + ' ' + user.last_name;
            row["Participant Email"] = user.company_email;
          }
          else {
            row["Employee ID"] = user.emp_code;
            row["Employee Name"] = user.first_name + ' ' + user.last_name;
            row["Employee Email"] = user.company_email;
          }

          let user_answers = this.project.survey_answers.filter(ans => ans.employee_id === user.id && ans.question_id === question.id);
          
          if(user_answers !== undefined && user_answers.length > 0) {
            row["Question"] = question.question_text;
            for(let opt_order of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] ) {
                let user_answer = user_answers.find(ua => parseInt(ua.answer_order) === opt_order);
                row['Word ' + opt_order] = (user_answer !== undefined) ? user_answer.answer : '';
            }
            survey.rows.push(row);
          }
            
        }
      }

      return survey;
    }

    onaProcessData(survey) {
      
      // 1. setup survey columns
      survey.columns.push({name: 'Question', prop: 'Question'});
      for(let opt_order of [1, 2, 3] ) {
        survey.columns.push({name: 'Person ' + opt_order + ' Name', prop: 'Person ' + opt_order + ' Name'});
        survey.columns.push({name: 'Person ' + opt_order + ' Rating', prop: 'Person ' + opt_order + ' Rating'});
      }
      
      // 2. setup survey rows
      for(let user of this.project.participants) {
        for (let question of survey.questions) {
          let row = {};
        if(this.project.project_type === 'LS') {
          row["Participant Name"] = user.first_name + ' ' + user.last_name;
          row["Participant Email"] = user.company_email;
        }
        else {
          row["Employee ID"] = user.emp_code;
          row["Employee Name"] = user.first_name + ' ' + user.last_name;
          row["Employee Email"] = user.company_email;
        }
        let user_answers = this.project.survey_answers.filter(ans => ans.employee_id === user.id && ans.question_id === question.id);
          
          if(user_answers !== undefined && user_answers.length > 0) {
            row["Question"] = question.question_text;
            for(let opt_order of [1, 2, 3] ) {
                let user_answer = user_answers.find(ua => parseInt(ua.answer_order) === opt_order);
                let person = this.project.participants.find(part => part.id === user_answer.answer);
                row['Person ' + opt_order + ' Name'] = (user_answer !== undefined) ? person.first_name + ' ' + person.last_name : '';
                row['Person ' + opt_order + ' Rating'] =  (user_answer !== undefined) ? user_answer.answer_rating : '';
            }
            survey.rows.push(row);
          }
        }
      }

      return survey;
    }

    eumProcessData(survey) {
      
      // 1. setup survey columns
      survey.columns.push({name: 'Question', prop: 'Question'});
      for(let opt_order of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] ) {
        survey.columns.push({name: 'Priority ' + opt_order, prop: 'Priority ' + opt_order});
      }
      
      // 2. setup survey rows
      for(let user of this.project.participants) {
        for (let question of survey.questions) {
          let user_answers = this.project.survey_answers.filter(ans => ans.employee_id === user.id && ans.question_id === question.id);
          if(user_answers !== undefined && user_answers.length > 0) {
            for(let opt_category of question.opt_categories)  {
              let row = {};
              if(this.project.project_type === 'LS') {
                row["Participant Name"] = user.first_name + ' ' + user.last_name;
                row["Participant Email"] = user.company_email;
              }
              else {
                row["Employee ID"] = user.emp_code;
                row["Employee Name"] = user.first_name + ' ' + user.last_name;
                row["Employee Email"] = user.company_email;
              }
              row["Question"] = opt_category.opt_category_label;

              let oc_user_answers = user_answers.filter(ans => ans.answer_category === opt_category.opt_category_label);
              console.log(oc_user_answers);
              for(let opt_order of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] ) {
                  let user_answer = oc_user_answers.find(ua => parseInt(ua.answer_order) === opt_order);
                  console.log(user_answer);
                  row['Priority ' + opt_order] = (user_answer !== undefined) ? user_answer.answer : '';
              }
            
              survey.rows.push(row);
            }
          }              
        }
      }

      return survey;
    }

    tabActivated (survey) {
      survey.activated = true;
    }
    
      
    exportAsXLSX(survey) { 
      this.excelService.exportAsExcelFile(survey.rows, 'project_' + survey.project_id + '_' + survey.survey_code + '_answers');  
    }  
//    public getJSON(): Observable<any> {  console.log();
//      return this.project.surveys;
//    }  

}

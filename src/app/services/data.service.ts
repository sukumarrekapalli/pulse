import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

import { map } from 'rxjs/operators';
import { Employee } from '../models/employee.model';


@Injectable({
  providedIn: 'root'
})
export class DataService {

    constructor(private http: HttpClient) { 

    }
    
    getLeaderProject(projectId, email): Observable<any>{
        return this.http.get<any>(environment.apiUrl + "/lproject/" + projectId + '/' + encodeURI(email) + '/')
        .pipe(
          map(response => {

            let org = [];
          
            if (response) {
                org = response;
            }

            return org;
          })
        );
    }

    getSurvey(surveyCode): Observable<any>{
        return this.http.get<any>(environment.apiUrl + "/getSurvey/" + surveyCode)
        .pipe(
          map(response => {

            let org = [];
          
            if (response) {
                org = response;
            }

            return org;
          })
        );
    }

    getRegisterAccess(registerCode): Observable<any>{
        return this.http.get<any>(environment.apiUrl +'/verifyProject/'+ registerCode)
        .pipe(
          map(response => {

            let projectObj = [];
          
            if (response) {
                projectObj = response;
            }

            return projectObj;
          })
        );
    }

    registerUser(emp): Observable<any>{
        return this.http.post<Employee>(environment.apiUrl +'/registerUser/', emp)
        .pipe(
          map(response => {
            return response;
          })
        );
    }

    finishSurvey(surveyObj): Observable<any>{
        return this.http.post<any>(environment.apiUrl +'/saveSurvey/', surveyObj)
        .pipe(
          map(response => {
            return response;
          })
        );
    }
    
  getProjects(): Observable<any>{
      return this.http.get<any>(environment.apiUrl + "/projects")
      .pipe(
        map(response => {

          let projects = [];
        
          if (response && response.projects) {
              projects = response.projects;
          }

          return projects;
        })
      );
  }

  getLeaderProjects(user_id): Observable<any>{
    return this.http.get<any>(environment.apiUrl + "/lprojects/" + user_id)
    .pipe(
      map(response => {

        let projects = [];
      
        if (response && response.projects) {
            projects = response.projects;
        }

        return projects;
      })
    );
}

  getProject(projectId): Observable<any>{
      return this.http.get<any>(environment.apiUrl + "/project/" + projectId)
      .pipe(
        map(response => {

          let project = [];
        
          if (response) {
            project = response.project;
          }

          return project;
        })
      );
  }

  getLeadershipReport(lrId): Observable<any>{
    return this.http.get<any>(environment.apiUrl + "/lsreport/" + lrId)
    .pipe(
        map(response => {

            let lsreport = {};

            if (response) {
              lsreport = response;
            }

            return lsreport;
        })
    );
  }

 getCaSurvey(surveyCode): Observable<any>{
        return this.http.get<any>(environment.apiUrl + "/getCaSurvey/" + surveyCode)
        .pipe(
          map(response => {

            let org = [];
          
            if (response) {
                org = response;
            }

            return org;
          })
        );
    }
     finishCaSurvey(surveyObj): Observable<any>{
      return this.http.post<any>(environment.apiUrl +'/saveCaSurvey/', surveyObj)
      .pipe(
        map(response => {
          return response;
        })
      );
    }
    finishgavitySurvey(surveyObj): Observable<any>{
      return this.http.post<any>(environment.apiUrl +'/saveGravitySurvey/', surveyObj)
      .pipe(
        map(response => {
          return response;
        })
      );
    }

    getGravitySurvey(surveyCode): Observable<any>{
     return this.http.get<any>(environment.apiUrl + "/getGravitySurvey/" + surveyCode)
        .pipe(
          map(response => {

            let gravitysurvey = [];
          
            if (response) {
                gravitysurvey = response;
            }

            return gravitysurvey;
          })
        );
    }
    

};

    

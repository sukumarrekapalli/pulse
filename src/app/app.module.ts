import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as highmaps from 'highcharts/modules/map.src';
import { BlockUIModule } from 'ng-block-ui';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { Ng5SliderModule } from 'ng5-slider';
import { MomentModule } from 'ngx-moment';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TagCloudModule } from 'angular-tag-cloud-module';
//import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SurveyComponent } from './components/survey/survey.component';
import { RegisterComponent } from './components/register/register.component';
import { AprojectsComponent } from './components/admin/projects/projects.component';
import { AprojectComponent } from './components/admin/project/project.component';
import { PeoplespeakComponent } from './components/peoplespeak/peoplespeak.component';
import { LSReportComponent } from './components/lsreport/lsreport.component';
import { BnsComponent } from './components/bns/bns.component';
import { ValueassessmentComponent } from './components/valueassessment/valueassessment.component';
import { ValueassessmentempComponent } from './components/valueassessmentemp/valueassessmentemp.component';
import { CulturegenomeComponent } from './components/culturegenome/culturegenome.component';
import { IngenomeComponent } from './components/ingenome/ingenome.component';
import { MnagenomeComponent  } from './components/mnagenome/mnagenome.component';

import { InpComponent } from './components/inp/inp.component';


import { SlickCarouselModule } from 'ngx-slick-carousel';
import 'jquery-ui-dist/jquery-ui';
import 'sortablejs/Sortable';
import { NodataPipe } from './pipes/nodata.pipe';

import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { LeadershippulseComponent } from './components/leadershippulse/leadershippulse.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { LmainComponent } from './components/leader/lmain/lmain.component';
import { AmainComponent } from './components/admin/amain/amain.component';
import { AdaptqComponent } from './components/adaptq/adaptq.component';
import { CompsentimentComponent } from './components/compsentiment/compsentiment.component';
import { TypesurveyComponent } from './components/typesurvey/typesurvey.component';
import { GravityilabsurveyComponent } from './components/gravityilabsurvey/gravityilabsurvey.component';
import { ValueassessmentcultureComponent } from './components/valueassessmentculture/valueassessmentculture.component';
import { CompsentimentcultureComponent } from './components/compsentimentculture/compsentimentculture.component';
import { PeoplespeakcultureComponent } from './components/peoplespeakculture/peoplespeakculture.component';
import { AdaptqcultureComponent } from './components/adaptqculture/adaptqculture.component';
import { LeadershippulsecultureComponent } from './components/leadershippulseculture/leadershippulseculture.component';
import { BnscultureComponent } from './components/bnsculture/bnsculture.component';
import { GravityilabComponent } from './components/gravityilab/gravityilab.component';
import { CountToModule } from 'angular-count-to';
import { NgCircleProgressModule } from 'ng-circle-progress';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    DashboardComponent,
    SurveyComponent,
    RegisterComponent,
    AprojectsComponent,
    NodataPipe,
    AprojectComponent,
    PeoplespeakComponent,
    LeadershippulseComponent,
    HeaderComponent,
    LmainComponent,
    AmainComponent,
    LSReportComponent,
    BnsComponent,
    InpComponent,
    ValueassessmentComponent,
    ValueassessmentempComponent,
    CulturegenomeComponent,
    IngenomeComponent,
    MnagenomeComponent,
    AdaptqComponent,
    CompsentimentComponent,
    TypesurveyComponent,
    GravityilabsurveyComponent,
    ValueassessmentcultureComponent,
    CompsentimentcultureComponent,
    PeoplespeakcultureComponent,
    AdaptqcultureComponent,
    LeadershippulsecultureComponent,
    BnscultureComponent,
    GravityilabComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    FontAwesomeModule,
    ChartModule,
    BlockUIModule.forRoot(),
    AutocompleteLibModule,
    ReactiveFormsModule,
    FormsModule,
    SlickCarouselModule,
    Ng5SliderModule,
    NgxDatatableModule,
    CountToModule,
    MomentModule.forRoot({
      relativeTimeThresholdOptions: {
        'm': 59
      }
    }),
     NgCircleProgressModule.forRoot({
      // set defaults here
     "backgroundPadding":2,
      "radius": 42,
      "space": -2,
      "maxPercent": 100,
      "title": "NA",
      "outerStrokeWidth": 4,
      "innerStrokeWidth": 2,
      "showSubtitle": false,
      "showUnits": false,
      "showBackground": false,
      "startFromZero": false
    }),
    TagCloudModule
    //DragDropModule
  ],
  providers: [
    { provide: HIGHCHARTS_MODULES, useFactory: () => [ highmaps ] },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {
        // Add an icon to the library for convenient access in other components
        library.add(fas, far);
    }
}

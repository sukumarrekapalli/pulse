import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { LoginComponent } from './components/login/login.component'; 
import { MainComponent } from './components/main/main.component'; 
import { SurveyComponent } from './components/survey/survey.component'; 
import { DashboardComponent } from './components/dashboard/dashboard.component'; 
import { RegisterComponent } from './components/register/register.component'; 
import { AprojectsComponent } from './components/admin/projects/projects.component'; 
import { AprojectComponent } from './components/admin/project/project.component'; 
import { LSReportComponent } from './components/lsreport/lsreport.component'; 
import { TypesurveyComponent } from './components/typesurvey/typesurvey.component';
import { GravityilabsurveyComponent } from './components/gravityilabsurvey/gravityilabsurvey.component';
import { CulturegenomeComponent } from './components/culturegenome/culturegenome.component';


import { AuthGuard } from './guards/auth.guard'; 

const routes: Routes = [
    { path: '', redirectTo: '/main', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'main', component: MainComponent, canActivate: [AuthGuard] },
    { path: 'dashboard/:projectId', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'survey/:surveyCode', component: SurveyComponent },
    { path: 'tipesurvey/:surveyCode', component: TypesurveyComponent },
    { path: 'gravityilabsurvey/:surveyCode', component: GravityilabsurveyComponent },
    { path: 'survey', component: SurveyComponent },
    { path: 'register/:registerCode', component: RegisterComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'admin/projects', component: AprojectsComponent, canActivate: [AuthGuard] },
    { path: 'admin/project/:projectId', component: AprojectComponent, canActivate: [AuthGuard] },
    { path: 'lsreport/:lrId', component: LSReportComponent, canActivate: [AuthGuard] },
    { path: 'gravityIlab/:projectId', component: CulturegenomeComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

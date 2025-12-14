import { Routes } from '@angular/router';
import { PayrollComponent } from './pages/payroll/payroll.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { SettingComponent } from './pages/setting/setting.component';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { SeafarerList } from './pages/seafarers/seafarer-list/seafarer-list';
import { VacancyComponent } from './pages/vacancy/vacancy.component';
import { VesselsComponent } from './pages/vessels/vessels.component';
import { PreJoiningComponent } from './pages/pre-joining/pre-joining.component';
import { PlanningComponent } from './pages/planning/planning.component';
import { PlanningScheduleComponent } from './pages/planning/planning-schedule/planning-schedule.component';
import { Login } from './pages/login/login';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login},
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'vacancies', component: VacancyComponent, canActivate: [authGuard] },
  { path: 'seafarers', component: SeafarerList, canActivate: [authGuard] },
  { path: 'vessels', component: VesselsComponent, canActivate: [authGuard] },
  { path: 'prejoining', component: PreJoiningComponent, canActivate: [authGuard] },
  { path: 'planning', component: PlanningComponent, canActivate: [authGuard] },
  { path: 'planning/planningSchedule', component: PlanningScheduleComponent, canActivate: [authGuard] },
  { path: 'payroll', component: PayrollComponent, canActivate: [authGuard] },
  { path: 'reports', component: ReportsComponent, canActivate: [authGuard] },
  { path: 'setting', component: SettingComponent, canActivate: [authGuard] },

  { path: '**', redirectTo: 'dashboard' } 
];

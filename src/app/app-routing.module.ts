import { AuthGuardService } from './auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate:[AuthGuardService]},
  { path: 'users', loadChildren: './users/users.module#UsersModule', canActivate:[AuthGuardService] },
  { path: 'appointments', loadChildren: './appointments/appointments.module#AppointmentsModule', canActivate:[AuthGuardService] },
  { path: 'addemployees', loadChildren: './addemployees/addemployees.module#AddemployeesModule',canActivate:[AuthGuardService] },
  { path: 'addnewclient', loadChildren: './addnewclient/addnewclient.module#AddnewclientModule',canActivate:[AuthGuardService] },
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule',canActivate:[AuthGuardService] },
  { path: 'editemployee/:id', loadChildren: './editemployee/editemployee.module#EditemployeeModule',canActivate:[AuthGuardService] },
   { path: 'addappointments', loadChildren: './addappointments/addappointments.module#AddappointmentsModule',canActivate:[AuthGuardService] },
    { path: 'addservices', loadChildren: './addservices/addservices.module#AddservicesModule',canActivate:[AuthGuardService] },
  
   { path: 'clientcategories', loadChildren: './clientcategories/clientcategories.module#ClientcategoriesModule',canActivate:[AuthGuardService] },
   { path: 'publicholiday', loadChildren: './publicholiday/publicholiday.module#PublicholidayModule',canActivate:[AuthGuardService] },
  { path: 'editservice/:id', loadChildren: './editservice/editservice.module#EditserviceModule',canActivate:[AuthGuardService] },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule',
    data: { showHeader: false, showSidebar: false }
  },
  {
    path: 'signup',
    loadChildren: './signup/signup.module#SignupModule',
    data: { showHeader: false, showSidebar: false }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

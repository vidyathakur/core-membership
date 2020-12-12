import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MembershipComponent } from 'src/app/membership/membership.component';

const routes: Routes = [
  {path:'', component:MembershipComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembershipRoutingModule { }

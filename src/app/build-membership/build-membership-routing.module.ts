import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuildMembershipComponent } from 'src/app/build-membership/build-membership.component';

const routes: Routes = [
  {path:'', component:BuildMembershipComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuildMembershipRoutingModule { }

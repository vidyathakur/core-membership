import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientformembershipComponent } from 'src/app/clientformembership/clientformembership.component';

const routes: Routes = [
  {path:'', component:ClientformembershipComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientformembershipRoutingModule { }

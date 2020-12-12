import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientexistingComponent } from 'src/app/clientexisting/clientexisting.component';

const routes: Routes = [
  {path:'', component:ClientexistingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientexistingRoutingModule { }

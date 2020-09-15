import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditserviceComponent } from 'src/app/editservice/editservice.component';

const routes: Routes = [
   { path: '', component: EditserviceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditserviceRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditresourcesComponent } from 'src/app/editresources/editresources.component';

const routes: Routes = [
   { path: '', component: EditresourcesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditresourcesRoutingModule { }

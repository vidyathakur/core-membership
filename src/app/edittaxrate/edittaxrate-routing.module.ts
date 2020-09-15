import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EdittaxrateComponent } from 'src/app/edittaxrate/edittaxrate.component';

const routes: Routes = [
  { path: '', component: EdittaxrateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EdittaxrateRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicholidayComponent } from 'src/app/publicholiday/publicholiday.component';

const routes: Routes = [
  { path: '', component: PublicholidayComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicholidayRoutingModule { }

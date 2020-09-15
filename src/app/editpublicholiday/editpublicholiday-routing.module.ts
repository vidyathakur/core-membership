import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditpublicholidayComponent } from 'src/app/editpublicholiday/editpublicholiday.component';

const routes: Routes = [
  { path: '', component: EditpublicholidayComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditpublicholidayRoutingModule { }

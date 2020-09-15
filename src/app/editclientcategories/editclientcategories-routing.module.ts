import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditclientcategoriesComponent } from 'src/app/editclientcategories/editclientcategories.component';

const routes: Routes = [
  { path: '', component: EditclientcategoriesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditclientcategoriesRoutingModule { }

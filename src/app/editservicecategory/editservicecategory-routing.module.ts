import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditservicecategoryComponent } from 'src/app/editservicecategory/editservicecategory.component';

const routes: Routes = [
  { path: '', component: EditservicecategoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditservicecategoryRoutingModule { }

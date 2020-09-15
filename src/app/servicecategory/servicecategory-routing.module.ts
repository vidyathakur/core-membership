import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicecategoryComponent } from 'src/app/servicecategory/servicecategory.component';

const routes: Routes = [
  {path:'', component: ServicecategoryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicecategoryRoutingModule { }

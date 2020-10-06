import { HttpInterceptorService } from './http-interceptor.service';
import { LayoutModule } from './layout/layout.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClientcategoriesComponent } from './clientcategories/clientcategories.component';
import { PublicholidayComponent } from './publicholiday/publicholiday.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServicecategoryComponent } from './servicecategory/servicecategory.component';
import { TaxrateComponent } from './taxrate/taxrate.component';
import { EditservicecategoryComponent } from './editservicecategory/editservicecategory.component';
import { EdittaxrateComponent } from './edittaxrate/edittaxrate.component';
import { EditpublicholidayComponent } from './editpublicholiday/editpublicholiday.component';
import { EditclientcategoriesComponent } from './editclientcategories/editclientcategories.component';
import { ResourcesComponent } from './resources/resources.component';
import { EditresourcesComponent } from './editresources/editresources.component';
import { ServicelevelComponent } from './servicelevel/servicelevel.component';
import { EditservicelevelComponent } from './editservicelevel/editservicelevel.component';
import { ServiceresourceComponent } from './serviceresource/serviceresource.component';
import { EditserviceresourcesComponent } from './editserviceresources/editserviceresources.component';
import { ServiceitemComponent } from 'src/app/serviceitem/serviceitem.component';
import { EditserviceitemComponent } from './editserviceitem/editserviceitem.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientcategoriesComponent,
    PublicholidayComponent,
    ServicecategoryComponent,
    TaxrateComponent,
    EditservicecategoryComponent,
    EdittaxrateComponent,
    EditpublicholidayComponent,
    EditclientcategoriesComponent,
    ResourcesComponent,
    EditresourcesComponent,
    ServicelevelComponent,
    EditservicelevelComponent,
    ServiceresourceComponent,
    EditserviceresourcesComponent,
    ServiceitemComponent,
    EditserviceitemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    ChartsModule,
    RouterModule.forRoot([]),
    LayoutModule,
    AppRoutingModule
  ],
  
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
  ],
   entryComponents:[
    ClientcategoriesComponent,
    PublicholidayComponent,
    ServicecategoryComponent,
    TaxrateComponent,
    EditservicecategoryComponent,
    EdittaxrateComponent,
    EditpublicholidayComponent,
    EditclientcategoriesComponent,
    ResourcesComponent,
    EditresourcesComponent,
    ServicelevelComponent,
    EditservicelevelComponent,
    ServiceresourceComponent,
    EditserviceresourcesComponent,
    ServiceitemComponent,
    EditserviceitemComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentsRoutingModule } from './appointments-routing.module';
import { AppointmentsComponent } from './appointments.component';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';

import { DropDownListAllModule, MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';

import { MaskedTextBoxModule, UploaderAllModule } from '@syncfusion/ej2-angular-inputs';

import { ToolbarAllModule, ContextMenuAllModule } from '@syncfusion/ej2-angular-navigations';

import { ButtonAllModule } from '@syncfusion/ej2-angular-buttons';

import { CheckBoxAllModule } from '@syncfusion/ej2-angular-buttons';

import { DatePickerAllModule, TimePickerAllModule, DateTimePickerAllModule } from '@syncfusion/ej2-angular-calendars';

import { NumericTextBoxAllModule, TextBoxAllModule } from '@syncfusion/ej2-angular-inputs';

import { ScheduleAllModule, RecurrenceEditorAllModule } from '@syncfusion/ej2-angular-schedule';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ng6-toastr-notifications';
import { Time24to12Format } from 'src/app/pipe/time24to12.pipe';

@NgModule({
  declarations: [AppointmentsComponent,Time24to12Format],
  imports: [
    CommonModule,
		HttpClientModule,
		 NgxSpinnerModule,
		 ToastrModule.forRoot(),
    ScheduleAllModule,
		RecurrenceEditorAllModule,
		NumericTextBoxAllModule,
		TextBoxAllModule,
		DatePickerAllModule,
		TimePickerAllModule,
		DateTimePickerAllModule,
		CheckBoxAllModule,
		ToolbarAllModule,
		DropDownListAllModule,
		ContextMenuAllModule,
		MaskedTextBoxModule,
		UploaderAllModule,
		MultiSelectAllModule,
		TreeViewModule,
		ButtonAllModule,
    AppointmentsRoutingModule
  ]
})
export class AppointmentsModule { }

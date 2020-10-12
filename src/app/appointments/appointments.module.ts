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
import { SharedModule } from 'src/app/shared/shared.module';
import { RadioButtonModule } from '@syncfusion/ej2-angular-buttons';

@NgModule({
  declarations: [AppointmentsComponent],
  imports: [
    CommonModule,
		FormsModule,
		ReactiveFormsModule,
    HttpClientModule,
		NgxSpinnerModule,
		ToastrModule.forRoot(),
    ScheduleAllModule,
		SharedModule,
		RecurrenceEditorAllModule,
		NumericTextBoxAllModule,
		TextBoxAllModule,
		RadioButtonModule, 
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

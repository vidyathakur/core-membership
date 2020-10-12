import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { extend, isNullOrUndefined, Browser, Internationalization, L10n } from '@syncfusion/ej2-base';
import {
	ScheduleComponent,
	ActionEventArgs,
	PopupOpenEventArgs,
	EventRenderedArgs,
	RenderCellEventArgs,
	DragAndDropService,
	TimelineViewsService,
	GroupModel,
	EventSettingsModel,
	ResizeService,
	TimeScaleModel,
	WorkHoursModel,
	View,
	ResourceDetails,
	TreeViewArgs
} from '@syncfusion/ej2-angular-schedule';
import { AdminService } from 'src/app/admin/admin.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtService } from 'src/app/login/jwt.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { roomData, resourceConferenceData, scheduleData, doctorData } from 'src/app/appointments/data';
import { AppointmentsService } from 'src/app/appointments/appointments.service';

import {
	DayService,
	WeekService,
	WorkWeekService,
	MonthService,
	AgendaService
} from '@syncfusion/ej2-angular-schedule';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

L10n.load({
  'en-US': {
      'schedule': {
          'saveButton': 'Save',
          'cancelButton': 'Close',
          'deleteButton': 'Remove',
          'newEvent': 'Add Appointments',
      },
  }
});

@Component({
	selector: 'app-appointments',
	templateUrl: './appointments.component.html',
	styleUrls: ['./appointments.component.css'],
	encapsulation: ViewEncapsulation.None,
	providers: [TimelineViewsService, ResizeService, DragAndDropService]
})
export class AppointmentsComponent implements OnInit {
	service_id: any;
	public empLevelNames: any;
	public currentEmployees: any;
	public TimeArray: any;
	public data: Object[] = <Object[]>extend([], resourceConferenceData, null, true);
	//public selectedDate: Date = new Date();
	public timeScale: TimeScaleModel = {
		enable: true,
		interval: 60,
		slotCount: 4,
		majorSlotTemplate: '#majorSlotTemplate',
		minorSlotTemplate: '#minorSlotTemplate'
	};
	public instance: Internationalization = new Internationalization();
	getMajorTime(date: Date): string {
		return this.instance.formatDate(date, { skeleton: 'hm' });
	}
	getMinorTime(date: Date): string {
		return this.instance.formatDate(date, { skeleton: 'hm' });
	}
	public selectedDate: Date = new Date(2018, 3, 5);
	public views: Array<string> = ['Week', 'Month', 'TimelineWeek', 'TimelineMonth', 'Agenda'];
	public eventSettings: EventSettingsModel = {
		dataSource: doctorData
	};
	public group: GroupModel = {
		resources: ['Doctors']
	};
	public allowMultipleDoctors: Boolean = true;
	public doctorDataSource: Object[] = [
		// { text: 'Will Smith', id: 1, color: '#ea7a57', designation: 'Cardioligst' },
		// { text: 'Alice', id: 2, color: '#7fa900', designation: 'Neurologist' },
		// { text: 'Robson', id: 3, color: '#7fa900', designation: 'Orthopedic Surgeon' }
	];
	public dateParser(data: string) {
		return new Date(data);
	}
	public statusFields: Object = { text: 'StatusText', value: 'StatusText' };
	public StatusData: Object[] = [
		{ StatusText: 'New', Id: 1 },
		{ StatusText: 'Requested', Id: 2 },
		{ StatusText: 'Confirmed', Id: 3 }
	];
	public durationFields: Object = { text: 'DurationText', value: 'DurationText' };
	public DurationData: Object[] = [
		{ DurationText: '0 HRS', Id: 1, value: '00' },
		{ DurationText: '1 HRS', Id: 2, value: '00' },
		{ DurationText: '2 HRS', Id: 3, value: '00' },
		{ DurationText: '3 HRS', Id: 1, value: '00' },
		{ DurationText: '4 HRS', Id: 2, value: '00' },
		{ DurationText: '5 HRS', Id: 3, value: '00' },
		{ DurationText: '6 HRS', Id: 1, value: '00' },
		{ DurationText: '7 HRS', Id: 2, value: '00' },
		{ DurationText: '8 HRS', Id: 3, value: '00' },
		{ DurationText: '9 HRS', Id: 1, value: '00' }
	];
	public serviceFields: Object = {};
	public ServiceData: Object[] = [];

	// public group: GroupModel = { allowGroupEdit: true, resources: ['Conferences'] };
	// public allowMultiple: Boolean = true;

	// public eventSettings: EventSettingsModel = { dataSource: <Object[]>extend([], scheduleData, null, true) };
	appointmentForm: FormGroup;
	closeResult: string;
	@Input() fromParent;
	submitted = false;
	constructor(
		private SpinnerService: NgxSpinnerService,
		public router: Router,
		public toastr: ToastrManager,
		private jwtService: JwtService,
		private formBuilder: FormBuilder,
		private _route: ActivatedRoute,
		public appointmentsService: AppointmentsService,
		public adminService: AdminService
	) {
		this.appointmentForm = this.formBuilder.group({
			client_id: new FormControl('', Validators.required),
			service_id: new FormControl('', Validators.required),
			price: new FormControl(''),
			comment: new FormControl(''),
			flag_as: new FormControl(''),
			duration: new FormControl(''),
			start_date: new FormControl(''),
			Subject: new FormControl('')
		});
	}

	// getEmployeeName(value: ResourceDetails | TreeViewArgs): string {
	// 	return (value as ResourceDetails).resourceData
	// 		? (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.textField] as string
	// 		: (value as TreeViewArgs).resourceName;
	// }
	// getEmployeeDesignation(value: ResourceDetails | TreeViewArgs): string {
	// 	return (value as ResourceDetails).resourceData
	// 		? (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.idField] as string
	// 		: (value as TreeViewArgs).resourceName;
	// }
	// getEmployeeImage(value: ResourceDetails | TreeViewArgs): string {
	// 	let resourceName: string = this.resourceData(value);
	// 	return resourceName.replace(' ', '-').toLowerCase();
	// }

	ngOnInit() {
		//this.getOpeningDay();
		this.getServiceByMerchantId();
		this.appointmentsService.getEmpDetailByMerchantId({}).subscribe(
			data => {
				console.log(data);
				let currentEmployees = data['data'];
				let finalArrayData = [];
				currentEmployees.forEach((item, key) => {
					console.log(item);
					let object = { text: '', designation: '', color: '', id: '' };
					object.text = item.f_name;
					object.color = item.color;
					object.id = item.id;
					object.designation = item.display_name;
					if (item.emp_levels) {
						object.designation = item.emp_levels.name;
					}
					finalArrayData.push(object);
				});
				this.doctorDataSource = finalArrayData;
				console.log(this.doctorDataSource);
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('some error occured');
			}
		);
	}

	onActionBegin(args: ActionEventArgs): void {
		if (args.requestType === 'eventChange') {
			//while editing the existing event
			console.log('event edit');
		}
		if (args.requestType === 'eventCreate') {
			//while creating new event
			this.submitted = true;
			if (!this.appointmentForm.invalid) {
				let appointment_data = this.appointmentForm.value;
				let data = {
					client_id: appointment_data.client_id,
					price: appointment_data.price || '',
					comment: appointment_data.comment || '',
					flag_as: appointment_data.flag_as || '',
					duration: appointment_data.duration || '',
					start_date: appointment_data.start_date || '',
					service_id: appointment_data.service_id,
					Subject: appointment_data.Subject || ''
				};
				console.log(data);
				this.appointmentsService.createAppointment(data).subscribe(apiResponse => {
					if (apiResponse.code === 200) {
						this.toastr.successToastr('Appointment Added Successfully');
					} else {
						console.log('Hello');
						this.toastr.errorToastr(apiResponse.message);
					}
				});
			}
			console.log('event create');
		}
	}

	public getServiceByMerchantId(): any {
		this.adminService.getServiceByMerchantId().subscribe(
			data => {
				console.log(data);
				let currentEmployees = data['data'];
				let finalArrayData = [];
				currentEmployees.forEach((item, key) => {
					console.log(item);
					let object = { text: '', id: '' };
					object.text = item.service_name;
					object.id = item.id;
					if (item.emp_levels) {
						object.text = item.emp_levels.service_name;
					}
					finalArrayData.push(object);
				});
				this.ServiceData = finalArrayData;
				console.log(this.ServiceData);
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('some error occured');
			}
		);
	}

	
}

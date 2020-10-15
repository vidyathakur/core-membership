import { AddnewclientService } from '../addnewclient/addnewclient.service';
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
import { RadioButton,Button } from '@syncfusion/ej2-buttons';
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
let radioButton: RadioButton = new RadioButton({label: 'Credit/Debit Card', name: 'payment', value: 'credit/debit', checked: true});
radioButton.appendTo('#radio1');
@Component({
	selector: 'app-appointments',
	templateUrl: './appointments.component.html',
	styleUrls: ['./appointments.component.css'],
	encapsulation: ViewEncapsulation.None,
	providers: [TimelineViewsService, ResizeService, DragAndDropService]
})
export class AppointmentsComponent implements OnInit {
	doctorData: any;
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
	employee_data: any;
	clientId: any;
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
		// { text: 'Alice', color: '#7fa900', designation: 'Neurologist' },
		// { text: 'Robson', id: 3, color: '#7fa900', designation: 'Orthopedic Surgeon' }
	];
	public dateParser(data: string) {
		return new Date(data);
	}
	public statusFields: Object = { text: 'StatusText', value: 'StatusText' };
	public StatusData: Object[] = [{ StatusText: 'New' }, { StatusText: 'Requested' }, { StatusText: 'Confirmed' }];
	public durationFields: Object = { text: 'DurationText', value: 'DurationText' };
	public DurationData: Object[] = [
		{ DurationText: '0 HRS', value: '00' },
		{ DurationText: '1 HRS', value: '00' },
		{ DurationText: '2 HRS', value: '00' },
		{ DurationText: '3 HRS', value: '00' },
		{ DurationText: '4 HRS', value: '00' },
		{ DurationText: '5 HRS', value: '00' },
		{ DurationText: '6 HRS', value: '00' },
		{ DurationText: '7 HRS', value: '00' },
		{ DurationText: '8 HRS', value: '00' },
		{ DurationText: '9 HRS', value: '00' }
	];
	public serviceFields: Object = {};
	public ServiceData: Object[] = [];

	public clientFields: Object = {};
	public ClientData: Object[] = [];

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
		public adminService: AdminService,
		public addnewclientService: AddnewclientService
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
		this.getClientDetailsByMerchantID();
		this.getServiceByMerchantId();
		this.appointmentsService.getEmpDetailByMerchantId({}).subscribe(
			data => {
				console.log(data);
				let currentEmployees = data['data'];
				this.employee_data = data['data'];
				let finalArrayData = [];
				currentEmployees.forEach((item, key) => {
					console.log(item);
					let object = { text: '', designation: '', color: '', id: '', Id: '' };
					object.text = item.f_name;
					object.color = item.color;
					object.id = item.id;
					object.Id = item.id;
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
	public clientChange(argsss): void {
		console.log(argsss);
		let clientId = argsss.itemData;
		this.clientId = clientId.id;
	}

	
	public serviceChange(argsss): void {
		console.log(argsss);
		let serviceId = argsss.itemData;
		this.service_id = serviceId.id;
	}



	onActionBegin(args: ActionEventArgs): void {
		if (args.requestType === 'eventChange') {
			//while editing the existing event
			console.log('event edit');
		}

		if (args.requestType === 'eventCreate') {
			let data = args.data[0];
			console.log(data);
			let postData = {
				client_id: this.clientId || '',
				service_id: this.service_id || '',
				comment: data.comment || '',
				flag_as: data.flag_as || '',
				duration: data.duration || '',
				endTime: data.EndTime || '',
				startTime : data.start_date || '',
				employee_id : data.DoctorId || ''
			};
			console.log(postData);
				this.appointmentsService.createAppointment(data).subscribe(apiResponse => {
					if (apiResponse.code === 200) {
						this.toastr.successToastr('Appointment Added Successfully');
					} else {
						console.log('Hello');
						this.toastr.errorToastr(apiResponse.message);
					}
				});
			console.log('event create');
		}
	}
	
	public getClientDetailsByMerchantID(): any {
		this.addnewclientService.getClientDetailsByMerchantID({}).subscribe(
			data => {
				console.log(data);
				let currentEmployees = data['data'];
				let finalArrayData = [];
				currentEmployees.forEach((item, key) => {
					console.log(item);
					let object = { text: '', id: '' };
					object.text = item.f_name;
					object.id = item.id;
					if (item.emp_levels) {
						object.text = item.emp_levels.f_name;
					}
					finalArrayData.push(object);
				});
				this.ClientData = finalArrayData;
				console.log(this.ClientData);
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('some error occured');
			}
		);
	}
}

import { EmployeehoursService } from '../employeehours/employeehours.service';
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
import { doctorData } from 'src/app/appointments/data';
import { AppointmentsService } from 'src/app/appointments/appointments.service';

import {
	DayService,
	WeekService,
	WorkWeekService,
	MonthService,
	AgendaService,
	Schedule,
	TimelineViews,
	TimelineMonth,
	DragAndDrop,
	Resize,
	Day
} from '@syncfusion/ej2-angular-schedule';

/**
 * schedule block events sample
 */
Schedule.Inject(Day, TimelineViews, TimelineMonth, Resize, DragAndDrop);
// tslint:disable-next-line:max-func-body-length

import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
L10n.load({
	'en-US': {
		schedule: {
			saveButton: 'Save',
			cancelButton: 'Close',
			deleteButton: 'Remove',
			newEvent: 'Add Appointments'
		}
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
	doctorData: any;
	service_id: any;
	public empLevelNames: any;
	public currentEmployees: any;
	public TimeArray: any;
	public data: Object[] = <Object[]>extend([], [], null, true);
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

	public selectedDate: Date = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate());
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
		public addnewclientService: AddnewclientService,
		public employeehoursservice: EmployeehoursService
	) {
		// this.appointmentForm = this.formBuilder.group({
		// 	client_id: new FormControl('', Validators.required),
		// 	service_id: new FormControl('', Validators.required),
		// 	price: new FormControl(''),
		// 	comment: new FormControl(''),
		// 	flag_as: new FormControl(''),
		// 	duration: new FormControl(''),
		// 	start_date: new FormControl(''),
		// 	Subject: new FormControl(''),
		// 	Location: new FormControl('')
		// });
	}

	ngOnInit() {
		let data = new Date();
		let year = data.getFullYear();
		let month = data.getMonth() + 1;
		let day = data.getDate();
		let current_date = day + '-' + month + '-' + year;
		console.log(current_date);
		this.getCalendarData(current_date);
		// this.getServiceByMerchantId();
		// this.getClientDetailsByMerchantID();
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

	// public getServiceByMerchantId(): any {
	// 	this.adminService.getServiceByMerchantId().subscribe(
	// 		data => {
	// 			console.log(data);
	// 			let currentEmployees = data['data'];
	// 			let finalArrayData = [];
	// 			currentEmployees.forEach((item, key) => {
	// 				console.log(item);
	// 				let object = { text: '', id: '' };
	// 				object.text = item.service_name;
	// 				object.id = item.id;
	// 				if (item.emp_levels) {
	// 					object.text = item.emp_levels.service_name;
	// 				}
	// 				finalArrayData.push(object);
	// 			});
	// 			this.ServiceData = finalArrayData;
	// 			console.log(this.ServiceData);
	// 		},
	// 		error => {
	// 			console.log('some error occured');
	// 			this.toastr.errorToastr('some error occured');
	// 		}
	// 	);
	// }
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

	// onActionBegin(args: ActionEventArgs): void {
	// 	if (args.requestType === 'eventChange') {
	// 		//while editing the existing event
	// 		console.log('event edit');
	// 	}

	// 	if (args.requestType === 'eventCreate') {
	// 		let data = args.data[0];
	// 		console.log(data);
	// 		let postData = {
	// 			client_id: this.clientId || '',
	// 			service_id: this.service_id || '',
	// 			comment: data.comment || '',
	// 			flag_as: data.flag_as || '',
	// 			duration: data.duration || '',
	// 			endTime: data.EndTime || '',
	// 			startTime: data.start_date || '',
	// 			employee_id: data.DoctorId || ''
	// 		};
	// 		console.log(postData);
	// 		this.appointmentsService.createAppointment(data).subscribe(apiResponse => {
	// 			if (apiResponse.code === 200) {
	// 				this.toastr.successToastr('Appointment Added Successfully');
	// 			} else {
	// 				console.log('Hello');
	// 				this.toastr.errorToastr(apiResponse.message);
	// 			}
	// 		});
	// 		console.log('event create');
	// 	}
	// }

	// public getClientDetailsByMerchantID(): any {
	// 	this.addnewclientService.getClientDetailsByMerchantID({}).subscribe(
	// 		data => {
	// 			console.log(data);
	// 			let currentEmployees = data['data'];
	// 			let finalArrayData = [];
	// 			currentEmployees.forEach((item, key) => {
	// 				console.log(item);
	// 				let object = { text: '', id: '' };
	// 				object.text = item.f_name;
	// 				object.id = item.id;
	// 				if (item.emp_levels) {
	// 					object.text = item.emp_levels.f_name;
	// 				}
	// 				finalArrayData.push(object);
	// 			});
	// 			this.ClientData = finalArrayData;
	// 			console.log(this.ClientData);
	// 		},
	// 		error => {
	// 			console.log('some error occured');
	// 			this.toastr.errorToastr('some error occured');
	// 		}
	// 	);
	// }

	actionBegin(args){
		console.log(args);
	}

	actionComplete(args){
	    let scheduleElement: HTMLElement = document.getElementById('schedule') as HTMLElement;

			if (args.requestType === 'toolBarItemRendered') {
				let userIconEle: HTMLElement = scheduleElement.querySelector('.e-tbar-btn-text') as HTMLElement;
				console.log(userIconEle);
			}
	}

	

	public getCalendarData(start_date): any {
		console.log(start_date);
		this.appointmentsService.getCalendarData(start_date).subscribe(
			data => {
					let currentEmployees = data['data'];
					let finalArrayData = [];
					let k=1;
					for(let i in currentEmployees){
						let employees = currentEmployees[i];
						let [start_time_hours,start_time_minute,start_time_sec] = (employees.start_time).split(':');
						let [end_time_hours,end_time_minute,end_time_sec] = (employees.end_time).split(':');
						let [day,month,year] = start_date.split('-');
						let object = { Id: k,Subject: '',StartTime:
						new Date(year,month-1,day,start_time_hours,start_time_minute) ,
						EndTime: new Date(year,month-1,day,end_time_hours,end_time_minute),IsAllDay: false,DoctorId: employees.id};
						if(currentEmployees[i].services){
							let services = currentEmployees[i].services;
							for(let j in services) {
								object.Subject = employees.client + '<br />' + services[j].service_name + '<br />';
								//object.Subject = 'New Title - '+employees.employee_name;
								finalArrayData.push(object);
							}
						}
					}
					console.log(finalArrayData);
				/*	currentEmployees.forEach((item, key) => {
						console.log(item);
						let object = { Subject: '', DoctorId: '',StartTime:'', EndTime:''};
						object.Subject = item.client;
						object.DoctorId = item.id;
						object.StartTime = item.start_time;
						object.EndTime = item.end_time;
						if (item.emp_levels) {
							object.Subject = item.emp_levels.client;
						}
						finalArrayData.push(object);
					});*/
					// this.eventSettings: EventSettingsModel = {
					// 	dataSource: finalArrayData
					// };
					console.log(this.eventSettings = {dataSource:finalArrayData});
					//this.doctorData = finalArrayData;
					console.log(this.doctorData);
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('some error occured');
			}
		);
	}
}

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit, ViewEncapsulation, ElementRef } from '@angular/core';
import { extend, isNullOrUndefined, Browser, Internationalization, L10n } from '@syncfusion/ej2-base';
import { AppointmentsService } from 'src/app/appointments/appointments.service';
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
import {
	DayService,
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
// Schedule.Inject(Day, TimelineViews, TimelineMonth, Resize, DragAndDrop);
// tslint:disable-next-line:max-func-body-length

import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import value from '*.json';
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
	selector: 'app-timeslots',
	templateUrl: './timeslots.component.html',
	styleUrls: ['./timeslots.component.css'],
	encapsulation: ViewEncapsulation.None,
	providers: [TimelineViewsService, ResizeService, DragAndDropService]
})
export class TimeslotsComponent implements OnInit {
	doctorData: any;
	service_id: any;
	public empLevelNames: any;
	public currentEmployees: any;
	public allStaff: any;
	public TimeArray: any;
	public data: Object[] = <Object[]>extend([], [], null, true);
	m: number;
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
	showdates: any;
	getMajorTime(date: Date): string {
		return this.instance.formatDate(date, { skeleton: 'hm' });
	}
	getMinorTime(date: Date): string {
		return this.instance.formatDate(date, { skeleton: 'hm' });
	}

	public selectedDate: Date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
	// public views: Array<any> = ['Week', 'Month', 'TimelineWeek', 'TimelineMonth', 'Agenda'];
	//	public currentView: View = 'Day';
	public eventSettings: EventSettingsModel = {
		dataSource: doctorData
	};
	public group: GroupModel = {
		resources: ['Doctors']
	};
	public allowMultipleDoctors: boolean = true;
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
	timeslotsForm: FormGroup;
	constructor(
		private SpinnerService: NgxSpinnerService,
		public router: Router,
		public activeModal: NgbActiveModal,
		public toastr: ToastrManager,
		private jwtService: JwtService,
		private formBuilder: FormBuilder,
		private _route: ActivatedRoute,
		public appointmentsService: AppointmentsService,
		public adminService: AdminService,
		private elRef: ElementRef
	) {
		this.timeslotsForm = this.formBuilder.group({
			service_cat_id: [''],
			client_id: [''],
			employee_id: [''],
			start_date: [''],
			duration: ['']
		});
	}

	ngOnInit() {
		let months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		];

		let data = new Date();
		let year = data.getFullYear();
		let month = data.getMonth() + 1;
		let day = data.getDate();
		let current_date = day + '-' + month + '-' + year;
		this.showdates = 'Today (' + months[data.getMonth()] + ' ' + day + ', ' + year + ')';

		console.log(current_date);
		this.getCalendarData(current_date);
		this.getStaffData(current_date);
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
					let object = { text: '', designation: '', Color: '', id: '', Id: '' };
					object.text = item.f_name;
					object.Color = item.color;
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
				console.log('some error occurred');
				this.toastr.errorToastr('some error occurred');
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

	actionBegin(args: ActionEventArgs): void {}

	dateFilters(filter_types) {
		let change_date = this.elRef.nativeElement.getElementsByTagName('ejs-schedule')[0].ariaLabel;
		let dates = change_date.split(',');
		let years = dates.pop();
		let months_days = dates[0].split(' ');
		let days = months_days.pop();
		let month_name = months_days[months_days.length - 1];
		let months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		];
		let values = months.indexOf(month_name);
		var mm: number = values >= 10 ? values : values;
		let pastDates = new Date(years, mm, days);
		let dd: number = 0;
		if (filter_types == 'previous') {
			dd += pastDates.getDate() - 1;
			this.selectedDate = new Date(pastDates.getFullYear(), pastDates.getMonth(), dd);
		} else if (filter_types == 'next') {
			dd += pastDates.getDate() + 1;
			this.selectedDate = new Date(pastDates.getFullYear(), pastDates.getMonth(), dd);
		} else {
			this.selectedDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
		}

		this.showdates =
			'Today (' +
			months[this.selectedDate.getMonth()] +
			' ' +
			this.selectedDate.getDate() +
			', ' +
			this.selectedDate.getFullYear() +
			')';
		this.actionComplete(this.selectedDate);
	}

	actionComplete(args) {
		let change_date = this.elRef.nativeElement.getElementsByTagName('ejs-schedule')[0].ariaLabel;

		let dates = change_date.split(',');
		let years = dates.pop();
		let months_days = dates[0].split(' ');
		let days = months_days.pop();
		let month_name = months_days[months_days.length - 1];
		let months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		];
		let values = months.indexOf(month_name) + 1;
		let month = values >= 10 ? values : '0' + values;
		let current_date = days + '-' + month + '-' + years.trim();
		this.appointmentsService.getCalendarData(current_date).subscribe(
			data => {
				let currentEmployees = data['data'];

				let finalArrayData = [];
				let notAvailableData = [];
				let k = 1;
				for (let i in currentEmployees) {
					console.log(typeof i);
					let employees = currentEmployees[i];
					if (!employees.start_time) {
						employees.start_time = '00:00:00';
					}
					if (!employees.end_time) {
						employees.end_time = '00:00:00';
					}
					let [start_time_hours, start_time_minute, start_time_sec] = employees.start_time
						? employees.start_time.split(':')
						: ['', '', ''];
					let [end_time_hours, end_time_minute, end_time_sec] = employees.end_time
						? employees.end_time.split(':')
						: ['', '', ''];
					let [day, month, year] = current_date.split('-');
					if (currentEmployees[i].appointment) {
						let appointment = currentEmployees[i].appointment;
						let object = {
							Id: k,
							Subject: '',
							StartTime: new Date(
								parseInt(year),
								parseInt(month) - 1,
								parseInt(day),
								start_time_hours,
								start_time_minute
							),
							EndTime: new Date(
								parseInt(year),
								parseInt(month) - 1,
								parseInt(day),
								end_time_hours,
								end_time_minute
							),
							IsAllDay: false,
							IsBlock: false,
							DoctorId: employees.id
						};
						for (let j in appointment) {
							let client_name = appointment[i].client.f_name + ' ' + appointment[i].client.surname;
							let services = appointment[j].services;
							let services_name = [];
							for (let l in services) {
								let service = services[l];
								services_name.push(service.service_name);
							}
							object.Subject = client_name + '<br />' + services_name.join('<br/>') + '<br />';
							finalArrayData.push(object);
						}
						let notAvailable = currentEmployees[i].is_available;
						if (notAvailable) {
							for (let n in notAvailable) {
								let employees = notAvailable[n];
								if (employees.is_available == false) {
									let notAvailableObject = {
										Id: k,
										Subject: '',
										StartTime: new Date(),
										EndTime: new Date(),
										IsAllDay: false,
										IsBlock: true,
										DoctorId: currentEmployees[i].id,
										SecondaryColor: '#357cd2'
									};
									let [
										start_time_hours,
										start_time_minute,
										start_time_sec
									] = employees.istart_time.split(':');
									let [end_time_hours, end_time_minute, end_time_sec] = employees.iend_time.split(
										':'
									);
									let [day, month, year] = current_date.split('-');
									notAvailableObject.StartTime = new Date(
										parseInt(year),
										parseInt(month) - 1,
										parseInt(day),
										start_time_hours,
										start_time_minute
									);
									notAvailableObject.EndTime = new Date(
										parseInt(year),
										parseInt(month) - 1,
										parseInt(day),
										end_time_hours,
										end_time_minute
									);
									notAvailableObject.Subject = 'Not Available';
									notAvailableData.push(notAvailableObject);
									k++;
								}
							}
						} else {
							let notAvailableEmployee = currentEmployees[i];
							let length = notAvailableData.length;
							let notAvailableObject = {
								Id: length + 1,
								Subject: 'Not Available',
								StartTime: new Date(parseInt(year), parseInt(month) - 1, parseInt(day), 0, 0),
								EndTime: new Date(parseInt(year), parseInt(month) - 1, parseInt(day), 24, 0),
								IsAllDay: false,
								IsBlock: true,
								DoctorId: notAvailableEmployee.id
							};
							notAvailableData[length] = notAvailableObject;
						}
					}
				}

				let finalShowData = [...finalArrayData, ...notAvailableData];
				this.eventSettings = { dataSource: finalShowData };
			},
			error => {
				console.log('some error occurred');
				this.toastr.errorToastr('some error occurred');
			}
		);
	}

	public getCalendarData(start_date, employee_id = false): any {
		//console.log(start_date);
		let current_date = start_date;
		this.appointmentsService.getCalendarData(current_date).subscribe(
			data => {
				let currentEmployees = data['data'];
				let finalArrayData = [];
				let notAvailableData = [];
				let k = 1;
				for (let i in currentEmployees) {
					let employees = currentEmployees[i];
					if (!employees.start_time) {
						employees.start_time = '00:00:00';
					}
					if (!employees.end_time) {
						employees.end_time = '00:00:00';
					}
					let [start_time_hours, start_time_minute, start_time_sec] = employees.start_time.split(':');
					let [end_time_hours, end_time_minute, end_time_sec] = employees.end_time.split(':');
					let [day, month, year] = current_date.split('-');
					if (currentEmployees[i].appointment) {
						let appointment = currentEmployees[i].appointment;
						let object = {
							Id: k,
							Subject: '',
							StartTime: new Date(
								parseInt(year),
								parseInt(month) - 1,
								parseInt(day),
								start_time_hours,
								start_time_minute
							),
							EndTime: new Date(
								parseInt(year),
								parseInt(month) - 1,
								parseInt(day),
								end_time_hours,
								end_time_minute
							),
							IsAllDay: false,
							IsBlock: false,
							DoctorId: employees.id
						};

						for (let j in appointment) {
							let client_name = appointment[i].client.f_name + ' ' + appointment[i].client.surname;
							let services = appointment[j].services;
							let services_name = [];
							for (let l in services) {
								let service = services[l];
								services_name.push(service.service_name);
							}
							object.Subject = client_name + '<br />' + services_name.join('<br/>') + '<br />';
							finalArrayData.push(object);
						}

						let notAvailable = currentEmployees[i].is_available;
						if (notAvailable) {
							for (let n in notAvailable) {
								let employees = notAvailable[n];
								if (employees.is_available == false) {
									let notAvailableObject = {
										Id: k,
										Subject: '',
										StartTime: new Date(),
										EndTime: new Date(),
										IsAllDay: false,
										IsBlock: true,
										DoctorId: currentEmployees[i].id
									};
									let [
										start_time_hours,
										start_time_minute,
										start_time_sec
									] = employees.istart_time.split(':');
									let [end_time_hours, end_time_minute, end_time_sec] = employees.iend_time.split(
										':'
									);
									let [day, month, year] = current_date.split('-');
									notAvailableObject.StartTime = new Date(
										parseInt(year),
										parseInt(month) - 1,
										parseInt(day),
										start_time_hours,
										start_time_minute
									);
									notAvailableObject.EndTime = new Date(
										parseInt(year),
										parseInt(month) - 1,
										parseInt(day),
										end_time_hours,
										end_time_minute
									);
									notAvailableObject.Subject = 'Not Available';
									notAvailableData.push(notAvailableObject);
									k++;
								}
							}
						} else {
							let notAvailableEmployee = currentEmployees[i];
							let length = notAvailableData.length;
							let notAvailableObject = {
								Id: length + 1,
								Subject: 'Not Available',
								StartTime: new Date(parseInt(year), parseInt(month) - 1, parseInt(day), 0, 0),
								EndTime: new Date(parseInt(year), parseInt(month) - 1, parseInt(day), 24, 0),
								IsAllDay: false,
								IsBlock: true,
								DoctorId: notAvailableEmployee.id
							};
							notAvailableData[length] = notAvailableObject;
						}
					}
				}

				let finalShowData = [...finalArrayData, ...notAvailableData];
				this.eventSettings = { dataSource: finalShowData };
			},
			error => {
				console.log('some error occurred');
				this.toastr.errorToastr('some error occurred');
			}
		);
	}

	public changeStaff(e) {
		let value = e.target.value;
		let data = new Date();
		let year = data.getFullYear();
		let month = data.getMonth() + 1;
		let day = data.getDate();
		let current_date = day + '-' + month + '-' + year;
		if (value > 0) {
			this.appointmentsService.getCalendarData(current_date).subscribe(
				data => {
					let currentEmployees = data['data'];
					let finalArrayData = [];
					let notAvailableData = [];
					let k = 1;
					for (let i in currentEmployees) {
						if (value == currentEmployees[i].id) {
							let employees = currentEmployees[i];
							if (!employees.start_time) {
								employees.start_time = '00:00:00';
							}
							if (!employees.end_time) {
								employees.end_time = '00:00:00';
							}
							let [start_time_hours, start_time_minute, start_time_sec] = employees.start_time.split(':');
							let [end_time_hours, end_time_minute, end_time_sec] = employees.end_time.split(':');
							let [day, month, year] = current_date.split('-');
							if (currentEmployees[i].appointment) {
								let appointment = currentEmployees[i].appointment;
								let object = {
									Id: k,
									Subject: '',
									StartTime: new Date(
										parseInt(year),
										parseInt(month) - 1,
										parseInt(day),
										start_time_hours,
										start_time_minute
									),
									EndTime: new Date(
										parseInt(year),
										parseInt(month) - 1,
										parseInt(day),
										end_time_hours,
										end_time_minute
									),
									IsAllDay: false,
									IsBlock: false,
									DoctorId: employees.id
								};

								for (let j in appointment) {
									let client_name =
										appointment[i].client.f_name + ' ' + appointment[i].client.surname;
									let services = appointment[j].services;
									let services_name = [];
									for (let l in services) {
										let service = services[l];
										services_name.push(service.service_name);
									}
									object.Subject = client_name + '<br />' + services_name.join('<br/>') + '<br />';
									finalArrayData.push(object);
								}

								let notAvailable = currentEmployees[i].is_available;
								if (notAvailable) {
									for (let n in notAvailable) {
										let employees = notAvailable[n];
										if (employees.is_available == false) {
											let notAvailableObject = {
												Id: k,
												Subject: '',
												StartTime: new Date(),
												EndTime: new Date(),
												IsAllDay: false,
												IsBlock: true,
												DoctorId: currentEmployees[i].id
											};
											let [
												start_time_hours,
												start_time_minute,
												start_time_sec
											] = employees.istart_time.split(':');
											let [
												end_time_hours,
												end_time_minute,
												end_time_sec
											] = employees.iend_time.split(':');
											let [day, month, year] = current_date.split('-');
											notAvailableObject.StartTime = new Date(
												parseInt(year),
												parseInt(month) - 1,
												parseInt(day),
												start_time_hours,
												start_time_minute
											);
											notAvailableObject.EndTime = new Date(
												parseInt(year),
												parseInt(month) - 1,
												parseInt(day),
												end_time_hours,
												end_time_minute
											);
											notAvailableObject.Subject = 'Not Available';
											notAvailableData.push(notAvailableObject);
											k++;
										}
									}
								} else {
									let notAvailableEmployee = currentEmployees[i];
									let length = notAvailableData.length;
									let notAvailableObject = {
										Id: length + 1,
										Subject: 'Not Available',
										StartTime: new Date(parseInt(year), parseInt(month) - 1, parseInt(day), 0, 0),
										EndTime: new Date(parseInt(year), parseInt(month) - 1, parseInt(day), 24, 0),
										IsAllDay: false,
										IsBlock: true,
										DoctorId: notAvailableEmployee.id
									};
									notAvailableData[length] = notAvailableObject;
								}
							}
						}
					}

					let finalShowData = [...finalArrayData, ...notAvailableData];
					this.eventSettings = { dataSource: finalShowData };
				},
				error => {
					console.log('some error occurred');
					this.toastr.errorToastr('some error occurred');
				}
			);

			this.appointmentsService.getEmpDetailByMerchantId({}).subscribe(
				data => {
					let currentEmployees = data['data'];
					console.log(currentEmployees);
					this.employee_data = data['data'];
					let finalArrayData = [];
					currentEmployees.forEach((item, key) => {
						if (item.id == value) {
							console.log(item);
							let object = { text: '', designation: '', Color: '', id: '', Id: '' };
							object.text = item.f_name;
							object.Color = item.color;
							object.id = item.id;
							object.Id = item.id;
							object.designation = item.display_name;
							if (item.emp_levels) {
								object.designation = item.emp_levels.name;
							}
							finalArrayData.push(object);
						}
					});
					this.doctorDataSource = finalArrayData;
					console.log(this.doctorDataSource);
				},
				error => {
					console.log('some error occurred');
					this.toastr.errorToastr('some error occurred');
				}
			);
		} else {
			this.getCalendarData(current_date);
			this.appointmentsService.getEmpDetailByMerchantId({}).subscribe(
				data => {
					let currentEmployees = data['data'];
					console.log(currentEmployees);
					this.employee_data = data['data'];
					let finalArrayData = [];
					currentEmployees.forEach((item, key) => {
						console.log(item);
						let object = { text: '', designation: '', Color: '', id: '', Id: '' };
						object.text = item.f_name;
						object.Color = item.color;
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
					console.log('some error occurred');
					this.toastr.errorToastr('some error occurred');
				}
			);
		}
	}

	public getStaffData(start_date): any {
		console.log(start_date);
		let current_date = start_date;
		this.appointmentsService.getStaffData(current_date).subscribe(
			data => {
				console.log(data);
				this.allStaff = data['data'];
				console.log(this.allStaff);
			},
			error => {
				console.log('some error occurred');
				this.toastr.errorToastr('some error occurred');
			}
		);
	}

	closeModal() {
		this.activeModal.close();
	}
}

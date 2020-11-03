
import { startTimeArray, endTimeArray } from './data';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/admin/admin.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtService } from 'src/app/login/jwt.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmployeehoursService } from 'src/app/employeehours/employeehours.service';
import { Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as data from '../../assets/data.json';
@Component({
	selector: 'app-employeehours',
	templateUrl: './employeehours.component.html',
	styleUrls: ['./employeehours.component.css']
})
export class EmployeehoursComponent implements OnInit {
	opening_hours_id: any;
	closeResult: string;
	@Input() public emproster_id;
	@Input() public roster_id;
	empForm: FormGroup;
	public empRosters: any;
	openingForm: FormGroup;
	modalReference: NgbModalRef;
	submitted = false;
	isSundayDisabled = true;
	isMondayDisabled = true;
	isTuesdayDisabled = true;
	isWedDisabled = true;
	isThurDisabled = true;
	isFridDisabled = true;
	isSatDisabled = true;
	f_name: string;
	// public endTimeArray: Object[] = [];
	// public startTimeArray :any = data;
	public startTimeArray = [
		{ start: '00:00:00', value: 'Midnight' },
		{ start: '00:15:00', value: '12:15 AM' },
		{ start: '00:30:00', value: '12:30 AM' },
		{ start: '00:45:00', value: '12:45 AM' },
		{ start: '01:00:00', value: '1:00 AM' },
		{ start: '01:15:00', value: '1:15 AM' },
		{ start: '01:30:00', value: '1:30 AM' },
		{ start: '01:45:00', value: '1:45 AM' },
		{ start: '02:00:00', value: '2:00 AM' },
		{ start: '02:15:00', value: '2:15 AM' },
		{ start: '02:30:00', value: '2:30 AM' },
		{ start: '02:45:00', value: '2:45 AM' },
		{ start: '03:00:00', value: '3:00 AM' },
		{ start: '03:15:00', value: '3:15 AM' },
		{ start: '03:30:00', value: '3:30 AM' },
		{ start: '03:45:00', value: '3:45 AM' },
		{ start: '04:00:00', value: '4:00 AM' },
		{ start: '04:15:00', value: '4:15 AM' },
		{ start: '04:30:00', value: '4:30 AM' },
		{ start: '04:45:00', value: '4:45 AM' },
		{ start: '05:00:00', value: '5:00 AM' },
		{ start: '05:15:00', value: '5:15 AM' },
		{ start: '05:30:00', value: '5:30 AM' },
		{ start: '05:45:00', value: '5:45 AM' },
		{ start: '06:00:00', value: '6:00 AM' },
		{ start: '06:15:00', value: '6:15 AM' },
		{ start: '06:30:00', value: '6:30 AM' },
		{ start: '06:45:00', value: '6:45 AM' },
		{ start: '07:00:00', value: '7:00 AM' },
		{ start: '07:15:00', value: '7:15 AM' },
		{ start: '07:30:00', value: '7:30 AM' },
		{ start: '07:45:00', value: '7:45 AM' },
		{ start: '08:00:00', value: '8:00 AM' },
		{ start: '08:15:00', value: '8:15 AM' },
		{ start: '08:30:00', value: '8:30 AM' },
		{ start: '08:45:00', value: '8:45 AM' },
		{ start: '09:00:00', value: '9:00 AM' },
		{ start: '09:15:00', value: '9:15 AM' },
		{ start: '09:30:00', value: '9:30 AM' },
		{ start: '09:45:00', value: '9:45 AM' },
		{ start: '10:00:00', value: '10:00 AM' },
		{ start: '10:15:00', value: '10:15 AM' },
		{ start: '10:30:00', value: '10:30 AM' },
		{ start: '10:45:00', value: '10:45 AM' },
		{ start: '11:00:00', value: '11:00 AM' },
		{ start: '11:15:00', value: '11:15 AM' },
		{ start: '11:30:00', value: '11:30 AM' },
		{ start: '11:45:00', value: '11:45 AM' },
		{ start: '12:00:00', value: 'Noon' },
		{ start: '12:15:00', value: '12:15 PM' },
		{ start: '12:30:00', value: '12:30 PM' },
		{ start: '12:45:00', value: '12:45 PM' },
		{ start: '13:00:00', value: '1:00 PM' },
		{ start: '13:15:00', value: '1:15 PM' },
		{ start: '13:30:00', value: '1:30 PM' },
		{ start: '13:45:00', value: '1:45 PM' },
		{ start: '14:00:00', value: '2:00 PM' },
		{ start: '14:15:00', value: '2:15 PM' },
		{ start: '14:30:00', value: '2:30 PM' },
		{ start: '14:45:00', value: '2:45 PM' },
		{ start: '15:00:00', value: '3:00 PM' },
		{ start: '15:15:00', value: '3:15 PM' },
		{ start: '15:30:00', value: '3:30 PM' },
		{ start: '15:45:00', value: '3:45 PM' },
		{ start: '16:00:00', value: '4:00 PM' },
		{ start: '16:15:00', value: '4:15 PM' },
		{ start: '16:30:00', value: '4:30 PM' },
		{ start: '16:45:00', value: '4:45 PM' },
		{ start: '17:00:00', value: '5:00 PM' },
		{ start: '17:15:00', value: '5:15 PM' },
		{ start: '17:30:00', value: '5:30 PM' },
		{ start: '17:45:00', value: '5:45 PM' },
		{ start: '18:00:00', value: '6:00 PM' },
		{ start: '18:15:00', value: '6:15 PM' },
		{ start: '18:30:00', value: '6:30 PM' },
		{ start: '18:45:00', value: '6:45 PM' },
		{ start: '19:00:00', value: '7:00 PM' },
		{ start: '19:15:00', value: '7:15 PM' },
		{ start: '19:30:00', value: '7:30 PM' },
		{ start: '19:45:00', value: '7:45 PM' },
		{ start: '20:00:00', value: '8:00 PM' },
		{ start: '20:15:00', value: '8:15 PM' },
		{ start: '20:30:00', value: '8:30 PM' },
		{ start: '20:45:00', value: '8:45 PM' },
		{ start: '21:00:00', value: '9:00 PM' },
		{ start: '21:15:00', value: '9:15 PM' },
		{ start: '21:30:00', value: '9:30 PM' },
		{ start: '21:45:00', value: '9:45 PM' },
		{ start: '22:00:00', value: '10:00 PM' },
		{ start: '22:15:00', value: '10:15 PM' },
		{ start: '22:30:00', value: '10:30 PM' },
		{ start: '22:45:00', value: '10:45 PM' },
		{ start: '23:00:00', value: '11:00 PM' },
		{ start: '23:15:00', value: '11:15 PM' },
		{ start: '23:30:00', value: '11:30 PM' },
		{ start: '23:45:00', value: '11:45 PM' },
		{ start: '00:00:00', value: 'Midnight' }
	];
	public endTimeArray = [
		{ start: '00:00:00', value: 'Midnight' },
		{ start: '00:15:00', value: '12:15 AM' },
		{ start: '00:30:00', value: '12:30 AM' },
		{ start: '00:45:00', value: '12:45 AM' },
		{ start: '01:00:00', value: '1:00 AM' },
		{ start: '01:15:00', value: '1:15 AM' },
		{ start: '01:30:00', value: '1:30 AM' },
		{ start: '01:45:00', value: '1:45 AM' },
		{ start: '02:00:00', value: '2:00 AM' },
		{ start: '02:15:00', value: '2:15 AM' },
		{ start: '02:30:00', value: '2:30 AM' },
		{ start: '02:45:00', value: '2:45 AM' },
		{ start: '03:00:00', value: '3:00 AM' },
		{ start: '03:15:00', value: '3:15 AM' },
		{ start: '03:30:00', value: '3:30 AM' },
		{ start: '03:45:00', value: '3:45 AM' },
		{ start: '04:00:00', value: '4:00 AM' },
		{ start: '04:15:00', value: '4:15 AM' },
		{ start: '04:30:00', value: '4:30 AM' },
		{ start: '04:45:00', value: '4:45 AM' },
		{ start: '05:00:00', value: '5:00 AM' },
		{ start: '05:15:00', value: '5:15 AM' },
		{ start: '05:30:00', value: '5:30 AM' },
		{ start: '05:45:00', value: '5:45 AM' },
		{ start: '06:00:00', value: '6:00 AM' },
		{ start: '06:15:00', value: '6:15 AM' },
		{ start: '06:30:00', value: '6:30 AM' },
		{ start: '06:45:00', value: '6:45 AM' },
		{ start: '07:00:00', value: '7:00 AM' },
		{ start: '07:15:00', value: '7:15 AM' },
		{ start: '07:30:00', value: '7:30 AM' },
		{ start: '07:45:00', value: '7:45 AM' },
		{ start: '08:00:00', value: '8:00 AM' },
		{ start: '08:15:00', value: '8:15 AM' },
		{ start: '08:30:00', value: '8:30 AM' },
		{ start: '08:45:00', value: '8:45 AM' },
		{ start: '09:00:00', value: '9:00 AM' },
		{ start: '09:15:00', value: '9:15 AM' },
		{ start: '09:30:00', value: '9:30 AM' },
		{ start: '09:45:00', value: '9:45 AM' },
		{ start: '10:00:00', value: '10:00 AM' },
		{ start: '10:15:00', value: '10:15 AM' },
		{ start: '10:30:00', value: '10:30 AM' },
		{ start: '10:45:00', value: '10:45 AM' },
		{ start: '11:00:00', value: '11:00 AM' },
		{ start: '11:15:00', value: '11:15 AM' },
		{ start: '11:30:00', value: '11:30 AM' },
		{ start: '11:45:00', value: '11:45 AM' },
		{ start: '12:00:00', value: 'Noon' },
		{ start: '12:15:00', value: '12:15 PM' },
		{ start: '12:30:00', value: '12:30 PM' },
		{ start: '12:45:00', value: '12:45 PM' },
		{ start: '13:00:00', value: '1:00 PM' },
		{ start: '13:15:00', value: '1:15 PM' },
		{ start: '13:30:00', value: '1:30 PM' },
		{ start: '13:45:00', value: '1:45 PM' },
		{ start: '14:00:00', value: '2:00 PM' },
		{ start: '14:15:00', value: '2:15 PM' },
		{ start: '14:30:00', value: '2:30 PM' },
		{ start: '14:45:00', value: '2:45 PM' },
		{ start: '15:00:00', value: '3:00 PM' },
		{ start: '15:15:00', value: '3:15 PM' },
		{ start: '15:30:00', value: '3:30 PM' },
		{ start: '15:45:00', value: '3:45 PM' },
		{ start: '16:00:00', value: '4:00 PM' },
		{ start: '16:15:00', value: '4:15 PM' },
		{ start: '16:30:00', value: '4:30 PM' },
		{ start: '16:45:00', value: '4:45 PM' },
		{ start: '17:00:00', value: '5:00 PM' },
		{ start: '17:15:00', value: '5:15 PM' },
		{ start: '17:30:00', value: '5:30 PM' },
		{ start: '17:45:00', value: '5:45 PM' },
		{ start: '18:00:00', value: '6:00 PM' },
		{ start: '18:15:00', value: '6:15 PM' },
		{ start: '18:30:00', value: '6:30 PM' },
		{ start: '18:45:00', value: '6:45 PM' },
		{ start: '19:00:00', value: '7:00 PM' },
		{ start: '19:15:00', value: '7:15 PM' },
		{ start: '19:30:00', value: '7:30 PM' },
		{ start: '19:45:00', value: '7:45 PM' },
		{ start: '20:00:00', value: '8:00 PM' },
		{ start: '20:15:00', value: '8:15 PM' },
		{ start: '20:30:00', value: '8:30 PM' },
		{ start: '20:45:00', value: '8:45 PM' },
		{ start: '21:00:00', value: '9:00 PM' },
		{ start: '21:15:00', value: '9:15 PM' },
		{ start: '21:30:00', value: '9:30 PM' },
		{ start: '21:45:00', value: '9:45 PM' },
		{ start: '22:00:00', value: '10:00 PM' },
		{ start: '22:15:00', value: '10:15 PM' },
		{ start: '22:30:00', value: '10:30 PM' },
		{ start: '22:45:00', value: '10:45 PM' },
		{ start: '23:00:00', value: '11:00 PM' },
		{ start: '23:15:00', value: '11:15 PM' },
		{ start: '23:30:00', value: '11:30 PM' },
		{ start: '23:45:00', value: '11:45 PM' },
		{ start: '00:00:00', value: 'Midnight' }
	];
	constructor(
		public activeModal: NgbActiveModal,
		private SpinnerService: NgxSpinnerService,
		private modalService: NgbModal,
		public router: Router,
		private formBuilder: FormBuilder,
		public toastr: ToastrManager,
		private jwtService: JwtService,
		private _route: ActivatedRoute,
		public adminService: AdminService,
		private route: ActivatedRoute,
		private employeehoursservice: EmployeehoursService
	) {}

	ngOnInit() {
		let id = this.emproster_id;
		let rosters_id = this.roster_id;
		this.employeehoursservice.getEmpRosterHoursByEmpId(id).subscribe(
			data => {
				console.log(data);
				let emproasterdata = Array.isArray(data['data']) ? data['data'][0] : data['data'];
				if (emproasterdata.sun_start_time) {
					this.openingForm.get('sun_start_time').enable();
					this.openingForm.get('sun_end_time').enable();
				}
				if (emproasterdata.mom_start_time) {
					this.openingForm.get('mom_start_time').enable();
					this.openingForm.get('mom_end_time').enable();
				}
				if (emproasterdata.tue_start_time) {
					this.openingForm.get('tue_start_time').enable();
					this.openingForm.get('tue_end_time').enable();
				}
				if (emproasterdata.wed_start_time) {
					this.openingForm.get('wed_start_time').enable();
					this.openingForm.get('wed_end_time').enable();
				}
				if (emproasterdata.thur_start_time) {
					this.openingForm.get('thur_start_time').enable();
					this.openingForm.get('thur_end_time').enable();
				}
				if (emproasterdata.fri_start_time) {
					this.openingForm.get('fri_start_time').enable();
					this.openingForm.get('fri_end_time').enable();
				}
				if (emproasterdata.sat_start_time) {
					this.openingForm.get('sat_start_time').enable();
					this.openingForm.get('sat_end_time').enable();
				}
				if (emproasterdata.emp_id) {
					this.opening_hours_id = emproasterdata.id;
				}
				this.f_name = emproasterdata.employees.f_name;
				this.openingForm = this.formBuilder.group({
					f_name: [emproasterdata.employees.f_name],
					sun_start_time: [emproasterdata.sun_start_time],
					sun_end_time: emproasterdata.sun_end_time,
					mom_start_time: emproasterdata.mom_start_time,
					mom_end_time: emproasterdata.mom_end_time,
					tue_start_time: emproasterdata.tue_start_time,
					tue_end_time: emproasterdata.tue_end_time,
					wed_start_time: emproasterdata.wed_start_time,
					wed_end_time: emproasterdata.wed_end_time,
					thur_start_time: emproasterdata.thur_start_time,
					thur_end_time: emproasterdata.thur_end_time,
					fri_start_time: emproasterdata.fri_start_time,
					fri_end_time: emproasterdata.fri_end_time,
					sat_start_time: emproasterdata.sat_start_time,
					sat_end_time: emproasterdata.sat_end_time,
					sunday_disable_option: [emproasterdata.sun_start_time ? 1 : 0],
					monday_disable_option: [emproasterdata.mom_start_time ? 1 : 0],
					tuesday_disable_option: [emproasterdata.tue_start_time ? 1 : 0],
					wednesday_disable_option: [emproasterdata.wed_start_time ? 1 : 0],
					thrusday_disable_option: [emproasterdata.thur_start_time ? 1 : 0],
					friday_disable_option: [emproasterdata.fri_start_time ? 1 : 0],
					saturday_disable_option: [emproasterdata.fri_end_time ? 1 : 0],
					empRosterhours_id: [emproasterdata.id]
				});
				console.log(emproasterdata);
			},
			error => {
				console.log('some error occurred');
				this.toastr.errorToastr('some error occurred');
			}
		);
		this.openingForm = this.formBuilder.group({
			f_name: [''],
			mom_start_time: [''],
			mom_end_time: [''],
			tue_start_time: [''],
			tue_end_time: [''],
			wed_start_time: [''],
			wed_end_time: [''],
			thur_start_time: [''],
			thur_end_time: [''],
			fri_start_time: [''],
			fri_end_time: [''],
			sat_start_time: [''],
			sat_end_time: [''],
			sun_start_time: [''],
			sun_end_time: [''],
			sunday_disable_option: [''],
			monday_disable_option: [''],
			tuesday_disable_option: [''],
			wednesday_disable_option: [''],
			thrusday_disable_option: [''],
			friday_disable_option: [''],
			saturday_disable_option: [''],
			empRosterhours_id: [''],
			emp_id: []
		});
	}

	onChangeDate(event: any, disable_type_from, disable_type_to) {
		if (event.target.checked) {
			this.openingForm.get(disable_type_from).enable();
			this.openingForm.get(disable_type_to).enable();
		} else {
			this.openingForm.get(disable_type_from).disable();
			this.openingForm.get(disable_type_to).disable();
		}
	}

	addEmpRoster() {
		this.submitted = true;
		let id = this.emproster_id;
		if (!this.openingForm.invalid) {
			let openingHours_data = this.openingForm.value;
			console.log(openingHours_data);
			let data = {
				mom_start_time: openingHours_data.monday_disable_option == 1 ? openingHours_data.mom_start_time : '',
				mom_end_time: openingHours_data.monday_disable_option == 1 ? openingHours_data.mom_end_time : '',
				tue_start_time: openingHours_data.tuesday_disable_option == 1 ? openingHours_data.tue_start_time : '',
				tue_end_time: openingHours_data.tuesday_disable_option == 1 ? openingHours_data.tue_end_time : '',
				wed_start_time: openingHours_data.wednesday_disable_option == 1 ? openingHours_data.wed_start_time : '',
				wed_end_time: openingHours_data.wednesday_disable_option == 1 ? openingHours_data.wed_end_time : '',
				thur_start_time:
					openingHours_data.thrusday_disable_option == 1 ? openingHours_data.thur_start_time : '',
				thur_end_time: openingHours_data.thrusday_disable_option == 1 ? openingHours_data.thur_end_time : '',
				fri_start_time: openingHours_data.friday_disable_option == 1 ? openingHours_data.fri_start_time : '',
				fri_end_time: openingHours_data.friday_disable_option == 1 ? openingHours_data.fri_end_time : '',
				sat_start_time: openingHours_data.saturday_disable_option == 1 ? openingHours_data.sat_start_time : '',
				sat_end_time: openingHours_data.saturday_disable_option == 1 ? openingHours_data.sat_end_time : '',
				sun_start_time: openingHours_data.sunday_disable_option == 1 ? openingHours_data.sun_start_time : '',
				sun_end_time: openingHours_data.sunday_disable_option == 1 ? openingHours_data.sun_end_time : '',
				emp_id: id
			};
			if (this.opening_hours_id) {
				data['empRosterhours_id'] = this.opening_hours_id;
			}
			if (this.roster_id) {
				data['empRosterhours_id'] = this.roster_id;
			}
			console.log(data);
			this.employeehoursservice.addEmpRosterHours(data).subscribe(apiResponse => {
				if (apiResponse.code === 200) {
					if (this.opening_hours_id) {
						this.toastr.successToastr('Employee Roaster Hours Updated Successfully');
					} else {
						this.toastr.successToastr('Employee Roaster Hours Added Successfully');
					}
					this.router.navigate(['/admin']);
					this.activeModal.close();
				} else {
					console.log('Hello');
					this.toastr.errorToastr(apiResponse.message);
				}
			});
		}
	}

	public getEmpRosterHoursByMechantId(): any {
		this.employeehoursservice.getEmpRosterHoursByMechantId().subscribe(
			data => {
				console.log(data);
				this.empRosters = data['data'];
				console.log(this.empRosters);
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('some error occured');
			}
		);
	}

	closeModal() {
		this.activeModal.close();
	}
}

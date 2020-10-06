import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtService } from 'src/app/login/jwt.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { ServicelevelService } from 'src/app/servicelevel/servicelevel.service';
import { AddemployeesService } from 'src/app/addemployees/addemployees.service';

@Component({
	selector: 'app-editservicelevel',
	templateUrl: './editservicelevel.component.html',
	styleUrls: ['./editservicelevel.component.css']
})
export class EditservicelevelComponent implements OnInit {
	levelid: any;
	servicelevelForm: FormGroup;
	closeResult: string;
	@Input() public user_level_id;
	@Input() public servicelevelId;
	submitted = false;
	public empLevelNames: any;
	constructor(
		public activeModal: NgbActiveModal,
		private SpinnerService: NgxSpinnerService,
		private modalService: NgbModal,
		public router: Router,
		private formBuilder: FormBuilder,
		public toastr: ToastrManager,
		private jwtService: JwtService,
		private _route: ActivatedRoute,
		public addemployeesService: AddemployeesService,
		public servicelevelService: ServicelevelService
	) {
		this.servicelevelForm = this.formBuilder.group({
			service_id: new FormControl(),
			emp_level_id: new FormControl({ value:"", disabled: true },Validators.required),
			serviceLevel_id: new FormControl('', Validators.required),
			price: ['',Validators.required],
			duration: new FormControl(''),
			commission: new FormControl(''),
			duration_minutes: new FormControl('')
		});
	}

	ngOnInit() {
		this.getEmpLevelName();
		let levelid = this.user_level_id;
		let id = this.servicelevelId;
		console.log(this.user_level_id);
		this.servicelevelService.getServiceEmpLevel(id).subscribe(data => {
				let serviceEmplevel_details = data['data'];
				let duration = serviceEmplevel_details.duration ? serviceEmplevel_details.duration.split(':') : [];
				console.log(serviceEmplevel_details);
				this.servicelevelForm = this.formBuilder.group({
					price: serviceEmplevel_details.price,
					duration: duration[0],
					commission: serviceEmplevel_details.commission,
					duration_minutes: duration[1],
					service_id: [levelid],
					serviceLevel_id: [id],
					emp_level_id: serviceEmplevel_details.emp_level_id
				});
			}, error => {
				console.log('some error occured');
			});
	}

	public updateServicelevel(): any {
		this.submitted = true;
		let servicelevel_data = this.servicelevelForm.value;
		console.log(servicelevel_data);
		let duration = servicelevel_data.duration
			? servicelevel_data.duration + ':' + servicelevel_data.duration_minutes + ':00'
			: '00:00:00';
		let data = {
			//service_id: servicelevel_data.service_id,
			serviceLevel_id: servicelevel_data.serviceLevel_id,
			price: servicelevel_data.price || '',
			commission: servicelevel_data.commission || '',
			duration: duration,
			duration_minutes: servicelevel_data.duration_minutes || '',
			emp_level_id: servicelevel_data.emp_level_id
		};
		console.log(data);
		this.servicelevelService.editServicelevel(data).subscribe(
			data => {
				console.log(data);
				this.toastr.successToastr(' Service Level Updated Successfully');
				this.activeModal.close();
				this.router.navigate(['/admin']);
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('Some error occured', 'Oops!');
			}
		);
	}

	closeModal(sendData) {
		this.activeModal.close(sendData);
	}

	public getEmpLevelName(): any {
		this.addemployeesService.getEmplevelByMechantId({}).subscribe(
			data => {
				console.log(data);
				this.empLevelNames = data['data'];
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('some error occured');
			}
		);
	}
}

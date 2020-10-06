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
	selector: 'app-servicelevel',
	templateUrl: './servicelevel.component.html',
	styleUrls: ['./servicelevel.component.css']
})
export class ServicelevelComponent implements OnInit {
	levelid: any;
	servicelevelForm: FormGroup;
	closeResult: string;
	@Input() public user_level_id;
	submitted = false;
	selectedValue = '00';
	selectedValueminute = '00';
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
		public servicelevelService: ServicelevelService,
		public addemployeesService: AddemployeesService
	) {
		this.servicelevelForm = this.formBuilder.group({
			service_id: new FormControl(),
			emp_level_id: new FormControl('', Validators.required),
			price: new FormControl('',Validators.required),
			duration: new FormControl(''),
			commission: new FormControl(''),
			duration_minutes: new FormControl('')
		});
	}

	ngOnInit() {
		this.getEmpLevelName();
		this.levelid = this.user_level_id;
		console.log(this.levelid);
	}
	get f() {
		return this.servicelevelForm.controls;
	}

	onSubmit() {
		this.submitted = true;
		if (!this.servicelevelForm.invalid) {
			let servicelevel_data = this.servicelevelForm.value;
			console.log(servicelevel_data);
			let duration = servicelevel_data.duration
				? servicelevel_data.duration + ':' + servicelevel_data.duration_minutes + ':00'
				: '00:00:00'; 
			let data = {
				emp_level_id: servicelevel_data.emp_level_id,
				service_id: this.levelid,
				price: servicelevel_data.price || '',
				commission: servicelevel_data.commission || '',
				duration: duration
			};
			console.log(data);
			this.servicelevelService.addServiceEmpLevel(data).subscribe(apiResponse => {
				if (apiResponse.code === 200) {
					this.toastr.successToastr('Service Level Added Successfully');
          this.closeModal();
						this.router.navigate(['/admin']);
				} else {
					console.log('Hello');
					this.toastr.errorToastr(apiResponse.message);
				}
			});
		}
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

	closeModal() {
		this.activeModal.close();
	}
}

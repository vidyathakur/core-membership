import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtService } from 'src/app/login/jwt.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { PublicholidayService } from 'src/app/publicholiday/publicholiday.service';

@Component({
	selector: 'app-publicholiday',
	templateUrl: './publicholiday.component.html',
	styleUrls: ['./publicholiday.component.css']
})
export class PublicholidayComponent implements OnInit {
	publicholidayForm: FormGroup;
	closeResult: string;
	@Input() fromParent;
	submitted = false;
	constructor(
		public activeModal: NgbActiveModal,
		private SpinnerService: NgxSpinnerService,
		private modalService: NgbModal,
		public router: Router,
		private formBuilder: FormBuilder,
		public toastr: ToastrManager,
		private jwtService: JwtService,
		private _route: ActivatedRoute,
		public publicholidayService: PublicholidayService
	) {
		this.publicholidayForm = this.formBuilder.group({
			holiday_name: new FormControl(''),
			holiday_date: new FormControl('')
		});
	}

	ngOnInit() {}

	get f() {
		return this.publicholidayForm.controls;
	}
	onReset() {
		this.submitted = false;
		this.publicholidayForm.reset();
	}


	onSubmit() {
		this.submitted = true;
		if (!this.publicholidayForm.invalid) {
			let holiday_data = this.publicholidayForm.value;
			let holiday_date = holiday_data.holiday_date
				? holiday_data.holiday_date.year + '/' + holiday_data.holiday_date.month + '/' + holiday_data.holiday_date.day
				: '';
			let data = {
			holiday_name: holiday_data.holiday_name || '',
			holiday_date: holiday_date || '',
			};
			console.log(data);
			this.publicholidayService.addHoliday(data).subscribe(apiResponse => {
					if (apiResponse.code === 200) {
						this.toastr.successToastr('Holiday Added Successfully');
						this.activeModal.close(data);
						this.publicholidayForm.reset();
						this.router.navigate(['/admin']);
					} else {
						console.log('Hello');
						this.toastr.errorToastr(apiResponse.message);
					}
				}
					);
		}
	}

	closeModal() {
		this.activeModal.close();
	}
}

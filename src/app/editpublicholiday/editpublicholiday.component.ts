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
	selector: 'app-editpublicholiday',
	templateUrl: './editpublicholiday.component.html',
	styleUrls: ['./editpublicholiday.component.css']
})
export class EditpublicholidayComponent implements OnInit {
	publicholidayForm: FormGroup;
	closeResult: string;
	@Input() public holidayid;
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
			holiday_id: new FormControl(''),
			holiday_name: new FormControl(''),
			holiday_date: new FormControl('')
		});
	}

	ngOnInit() {
		console.log(this.holidayid);
		let id = this.holidayid;
		this.publicholidayService.getHolidayDateById(id).subscribe(
			data => {
				let holiday_details = data.data[0];
				console.log(holiday_details);
				let holiday_data = holiday_details.holiday_date
					? holiday_details.holiday_date.split('-')
					: ['0', '0', '0'];
				this.publicholidayForm = this.formBuilder.group({
					holiday_name: holiday_details.holiday_name,
					holiday_date: {
						year: Number(holiday_data[0]),
						month: Number(holiday_data[1]),
						day: Number(holiday_data[2])
					},
					holiday_id: [id]
				});
			},
			error => {
				console.log('some error occured');
			}
		);
	}

	public updateHoliday(): any {
		this.submitted = true;
		let holiday_data = this.publicholidayForm.value;
		console.log(holiday_data);
		let holiday_date = holiday_data.holiday_date
			? holiday_data.holiday_date.year +
				'/' +
				holiday_data.holiday_date.month +
				'/' +
				holiday_data.holiday_date.day
			: '';
		let data = {
			holiday_id: holiday_data.holiday_id,
			holiday_name: holiday_data.holiday_name || '',
			holiday_date: holiday_date || ''
		};
		console.log(data);
		this.publicholidayService.editHoliday(data).subscribe(
			data => {
				console.log(data);
				this.toastr.successToastr(' Holiday Updated Successfully');
				this.router.navigate(['/admin']);
				this.closeModal();
				this.ngOnInit();
			},
			error => {
				console.log('some error occurred');
				this.toastr.errorToastr('Some error occurred', 'Oops!');
			}
		);
	}

	closeModal() {
		this.activeModal.close();
	}
}

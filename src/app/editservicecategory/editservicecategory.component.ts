import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtService } from 'src/app/login/jwt.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditservicecategoryService } from 'src/app/editservicecategory/editservicecategory.service';
import { Input } from '@angular/core';

@Component({
	selector: 'app-editservicecategory',
	templateUrl: './editservicecategory.component.html',
	styleUrls: ['./editservicecategory.component.css']
})
export class EditservicecategoryComponent implements OnInit {
	servicecategoryForm: FormGroup;
	submitted = false;
	@Input() fromParent;

	constructor(
		public activeModal: NgbActiveModal,
		private SpinnerService: NgxSpinnerService,
		private modalService: NgbModal,
		public router: Router,
		private formBuilder: FormBuilder,
		public toastr: ToastrManager,
		private jwtService: JwtService,
		private _route: ActivatedRoute,
		public editservicecategoryService: EditservicecategoryService
	) {
		this.servicecategoryForm = this.formBuilder.group({
			serviceCat_id: new FormControl(''),
			name: new FormControl('')
		});
	}

	ngOnInit() {
		console.log(this.fromParent);
		let id = this.fromParent.id;
		this.editservicecategoryService.getServiceCat(id).subscribe(
			data => {
				let serviceCat_details = data['data'];
				console.log(serviceCat_details);
				this.servicecategoryForm = this.formBuilder.group({
					name: [serviceCat_details.name],
					serviceCat_id: [id]
				});
			},
			error => {
				console.log('some error occured');
			}
		);
	}

	public updateServicecat(): any {
		this.submitted = true;
		let serviceCat_data = this.servicecategoryForm.value;
		console.log(serviceCat_data);
		let data = {
			serviceCat_id: serviceCat_data.serviceCat_id,
			name: serviceCat_data.name || '',
		};
		console.log(data);
		this.editservicecategoryService.editServiceCat(data).subscribe(data => {
				console.log(data);
				this.toastr.successToastr(' Service Category Updated Successfully');
				this.router.navigate(['/admin']);
				this.activeModal.close();
				this.ngOnInit();
			}, error => {
				console.log('some error occured');
				this.toastr.errorToastr('Some error occured', 'Oops!');
			});
	}

	closeModal(sendData) {
		this.activeModal.close(sendData);
	}
}

import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtService } from 'src/app/login/jwt.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { ClientcategoriesService } from 'src/app/clientcategories/clientcategories.service';

@Component({
	selector: 'app-clientcategories',
	templateUrl: './clientcategories.component.html',
	styleUrls: ['./clientcategories.component.css']
})
export class ClientcategoriesComponent implements OnInit {
	clientcatForm: FormGroup;
	closeResult: string;
	@Input() fromParent;
	submitted = false;
	public name: any;
	constructor(
		public activeModal: NgbActiveModal,
		private SpinnerService: NgxSpinnerService,
		private modalService: NgbModal,
		public router: Router,
		private formBuilder: FormBuilder,
		public toastr: ToastrManager,
		private jwtService: JwtService,
		private _route: ActivatedRoute,
		public clientcategoriesService: ClientcategoriesService
	) {
		this.clientcatForm = this.formBuilder.group({
			name: new FormControl('', Validators.required)
		});
	}

	ngOnInit(): void {}
	OnChangeofOptions() {
		console.log('changing');
	}
	get f() {
		return this.clientcatForm.controls;
	}
	onReset() {
		this.submitted = false;
		this.clientcatForm.reset();
	}
	onSubmit() {
		this.submitted = true;
		let response_data = this.clientcatForm.value;
		let data = { name: response_data.name || '' };

		console.log(data);

		this.clientcategoriesService.addClientCat(data).subscribe(apiResponse => {
			console.log(apiResponse);

			if (apiResponse.code === 200) {
				this.toastr.successToastr('Client Category Added Successfully');
        this.activeModal.close(data);
				this.clientcatForm.reset();
        this.router.navigate(['/admin']);
			} else {
				this.toastr.errorToastr(apiResponse.message);
			}
		});
	}

	closeModal(sendData) {
		this.activeModal.close(sendData);
	}
	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}
}

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
	selector: 'app-editclientcategories',
	templateUrl: './editclientcategories.component.html',
	styleUrls: ['./editclientcategories.component.css']
})
export class EditclientcategoriesComponent implements OnInit {
	clientcatForm: FormGroup;
	closeResult: string;
	@Input() public clientcatid;
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
			client_cat_id: new FormControl('', Validators.required),
			clientCat_id: new FormControl('', Validators.required),
			name: new FormControl('', Validators.required)
		});
	}

	ngOnInit() {
		console.log(this.clientcatid);
		let id = this.clientcatid;
		let paramsData = {
			client_cat_id: id
		};
		console.log(paramsData);
		this.clientcategoriesService.getClientCatDetails(paramsData).subscribe(
			data => {
				let clientCat_details = data['data'];
				console.log(clientCat_details);
				this.clientcatForm = this.formBuilder.group({
					name: [clientCat_details.name],
					clientCat_id: [id],
					client_cat_id: clientCat_details.client_cat_id
				});
			},
			error => {
				console.log('some error occured');
			}
		);
	}

	closeModal() {
		this.activeModal.close();
	}

	public updateClientcat(): any {
		this.submitted = true;
		let clientCat_data = this.clientcatForm.value;
		console.log(clientCat_data);
		let data = {
			clientCat_id: clientCat_data.clientCat_id,
			client_cat_id: clientCat_data.client_cat_id,
			name: clientCat_data.name || ''
		};
		console.log(data);
		this.clientcategoriesService.editClientCat(data).subscribe(
			data => {
				console.log(data);
				this.toastr.successToastr(' Clientcategory Updated Successfully');
				this.router.navigate(['/admin']);
				this.activeModal.close();
				this.ngOnInit();
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('Some error occured', 'Oops!');
			}
		);
	}
}

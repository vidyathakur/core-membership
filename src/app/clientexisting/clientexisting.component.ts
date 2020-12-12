import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtService } from 'src/app/login/jwt.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientexistingService } from 'src/app/clientexisting/clientexisting.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MembershipService } from 'src/app/membership/membership.service';

@Component({
	selector: 'app-clientexisting',
	templateUrl: './clientexisting.component.html',
	styleUrls: ['./clientexisting.component.css']
})
export class ClientexistingComponent implements OnInit {
	searchForm: FormGroup;
	closeResult: string;
	submitted = false;
	public empLevelNames: any;
	public serviceItem: any;
	constructor(
		public activeModal: NgbActiveModal,
		private SpinnerService: NgxSpinnerService,
		private modalService: NgbModal,
		public router: Router,
		private formBuilder: FormBuilder,
		public toastr: ToastrManager,
		private jwtService: JwtService,
		private _route: ActivatedRoute,
		public clientexistingService: ClientexistingService
	) {
		this.searchForm = this.formBuilder.group({
			search: ['', Validators.required]
		});
	}

	ngOnInit() {}
	get f() {
		return this.searchForm.controls;
	}
	onSubmit() {
		this.submitted = true;
		this.SpinnerService.show();
		if (!this.searchForm.invalid) {
			let searchData = this.searchForm.value;
			console.log(searchData);
			let data = {
				search: searchData.search || ''
			};
			console.log(data);
			this.clientexistingService.isClientExists(data).subscribe(
				apiResponse => {
					if (apiResponse.code === 200) {
            this.router.navigate(['/membership']);
						setTimeout(() => {
							this.SpinnerService.hide();
						}, 2000);
            this.closeModal();
					} else {
						this.toastr.errorToastr('Client Not Available');
					}
				},
				er => {
					console.log('some error occurred');
					this.toastr.errorToastr('Client Not Available');
          this.router.navigate(['/clientformembership']);
          this.closeModal();
				}
			);
		}
	}

	closeModal() {
		this.activeModal.close();
	}
}

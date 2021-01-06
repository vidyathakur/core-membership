import { AutoCompleteComponent, FilterType, ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtService } from 'src/app/login/jwt.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { PosClientService } from 'src/app/pos-client/pos-client.service';
import { isEmbeddedView } from '@angular/core/src/view/util';
import { PosServicesComponent } from 'src/app/pos-services/pos-services.component';
import { PosProductComponent } from 'src/app/pos-product/pos-product.component';

@Component({
	selector: 'app-pos-billwalk',
	templateUrl: './pos-billwalk.component.html',
	styleUrls: ['./pos-billwalk.component.css'],
	providers: [AutoCompleteComponent]
})
export class PosBillwalkComponent implements OnInit {
	constructor(
		public activeModal: NgbActiveModal,
		private SpinnerService: NgxSpinnerService,
		private modalService: NgbModal,
		public router: Router,
		private formBuilder: FormBuilder,
		public toastr: ToastrManager,
		private jwtService: JwtService,
		private _route: ActivatedRoute,
		public autoCompleteObj: AutoCompleteComponent,
		public posclientService: PosClientService
	) {}

	ngOnInit() {}

	openPosclientModal() {
		const modalRef = this.modalService.open(PosServicesComponent, {
			windowClass: 'myCustomModalClass',
			size: 'lg',
			centered: true,
			backdrop: 'static'
		});
		modalRef.result.then(
			result => {
				console.log(result);
			},
			reason => {}
		);
	}

	openPosProductModal() {
		const modalRef = this.modalService.open(PosProductComponent, {
			windowClass: 'myCustomModalClass',
			size: 'lg',
			centered: true,
			backdrop: 'static'
		});
		modalRef.result.then(
			result => {
				console.log(result);
			},
			reason => {}
		);
	}

	closeModal() {
		this.activeModal.close();
	}
}

import { Component, OnInit } from '@angular/core';
import { PosClientComponent } from 'src/app/pos-client/pos-client.component';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtService } from 'src/app/login/jwt.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
	selector: 'app-pos',
	templateUrl: './pos.component.html',
	styleUrls: ['./pos.component.css']
})
export class PosComponent implements OnInit {
	constructor(
		public activeModal: NgbActiveModal,
		private SpinnerService: NgxSpinnerService,
		private modalService: NgbModal,
		public router: Router,
		private formBuilder: FormBuilder,
		public toastr: ToastrManager,
		private jwtService: JwtService,
		private _route: ActivatedRoute
	) {}

	ngOnInit() {}

	openPosclientModal() {
		const modalRef = this.modalService.open(PosClientComponent, {
			windowClass: 'myCustomModalClass',
      size: 'lg', backdrop: 'static'
		});
		modalRef.result.then(
			result => {
				console.log(result);
			},
			reason => {}
		);
	}
}

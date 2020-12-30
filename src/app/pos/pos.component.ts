import { Component, OnInit } from '@angular/core';
import { PosClientComponent } from 'src/app/pos-client/pos-client.component';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtService } from 'src/app/login/jwt.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { PosService } from 'src/app/pos/pos.service';
import { PosClientService } from 'src/app/pos-client/pos-client.service';
import { ConfirmDialogService } from 'src/app/confirm-dialog/confirm-dialog.service';
import { PosBillwalkComponent } from 'src/app/pos-billwalk/pos-billwalk.component';

@Component({
	selector: 'app-pos',
	templateUrl: './pos.component.html',
	styleUrls: ['./pos.component.css']
})
export class PosComponent implements OnInit {
	posData: any;
	responseData: any;
	total_price: any;
	constructor(
		public activeModal: NgbActiveModal,
		private SpinnerService: NgxSpinnerService,
		private modalService: NgbModal,
		public router: Router,
		private formBuilder: FormBuilder,
		public toastr: ToastrManager,
		private jwtService: JwtService,
		private _route: ActivatedRoute,
		public posService: PosService,
		private confirmDialogService: ConfirmDialogService,
		public posclientService: PosClientService
	) {}

	ngOnInit() {
		this.getTransactionByMerchantId();
	}

	openPosclientModal() {
		const modalRef = this.modalService.open(PosClientComponent, {
			windowClass: 'myCustomModalClass',
			size: 'lg',
			centered: true,
			backdrop: 'static',
		});
		modalRef.result.then(
			result => {
				this.getTransactionByMerchantId();
				console.log(result);
			},
			reason => {}
		);
	}

	openPosBillwalkModal() {
		const modalRef = this.modalService.open(PosBillwalkComponent, {
			windowClass: 'myCustomModalClass',
			size: 'sm',
			centered: true,
			backdrop: 'static'
		});
		modalRef.result.then(
			result => {
				// this.getTransactionByMerchantId();
				console.log(result);
			},
			reason => {}
		);
	}

	public getTransactionByMerchantId(): any {
		this.posclientService.getTransactionByMerchantId().subscribe(
			data => {
				console.log(data);
				this.posData = data['data'];
				// let finalData = [];
				// for (let i in responseData) {
				// 	let data = responseData[i];
				// 	let [paid_date, time] = data.paid_on.split(' ');
				// 	console.log(data.client);
				// 	let object = {
				// 		client_name: data.client.length > 0 ? data.client[0].f_name : '',
				// 		date: paid_date,
				// 		amount: data.total_amount
				// 	};
				// 	finalData.push(object);
				// }
				// this.posData = finalData;
				// console.log(this.total_price);
			},
			error => {
				console.log('some error occurred');
				this.toastr.errorToastr('some error occurred');
			}
		);
	}

	public openConfirmationDialog(id, type) {
		switch (type) {
			case 'sales':
				this.confirmDialogService
					.confirm('Please confirm..', 'Are you really want to Delete this... ?')
					.then(confirmed => this.deleteTransaction(id))
					.catch(() => console.log(type));
				break;
			// case 'employee':
			// 	this.confirmDialogService
			// 		.confirm('Please confirm..', 'Are you really want to Delete this... ?')
			// 		.then(confirmed => this.deleteEmployee(id))
			// 		.catch(() => console.log(type));
			// 	break;
			// case 'serviceCat':
			// 	this.confirmDialogService
			// 		.confirm('Please confirm..', 'Are you really want to Delete this... ?')
			// 		.then(confirmed => this.deleteServiceCat(id))
			// 		.catch(() => console.log(type));
			default:
				break;
		}
	}

	public deleteTransaction(id): any {
		this.posclientService.deleteTransaction(id).subscribe(
			data => {
				console.log(data);
				this.toastr.successToastr(' Transaction Deleted Successfully');
				this.getTransactionByMerchantId();
				this.activeModal.close();
			},
			error => {
				console.log('some error occurred');
				this.toastr.errorToastr('Some error occurred', 'Oops!');
			}
		);
	}
}

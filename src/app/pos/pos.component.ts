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
	showTable: boolean=true;
	showModal:boolean;
	totalAmounts: number;
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
		this.activeModal.close();
	}

	openPosclientModal() {
		// this.showTable=true;
		const modalRef = this.modalService.open(PosClientComponent, {
			windowClass: 'myCustomModalClass',
			size: 'lg',
			centered: true,
			backdrop: 'static'
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
		// this.showTable = this.showTable ? false : true;
		const modalRef = this.modalService.open(PosBillwalkComponent, {
			windowClass: 'myCustomModalClass',
			size: 'sm',
			centered: true,
			backdrop: 'static'
		});
		modalRef.result.then(
			result => {
				this.getTransactionByMerchantId();
				console.log(result);
			},
			reason => {}
		);
	}

	public getTransactionByMerchantId(): any {
		this.posclientService.getTransactionByMerchantId().subscribe(
			data => {
				console.log(data);
				let responseData = data['data'];
				let finalData = [];
				let totalAmount  = 0;
				for (let i in responseData) {
					let pos = responseData[i];
					let object = {
						id: pos.id,
						barcode: pos.client[0] ? pos.client[0].barcode_no:'',
						name : pos.client[0] ? pos.client[0].f_name:'',
						surname : pos.client[0] ? pos.client[0].surname:'',
						paid_on: pos.paid_on,
						amount: pos.total_amount
					};
					totalAmount += pos.total_amount;
					finalData.push(object);
				}
				this.posData = finalData;
				this.totalAmounts = totalAmount;
				// console.log(this.total_price);
			},
			error => {
				console.log('some error occurred');
				this.toastr.errorToastr('some error occurred');
			}
		);
	}

	public openConfirmationDialog(id,amount) {
		
			this.confirmDialogService
				.confirm('Please confirm..', 'Are you really want to Delete this... ?')
				.then(confirmed => this.deleteTransaction(id,amount))
				.catch(() => console.log('type'));
			
		
	}

	public deleteTransaction(id,amount): any {
		this.posclientService.deleteTransaction(id).subscribe(
			data => {
				console.log(data);
				this.toastr.successToastr(data.message);
				this.getTransactionByMerchantId();
				this.activeModal.close();
				this.totalAmounts = (this.totalAmounts)-parseInt(amount); 
			},
			error => {
				console.log('some error occurred');
				this.toastr.errorToastr('Some error occurred', 'Oops!');
			}
		);
	}
}

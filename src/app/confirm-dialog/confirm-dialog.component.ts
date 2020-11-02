import { Component, Input, OnInit } from '@angular/core';
import { ConfirmDialogService } from 'src/app/confirm-dialog/confirm-dialog.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-confirm-dialog',
	templateUrl: './confirm-dialog.component.html',
	styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
	@Input() title: string;
	@Input() message: string;
	@Input() btnOkText: string;
	@Input() btnCancelText: string;

	constructor(private activeModal: NgbActiveModal) {}

	ngOnInit() {}

	public decline() {
		this.activeModal.dismiss();
	}

	public accept() {
		this.activeModal.close(true);
	}

	// public dismiss() {
	// 	this.activeModal.dismiss();
	// }
}

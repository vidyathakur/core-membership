import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';

@Injectable({
	providedIn: 'root'
})
export class ConfirmDialogService {
	private subject = new Subject<any>();

	constructor(private modalService: NgbModal) {}
	
	public confirm(
		title: string,
		message: string,
		btnOkText: string = 'Yes',
		btnCancelText: string = 'Cancel',
		// dialogSize: 'sm' | 'lg' = 'sm'
	): Promise<boolean> {
		const modalRef = this.modalService.open(ConfirmDialogComponent);
		modalRef.componentInstance.title = title;
		modalRef.componentInstance.message = message;
		modalRef.componentInstance.btnOkText = btnOkText;
		modalRef.componentInstance.btnCancelText = btnCancelText;

		return modalRef.result;
	}
}

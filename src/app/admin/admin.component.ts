import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/admin/admin.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtService } from 'src/app/login/jwt.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClientcategoriesComponent } from 'src/app/clientcategories/clientcategories.component';
import { PublicholidayComponent } from 'src/app/publicholiday/publicholiday.component';
import { ServicecategoryComponent } from 'src/app/servicecategory/servicecategory.component';
import { TaxrateComponent } from 'src/app/taxrate/taxrate.component';
import { EditservicecategoryComponent } from 'src/app/editservicecategory/editservicecategory.component';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
	emplevel_id: any;
	closeResult: string;
	empForm: FormGroup;
	modalReference: NgbModalRef;
	submitted = false;
	public name: any;
	public merchantid: any;
	public emplevel_name: any;
	public currentEmp: any;
	public clientCats: any;
	public serviceCats: any;
	public taxRate: any;
	public services: any;
	public publicHoliday: any;
	public currentEmployees: any;
	public allEmpData: any;
	public responseData: any;
	constructor(
		private SpinnerService: NgxSpinnerService,
		private modalService: NgbModal,
		public router: Router,
		private formBuilder: FormBuilder,
		public toastr: ToastrManager,
		private jwtService: JwtService,
		private _route: ActivatedRoute,
		public adminService: AdminService
	) {
		this.empForm = this.formBuilder.group({
			id: new FormControl('', Validators.required),
			name: new FormControl('', Validators.required),
			birthday: new FormControl('', Validators.required)
		});
	}

	get f() {
		return this.empForm.controls;
	}

	onReset() {
		this.submitted = false;
		this.empForm.reset();
	}

	ngOnInit(): void {
		this.getEmplevel();
		this.getClientCategories();
		this.getHoliday();
		
		this.getServiceByMerchantId();
		this.getTaxRates();
	}
	OnChangeofOptions() {
		console.log('changing');
	}

	onSubmit() {
		this.submitted = true;
		let response_data = this.empForm.value;
		let data = {
			name: response_data.name || ''
		};

		console.log(data);

		this.adminService.createEmpLevel(data).subscribe(apiResponse => {
			console.log(apiResponse);

			if (apiResponse.code === 200) {
				this.toastr.successToastr('Employee Level Added Successfully');
				this.modalService.dismissAll('Cross click');
				this.ngOnInit();
				this.submitted = false;
				this.empForm.reset();
			} else {
				this.toastr.errorToastr(apiResponse.message);
			}
		});
	}

	public getEmplevel(): any {
		this.SpinnerService.show();
		this.adminService.getEmplevelByMechantId({}).subscribe(
			data => {
				console.log(data);
				this.jwtService.getToken('session_token');
				let employee_data = data['data'];
				this.currentEmp = employee_data;
				let emp_array = {};
				employee_data.forEach(item => {
					if (!emp_array.hasOwnProperty(item.id)) {
						emp_array[item.id] = [];
					}
					emp_array[item.id] = item;
				});
				this.allEmpData = emp_array;
				setTimeout(() => {
					this.SpinnerService.hide();
				}, 2000);
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('some error occured');
			}
		);
	}

	public getEmployees(): any {
		this.SpinnerService.show();
		this.adminService.getEmpDetailByMerchantId({}).subscribe(
			data => {
				console.log(data);
				this.currentEmployees = data['data'];

				setTimeout(() => {
					this.SpinnerService.hide();
				}, 2000);
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('some error occured');
			}
		);
	}

	public getClientCategories(): any {
		this.SpinnerService.show();
		this.adminService.getClientCatDetailsByMerchantId({}).subscribe(
			data => {
				console.log(data);
				this.clientCats = data['data'];

				setTimeout(() => {
					this.SpinnerService.hide();
				}, 2000);
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('some error occured');
			}
		);
	}

	public getHoliday(): any {
		this.SpinnerService.show();
		this.adminService.getHolidayDate({}).subscribe(
			data => {
				console.log(data);
				this.publicHoliday = data['data'];

				setTimeout(() => {
					this.SpinnerService.hide();
				}, 2000);
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('some error occured');
			}
		);
	}

	public getServiceCatByMerchantId(): any {
		this.SpinnerService.show();
		this.adminService.getServiceCatByMerchantId({}).subscribe(
			data => {
				console.log(data);
				this.serviceCats = data['data'];

				setTimeout(() => {
					this.SpinnerService.hide();
				}, 2000);
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('some error occured');
			}
		);
	}

	public getServiceByMerchantId(): any {
		this.SpinnerService.show();
		this.adminService.getServiceByMerchantId().subscribe(
			data => {
				console.log(data);
				this.services = data['data'];

				setTimeout(() => {
					this.SpinnerService.hide();
				}, 2000);
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('some error occured');
			}
		);
	}

	public getTaxRates(): any {
		this.SpinnerService.show();
		this.adminService.getTaxRates({}).subscribe(
			data => {
				console.log(data);
				this.taxRate = data['data'];

				setTimeout(() => {
					this.SpinnerService.hide();
				}, 2000);
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('some error occured');
			}
		);
	}

	open(content) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			result => {
				this.closeResult = `Closed with: ${result}`;
			},
			reason => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			}
		);
	}
	openmyModal() {
		const modalRef = this.modalService.open(ClientcategoriesComponent, {
			windowClass: 'myCustomModalClass'
		});

		modalRef.result.then(
			result => {
				this.getClientCategories();
			},
			reason => {}
		);
	}

	onNoClick(): void {
		this.getEmployees();
	}
	onServiceClick(): void {
		this.getServiceCatByMerchantId();
	}

	openservicecatModal(id) {
		console.log(id);
		const modalRef = this.modalService.open(EditservicecategoryComponent, {
			windowClass: 'myCustomModalClass'
		});
		let data = {
			id: id
		};
		console.log(data);
		modalRef.componentInstance.fromParent = data;
		modalRef.result.then(result => {}, reason => {});
	}

	openholidayModal() {
		const modalRef = this.modalService.open(PublicholidayComponent, {
			windowClass: 'myCustomModalClass'
		});

		modalRef.result.then(
			result => {
				this.getHoliday();
				console.log(result);
			},
			reason => {}
		);
	}

	openserviceModal() {
		const modalRef = this.modalService.open(ServicecategoryComponent, { windowClass: 'myCustomModalClass' });

		modalRef.result.then(
			result => {
				this.getServiceCatByMerchantId();
				console.log(result);
			},
			reason => {}
		);
	}

	opentaxModal() {
		const modalRef = this.modalService.open(TaxrateComponent, { windowClass: 'myCustomModalClass' });

		modalRef.result.then(
			result => {
				this.getTaxRates();
				console.log(result);
			},
			reason => {}
		);
	}

	openclientcatupdateModal() {
		this.modalService.open(ClientcategoriesComponent, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			result => {
				this.closeResult = `Closed with: ${result}`;
			},
			reason => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			}
		);
	}

	opentaxmodal(content) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			result => {
				this.closeResult = `Closed with: ${result}`;
				this.ngOnInit();
			},
			reason => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			}
		);
	}

	openservicemodal(content) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			result => {
				this.closeResult = `Closed with: ${result}`;
				this.ngOnInit();
			},
			reason => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			}
		);
	}

	openupdatemodal(content, id) {
		let details = this.allEmpData[id];
		content.emp_details = this.allEmpData[id];
		this.emplevel_name = details.name;
		this.emplevel_id = details.id;
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			result => {
				this.closeResult = `Closed with: ${result}`;
			},
			reason => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			}
		);
	}

	public updateEmpLevel(): any {
		let data = {
			empLevel_id: this.emplevel_id,
			name: this.emplevel_name
		};
		this.adminService.editEmpLevel(data).subscribe(
			data => {
				console.log(data);
				this.toastr.successToastr(' Employee Level Updated Successfully');
				this.modalService.dismissAll('Cross click');
				this.ngOnInit();
				this.empForm.reset();
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('Some error occured', 'Oops!');
			}
		);
	}

	public deleteEmpLevel(empLevel_id): any {
		this.adminService
			.deleteEmpLevel({
				empLevel_id: empLevel_id
			})
			.subscribe(
				data => {
					console.log(data);
					this.toastr.successToastr(' Employee Level Deleted Successfully');
					this.modalService.dismissAll('Cross click');
					this.ngOnInit();
				},
				error => {
					console.log('some error occured');
					this.toastr.errorToastr('Some error occured', 'Oops!');
				}
			);
	}

	public deleteEmployee(employee_id): any {
		this.adminService.deleteEmployee({ employee_id: employee_id }).subscribe(
			data => {
				console.log(data);
				this.toastr.successToastr(' Employee Deleted Successfully');
				this.ngOnInit();
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('Some error occured', 'Oops!');
			}
		);
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

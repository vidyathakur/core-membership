import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { extend, isNullOrUndefined, Browser, Internationalization } from '@syncfusion/ej2-base';
import {
	ScheduleComponent,
	ActionEventArgs,
	PopupOpenEventArgs,
	EventRenderedArgs,
	RenderCellEventArgs,
	DragAndDropService,
	TimelineViewsService,
	GroupModel,
	EventSettingsModel,
	ResizeService,
	TimeScaleModel,
	WorkHoursModel,
	View,
	ResourceDetails,
	TreeViewArgs
} from '@syncfusion/ej2-angular-schedule';
import { AdminService } from 'src/app/admin/admin.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtService } from 'src/app/login/jwt.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { roomData, resourceConferenceData, scheduleData } from 'src/app/appointments/data';
import { AppointmentsService } from 'src/app/appointments/appointments.service';


@Component({
	selector: 'app-appointments',
	templateUrl: './appointments.component.html',
	styleUrls: ['./appointments.component.css'],
	encapsulation: ViewEncapsulation.None,
	providers: [TimelineViewsService, ResizeService, DragAndDropService]
})
export class AppointmentsComponent implements OnInit {
	public empLevelNames: any;
	public currentEmployees: any;
	public data: Object[] = <Object[]>extend([], resourceConferenceData, null, true);
	public selectedDate: Date = new Date();
	public timeScale: TimeScaleModel = {
		enable: true,
		interval: 60,
		slotCount: 4,
		majorSlotTemplate: '#majorSlotTemplate',
		minorSlotTemplate: '#minorSlotTemplate'
	};
	public instance: Internationalization = new Internationalization();
	getMajorTime(date: Date): string {
		return this.instance.formatDate(date, { skeleton: 'hm' });
	}
	getMinorTime(date: Date): string {
		return this.instance.formatDate(date, { skeleton: 'hm' });
	}
	public currentView: View = 'Day';
	public resourceDataSource: Object[] = [
		// { Text: 'f_name', Id: 2, Color: '#357cd2' },
		// { Text: 'f_name', Id: 2, Color: '#357cd2' },
		// { Text: 'f_name', Id: 3, Color: '#7fa900' }
	];
	//console.log(resourceDataSource);
	public group: GroupModel = { allowGroupEdit: true, resources: ['Conferences'] };
	public allowMultiple: Boolean = true;
	public eventSettings: EventSettingsModel = {
		dataSource: resourceConferenceData,
		fields: {
			subject: { title: 'Conference Name', name: 'Subject' },
			description: { title: 'Summary', name: 'Description' },
			startTime: { title: 'From', name: 'StartTime' },
			endTime: { title: 'To', name: 'EndTime' }
		}
	};

	constructor(
		private SpinnerService: NgxSpinnerService,
		public router: Router,
		public toastr: ToastrManager,
		private jwtService: JwtService,
		private _route: ActivatedRoute,
		public appointmentsService: AppointmentsService
	) {}

	getEmployeeName(value: ResourceDetails | TreeViewArgs): string {
		return (value as ResourceDetails).resourceData
			? (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.textField] as string
			: (value as TreeViewArgs).resourceName;
	}
	getEmployeeDesignation(value: ResourceDetails | TreeViewArgs): string {
		return (value as ResourceDetails).resourceData
			? (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.idField] as string
			: (value as TreeViewArgs).resourceName;
	}
	getEmployeeImage(value: ResourceDetails | TreeViewArgs): string {
		let resourceName: string = this.getEmployeeName(value);
		return resourceName.replace(' ', '-').toLowerCase();
	}

	ngOnInit() {
		//this.getEmplevel();
		this.appointmentsService.getEmpDetailByMerchantId({}).subscribe(
			data => {
				console.log(data);
				let currentEmployees = data['data'];
				let finalArrayData = [];
				currentEmployees.forEach((item, key) => {
					let object = { Text: '', Id: '', Color: '' , Text2: ''};
					object.Text = item.f_name;
					object.Id = item.id;
					object.Color = '#357cd2';
					object.Text2 = item.display_name;
					if(item.emp_levels){
						object.Id = item.emp_levels.name;
					}
					finalArrayData.push(object);
				});
				this.resourceDataSource = finalArrayData;
				console.log(this.resourceDataSource);
			},
			error => {
				console.log('some error occured');
				this.toastr.errorToastr('some error occured');
			}
		);
	}

	//  public getEmplevel(): any {
  // this.appointmentsService.getEmplevelByMechantId({}).subscribe(
	// 		data => {
	// 			console.log(data);
	// 			this.empLevelNames = data['data'];
	// 		},
	// 		error => {
	// 			console.log('some error occured');
	// 		}
	// 	);
	// }
}

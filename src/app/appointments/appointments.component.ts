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
import { roomData, resourceConferenceData, scheduleData } from 'src/app/appointments/data';


@Component({
	selector: 'app-appointments',
	templateUrl: './appointments.component.html',
	styleUrls: ['./appointments.component.css'],
  encapsulation: ViewEncapsulation.None,
	providers: [TimelineViewsService, ResizeService, DragAndDropService]
})
export class AppointmentsComponent implements OnInit {
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
		{ Text: 'Margaret', Id: 1, Color: '#1aaa55' },
		{ Text: 'Robert', Id: 2, Color: '#357cd2' },
		{ Text: 'Laura', Id: 3, Color: '#7fa900' }
	];
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

	constructor() {}

	getEmployeeName(value: ResourceDetails | TreeViewArgs): string {
		return (value as ResourceDetails).resourceData
			? (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.textField] as string
			: (value as TreeViewArgs).resourceName;
	}
	getEmployeeDesignation(value: ResourceDetails | TreeViewArgs): string {
		let resourceName: string = this.getEmployeeName(value);
		return resourceName === 'Margaret'
			? 'Makeup artist'
			: resourceName === 'Robert' ? 'Hairstylist' : 'Spa therapist';
	}
	getEmployeeImage(value: ResourceDetails | TreeViewArgs): string {
		let resourceName: string = this.getEmployeeName(value);
		return resourceName.replace(' ', '-').toLowerCase();
	}

	ngOnInit() {}
}

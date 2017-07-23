import { Component }				from '@angular/core';

import { Settings }				from './settings';
import { SettingsService }		from './settings.service';

@Component({
 	selector: 'settings-page',
 	templateUrl: './settings.component.html',
 	providers: [SettingsService]
})

export class SettingsComponent {
	settings: Settings;
	response: any;

	constructor(
		private settingsService: SettingsService
	) {}

	ngOnInit(): void {
		this.settings = new Settings('', '', '', '');
		this.settingsService.getSettings()
			.subscribe(data => {
				this.response = data;
				if (this.response.setting_bpjs != null) {
					this.settings = this.response.setting_bpjs;
				}
				console.log(this.settings);
			});
	}

	private save() {
		let request: any = {
			setting_bpjs: this.settings
		}; 
		this.settingsService.updateSettings(request, 1)
			.subscribe(data => {
				console.log(data);
			});
		console.log(this.settings);
		window.location.reload();
	}
}
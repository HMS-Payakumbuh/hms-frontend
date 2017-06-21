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

	constructor(
		private settingsService: SettingsService
	) {}

	ngOnInit(): void {
		this.settingsService.getSettings()
			.then(settings => this.settings = settings);
	}

	private save() { 
		console.log(this.settings);
	}
}
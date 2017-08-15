import { Component }				from '@angular/core';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

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
		private settingsService: SettingsService,
		private toastyService: ToastyService, 
		private toastyConfig: ToastyConfig
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
				this.toastyService.success(this.toast_success());
			},
			error => {
				console.log(error);
				this.toastyService.error(this.toast_fail(error));
			});
		console.log(this.settings);
	}

	private toast_success() {
		let toastOptions:ToastOptions = {
			title: "Pengaturan Berhasil Disimpan",
			msg: "",
			showClose: true,
			timeout: 5000,
			theme: 'material'
		};

		return toastOptions;
	}

	private toast_fail(error) {
		let toastOptions:ToastOptions = {
			title: "Pengaturan Gagal Disimpan",
			msg: error,
			showClose: true,
			timeout: 5000,
			theme: 'material'
		};

		return toastOptions;
	}
}
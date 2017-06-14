import { Component } from '@angular/core';
import { Pasien }    from './pasien';

@Component({
  selector: 'pasien-form',
  templateUrl: './pasien-form.component.html'
})
export class PasienFormComponent {
	private service: string;
	private search: string;
  
  	genders = ['Laki-laki', 'Perempuan'];

  	religions = ['Islam', 'Protestan', 'Katolik', 'Buddha', 'Hindu', 'Konghucu'];

  	services = ['Anak', 'THT', 'Kardiologi', 'Gigi'];

  	doctors = ['Dr. Juan', 'Dr. Alec', 'Dr. Hans', 'Dr. Kelvin'];

  	model = new Pasien('Dr IQ', '2012-09-12', this.genders[0], this.religions[0], 'Chuck Overstreet', '0892983211', 'aa', 'a');

  	submitted = false;

  	onSubmit() { this.submitted = true; }

  	// TODO: Remove this when we're done
  	get diagnostic() { return JSON.stringify(this.model); }
}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Pasien }    from './pasien';
import { Poliklinik }    from '../layanan/poliklinik';
import { PoliklinikService }    from '../layanan/poliklinik.service';

@Component({
  selector: 'pasien-form',
  templateUrl: './pasien-form.component.html',
  providers: [
    PoliklinikService
  ]
})
export class PasienFormComponent implements OnInit {
	poliklinik: string;
	search: string;
  allPoliklinik: Poliklinik[];

  constructor(
    private route: ActivatedRoute,
    private poliklinikService: PoliklinikService
  ) {}

  ngOnInit() {
    this.poliklinikService.getAllPoliklinik()
      .then(allPoliklinik => this.allPoliklinik = allPoliklinik);
  }
  
	genders = ['Laki-laki', 'Perempuan'];

	religions = ['Islam', 'Protestan', 'Katolik', 'Buddha', 'Hindu', 'Konghucu'];

	doctors = ['Dr. Juan', 'Dr. Alec', 'Dr. Hans', 'Dr. Kelvin'];

	model = new Pasien('Dr IQ', '2012-09-12', this.genders[0], this.religions[0], 'Chuck Overstreet', '0892983211', 'aa', 'a');

	submitted = false;

	onSubmit() { this.submitted = true; }

	// TODO: Remove this when we're done
	get diagnostic() { return JSON.stringify(this.model); }
}
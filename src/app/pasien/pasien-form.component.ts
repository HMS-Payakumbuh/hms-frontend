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
  no_rujukan: string;
  no_asuransi: string;
  allPoliklinik: Poliklinik[];

  constructor(
    private route: ActivatedRoute,
    private poliklinikService: PoliklinikService
  ) {}

  submitted = false;

  genders = ['Laki-laki', 'Perempuan'];

  religions = ['Islam', 'Protestan', 'Katolik', 'Buddha', 'Hindu', 'Konghucu'];

  doctors = ['Dr. Juan', 'Dr. Alec', 'Dr. Hans', 'Dr. Kelvin'];

  model = new Pasien('Jane', '08-06-1988', this.genders[0], this.religions[5], 'Jln. Haji Slamet', '123515151', ['12314','12324']);

  ngOnInit() {
    this.poliklinikService.getAllPoliklinik()
      .then(allPoliklinik => this.allPoliklinik = allPoliklinik);
  }

  private customTrackBy(index: number, obj: any): any {
    return index;
  }

  private pakaiAsuransi(no_asuransi: string) {
    this.no_asuransi = no_asuransi;
  }

	private save() { 
    this.submitted = true;
  }

	// TODO: Remove this when we're done
	get diagnostic() { return JSON.stringify(this.model); }
}
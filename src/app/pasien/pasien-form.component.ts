import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Pasien }    from './pasien';
import { PasienService }    from './pasien.service';
import { Asuransi }  from './asuransi';
import { AsuransiService }  from './asuransi.service';
import { Poliklinik }    from '../layanan/poliklinik';
import { PoliklinikService }    from '../layanan/poliklinik.service';

@Component({
  selector: 'pasien-form',
  templateUrl: './pasien-form.component.html',
  providers: [
    PoliklinikService,
    PasienService,
    AsuransiService
  ]
})
export class PasienFormComponent implements OnInit {
	poliklinik: string;
	search: string;
  no_rujukan: string;
  searchDone: boolean;
  update: boolean;
  asuransi: Asuransi;
  pasien: Pasien;
  allAsuransi: Asuransi[];
  allPoliklinik: Poliklinik[];
  allPasien: Pasien[];

  constructor(
    private route: ActivatedRoute,
    private poliklinikService: PoliklinikService,
    private pasienService: PasienService,
    private asuransiService: AsuransiService
  ) {}

  submitted = false;

  genders = ['Laki-laki', 'Perempuan'];

  religions = ['Islam', 'Protestan', 'Katolik', 'Buddha', 'Hindu', 'Konghucu'];

  doctors = ['Dr. Juan', 'Dr. Alec', 'Dr. Hans', 'Dr. Kelvin'];

  //pasienAutocompleteConfig: any = {'placeholder': 'Tuliskan nama pasien', 'sourceField': ['nama']};

  ngOnInit() {
    this.poliklinikService.getAllPoliklinik()
      .then(allPoliklinik => this.allPoliklinik = allPoliklinik);
    this.pasien = new Pasien(null,'','',null,'','','','');
    this.asuransi = new Asuransi(null,'',null);

    // this.pasienService.getAllPasien()
    //   .then(allPasien => this.allPasien = allPasien);
  }

  /*pasienSelected(pasien: Pasien) {
    this.pasien = pasien;
    this.asuransiService.getAsuransi(this.pasien.id).then(allAsuransi => this.allAsuransi = allAsuransi);  
  }*/

  private searchPasien() {
    this.pasienService.getPasienByName(this.search)
      .then(allPasien => this.allPasien = allPasien);
  }

  private selectPasien() {
    this.asuransiService.getAsuransi(this.pasien.id).then(allAsuransi => this.allAsuransi = allAsuransi);
    this.searchDone = true;
  }

  private customTrackBy(index: number, obj: any): any {
    return index;
  }

  private pakaiAsuransi(asuransi: Asuransi) {
    this.asuransi = asuransi;
  }

	private save() { 
    this.submitted = true;
  }
}
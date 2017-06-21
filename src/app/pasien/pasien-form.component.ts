import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Pasien }    from './pasien';
import { PasienService }    from './pasien.service';
import { Asuransi }  from './asuransi';
import { AsuransiService }  from './asuransi.service';
import { PoliklinikService }    from '../layanan/poliklinik.service';
import { LaboratoriumService }    from '../layanan/laboratorium.service';

@Component({
  selector: 'pasien-form',
  templateUrl: './pasien-form.component.html',
  providers: [
    PoliklinikService,
    LaboratoriumService,
    PasienService,
    AsuransiService
  ]
})
export class PasienFormComponent implements OnInit {
	tipe: string;
  layanan: string;
  doktor: string;
	search: string;
  no_rujukan: string;
  searchDone: boolean;
  update: boolean;
  asuransi: Asuransi;
  pasien: Pasien;
  allAsuransi: Asuransi[];
  allLayanan: any[];
  allPasien: Pasien[] = [];

  constructor(
    private route: ActivatedRoute,
    private poliklinikService: PoliklinikService,
    private laboratoriumService: LaboratoriumService,
    private pasienService: PasienService,
    private asuransiService: AsuransiService
  ) {}

  submitted = false;

  allTipeLayanan = ['Poliklinik', 'Laboratorium'];

  genders = ['Laki-laki', 'Perempuan'];

  religions = ['Islam', 'Protestan', 'Katolik', 'Buddha', 'Hindu', 'Konghucu'];

  doctors = ['Dr. Juan', 'Dr. Alec', 'Dr. Hans', 'Dr. Kelvin'];

  //pasienAutocompleteConfig: any = {'placeholder': 'Tuliskan nama pasien', 'sourceField': ['nama']};

  ngOnInit() {
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
    if (this.search.match(/([1-9][0-9]*)/)) {
      this.allPasien = [];
      this.pasienService.getPasien(parseInt(this.search))
        .then(allPasien => {
          this.allPasien.push(allPasien);
        });
    } else {
       this.pasienService.getPasienByName(this.search)
        .then(allPasien => this.allPasien = allPasien);
    }
  }

  private selectPasien() {
    this.asuransiService.getAsuransi(this.pasien.id).then(allAsuransi => this.allAsuransi = allAsuransi);
    this.searchDone = true;
  }

  private selectLayanan() {
    if (this.tipe === 'Poliklinik') {
      this.poliklinikService.getAllPoliklinik()
        .then(allPoliklinik => this.allLayanan = allPoliklinik);
    } else if (this.tipe === 'Laboratorium') {
      this.laboratoriumService.getAllLaboratorium()
        .then(allLaboratorium => this.allLayanan = allLaboratorium);  
    }
  }

  private customTrackBy(index: number, obj: any): any {
    return index;
  }

  private pakaiAsuransi(asuransi: Asuransi) {
    this.asuransi = asuransi;
  }

	private save() {
    alert(JSON.stringify(this.pasien)+','+JSON.stringify(this.asuransi)+','+this.layanan); 
    this.submitted = true;
  }
}
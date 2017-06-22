import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Antrian }    from './antrian';
import { Poliklinik }    from '../layanan/poliklinik';
import { PoliklinikService }    from '../layanan/poliklinik.service';
import { LaboratoriumService }    from '../layanan/laboratorium.service';

@Component({
  selector: 'daftar-antrian',
  templateUrl: './daftar-antrian.component.html',
  providers: [
    PoliklinikService,
    LaboratoriumService
  ]
})
export class DaftarAntrianComponent implements OnInit {
  tipe: string;
  layanan: string;
  nama: string;
  disabilitas: boolean = false;
  usia: number = 0;
  allLayanan: any[];

  allTipeLayanan = ['Poliklinik', 'Laboratorium'];

  constructor(
    private route: ActivatedRoute,
    private poliklinikService: PoliklinikService,
    private laboratoriumService: LaboratoriumService,
  ) {}

  ngOnInit() {
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

  public daftar() {
    if (this.usia >= 65 || this.disabilitas) {
      alert('Anda akan mendaftar ke layanan '+this.layanan +' dengan nama '+ this.nama +' dan masuk ke antrian khusus dengan nomor antrian A1');
    } else {
      alert('Anda akan mendaftar ke layanan '+this.layanan +' dengan nama '+ this.nama +' dan masuk ke antrian umum dengan nomor antrian A1');
    }
  }
    
  
}
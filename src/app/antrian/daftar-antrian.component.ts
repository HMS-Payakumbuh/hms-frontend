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
  disabilitas: boolean = false;
  umur: number = 0;
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
      this.poliklinikService.getAllPoliklinik().subscribe(
        data => { this.allLayanan = data }
      )
    } else if (this.tipe === 'Laboratorium') {
      this.laboratoriumService.getAllLaboratorium().subscribe(
        data => { this.allLayanan = data }
      )
    }
  }

  public daftar() {
    if (this.umur >= 65 || this.disabilitas) {
      alert('Anda akan mendaftar ke layanan '+this.layanan +' dan masuk ke antrian khusus dengan nomor antrian A1');
    } else {
      alert('Anda akan mendaftar ke layanan '+this.layanan +' dan masuk ke antrian umum dengan nomor antrian A1');
    }
  }


}

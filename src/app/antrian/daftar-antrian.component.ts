import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Antrian }    from './antrian';
import { AntrianService }    from './antrian.service';
import { PoliklinikService }    from '../layanan/poliklinik.service';
import { LaboratoriumService }    from '../layanan/laboratorium.service';

@Component({
  selector: 'daftar-antrian',
  templateUrl: './daftar-antrian.component.html',
  providers: [
    PoliklinikService,
    LaboratoriumService,
    AntrianService,
  ]
})
export class DaftarAntrianComponent {
  tipe: string;
  layanan: any;
  disabilitas: boolean = false;
  umur: number = 0;
  allLayanan: any[];
  allTipeLayanan = ['Poliklinik', 'Laboratorium'];

  constructor(
    private route: ActivatedRoute,
    private poliklinikService: PoliklinikService,
    private laboratoriumService: LaboratoriumService,
    private antrianService: AntrianService,
  ) {}

  private selectTipeLayanan() {
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
    let request: any = null;
    if (this.tipe === 'Poliklinik') {
      request = {
        nama_layanan_poli : this.layanan.nama,
        jenis : 0,
        kesempatan: 3,
        kategori_antrian: this.layanan.kategori_antrian
      };
    } else if (this.tipe === 'Laboratorium') {
      request = {
        nama_layanan_lab : this.layanan.nama,
        jenis : 0,
        kesempatan: 3,
        kategori_antrian: this.layanan.kategori_antrian
      };
    }
    
    /*if (this.umur >= 65 || this.disabilitas) {
      request = {
        nama_layanan : this.layanan.nama,
        jenis : 1,
        kesempatan: 3,
        kategori_antrian: this.layanan.kategori_antrian,
      }
    } else {
      request = {
        nama_layanan : this.layanan.nama,
        jenis : 0,
        kesempatan: 3,
        kategori_antrian: this.layanan.kategori_antrian,
      }
    }*/
    this.antrianService.createAntrianFrontOffice(request).subscribe(
        data => {window.location.reload()}
      );
  }
}
